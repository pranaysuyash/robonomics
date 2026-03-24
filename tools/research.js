#!/usr/bin/env node
/**
 * Robonomics agentic research orchestrator (provider-agnostic).
 *
 * Modes:
 *   - command providers (e.g. Hermes CLI)
 *   - manual task packet generation
 *
 * Outputs:
 *   - tools/output/research-queue.json
 *   - tools/output/research-tasks.md
 *   - tools/output/new-findings.json
 *   - tools/output/proposed-updates.json
 *   - tools/output/research-report.md
 *
 * Usage:
 *   node tools/research.js
 *   node tools/research.js --provider hermes
 *   node tools/research.js --manual
 *   node tools/research.js --dry-run
 *   node tools/research.js --apply
 *   node tools/research.js --prompts
 */

import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const TOOLS_DIR = join(PROJECT_ROOT, 'tools');
const OUTPUT_DIR = join(TOOLS_DIR, 'output');
const LOG_DIR = join(PROJECT_ROOT, 'logs');
const LOG_FILE = join(LOG_DIR, 'research.log');
const DATA_FILE = join(PROJECT_ROOT, 'src/data/robots.ts');
const PROVIDERS_CONFIG = join(TOOLS_DIR, 'config/providers.json');
const TARGETS_CONFIG = join(TOOLS_DIR, 'config/research-targets.json');
const TASK_PROMPT_FILE = join(TOOLS_DIR, 'prompts/task.md');
const FINDING_SCHEMA_FILE = join(TOOLS_DIR, 'schemas/finding.schema.json');
const FINDINGS_FILE = join(OUTPUT_DIR, 'new-findings.json');
const QUEUE_FILE = join(OUTPUT_DIR, 'research-queue.json');
const TASK_PACKET_FILE = join(OUTPUT_DIR, 'research-tasks.md');
const REPORT_FILE = join(OUTPUT_DIR, 'research-report.md');
const PROPOSED_UPDATES_FILE = join(OUTPUT_DIR, 'proposed-updates.json');

const args = process.argv.slice(2);
const argSet = new Set(args);
const selectedProviderArg = readArgValue('--provider');
const isManualOnly = argSet.has('--manual');
const isDryRun = argSet.has('--dry-run');
const isApply = !argSet.has('--no-apply');
const MIN_APPLY_CONFIDENCE = 0.75;
const MIN_STRICT_UPDATE_CONFIDENCE = 0.75;

ensureDir(OUTPUT_DIR);
ensureDir(LOG_DIR);

main().catch((error) => {
  log(`fatal: ${error?.stack || error?.message || String(error)}`);
  process.exitCode = 1;
});

async function main() {
  if (argSet.has('--prompts')) {
    printPromptPreview();
    return;
  }

  const providersConfig = readJson(PROVIDERS_CONFIG);
  const targetsConfig = readJson(TARGETS_CONFIG);
  const findingSchema = readJson(FINDING_SCHEMA_FILE);
  const taskPromptTemplate = readFileSafe(TASK_PROMPT_FILE);

  const robots = extractRobotsFromFile();
  if (robots.length === 0) {
    throw new Error(`No robots parsed from ${DATA_FILE}.`);
  }

  const tasks = buildTasks({ robots, targetsConfig, taskPromptTemplate });
  const providerPlan = planProviders({ providersConfig, selectedProviderArg, isManualOnly });
  const queue = buildQueue({ robots, tasks, providerPlan });
  writeJson(QUEUE_FILE, queue);
  writeTaskPacket({ queue, tasks, providerPlan, findingSchema });

  log(`queue: ${tasks.length} tasks for ${robots.length} robots`);
  log(`providers: ${providerPlan.map((p) => p.id).join(', ')}`);

  const execution = await runProviders({ providerPlan, tasks, findingSchema });
  const validated = validateFindings(execution.findings, findingSchema, tasks);
  const deduped = dedupeFindings(validated.accepted);
  const proposedUpdates = deriveProposedUpdates(deduped);

  writeJson(FINDINGS_FILE, {
    generatedAt: new Date().toISOString(),
    providerResults: execution.providerResults,
    acceptedCount: deduped.length,
    rejectedCount: validated.rejected.length,
    accepted: deduped,
    rejected: validated.rejected,
  });

  writeJson(PROPOSED_UPDATES_FILE, {
    generatedAt: new Date().toISOString(),
    simpleFieldUpdates: proposedUpdates,
  });

  let applied = { attempted: 0, applied: 0, skipped: 0 };
  if (isApply && !isDryRun) {
    applied = applySimpleUpdatesToRobotsFile(proposedUpdates);
  }

  writeReport({
    robots,
    tasks,
    providerPlan,
    providerResults: execution.providerResults,
    acceptedCount: deduped.length,
    rejectedCount: validated.rejected.length,
    applied,
    isDryRun,
  });

  log(`done: accepted=${deduped.length} rejected=${validated.rejected.length} applied=${applied.applied}`);
}

function readArgValue(flag) {
  const idx = args.findIndex((a) => a === flag);
  if (idx === -1 || idx === args.length - 1) return '';
  return args[idx + 1];
}

function ensureDir(path) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

function readFileSafe(path) {
  return readFileSync(path, 'utf-8');
}

function log(message) {
  const ts = new Date().toISOString();
  const line = `[${ts}] ${message}`;
  console.log(line);
  appendFileSync(LOG_FILE, `${line}\n`);
}

function extractRobotsFromFile() {
  const content = readFileSync(DATA_FILE, 'utf-8');
  const marker = 'export const robots';
  const markerIdx = content.indexOf(marker);
  if (markerIdx === -1) return [];

  const equalsIdx = content.indexOf('=', markerIdx);
  if (equalsIdx === -1) return [];

  const listStart = content.indexOf('[', equalsIdx);
  if (listStart === -1) return [];

  let depth = 0;
  let listEnd = -1;
  for (let i = listStart; i < content.length; i += 1) {
    const ch = content[i];
    if (ch === '[') depth += 1;
    if (ch === ']') {
      depth -= 1;
      if (depth === 0) {
        listEnd = i;
        break;
      }
    }
  }

  if (listEnd === -1) return [];
  const robotsSection = content.slice(listStart, listEnd + 1);
  const robots = [];

  const objectSpans = [];
  let depthObj = 0;
  let objectStart = -1;
  for (let i = 0; i < robotsSection.length; i += 1) {
    const ch = robotsSection[i];
    if (ch === '{') {
      if (depthObj === 0) objectStart = i;
      depthObj += 1;
    } else if (ch === '}') {
      depthObj -= 1;
      if (depthObj === 0 && objectStart !== -1) {
        objectSpans.push([objectStart, i + 1]);
        objectStart = -1;
      }
    }
  }

  for (const [start, end] of objectSpans) {
    const objectText = robotsSection.slice(start, end);
    const id = objectText.match(/^\s*id:\s*'([^']+)'/m)?.[1];
    const name = objectText.match(/^\s*name:\s*'([^']+)'/m)?.[1];
    const manufacturer = objectText.match(/^\s*manufacturer:\s*'([^']+)'/m)?.[1];
    const availability = objectText.match(/^\s*availability:\s*'([^']+)'/m)?.[1];
    if (id && name && manufacturer && availability) {
      robots.push({ id, name, manufacturer, availability });
    }
  }
  return robots;
}

function buildTasks({ robots, targetsConfig, taskPromptTemplate }) {
  const tasks = [];
  const runDate = new Date().toISOString().slice(0, 10);
  const modePolicies = {
    strict_update:
      [
        '- This is a strict production-update task.',
        '- Propose changes only when confidence is >= 0.75.',
        '- Every proposed change must be directly traceable to cited sources.',
        '- Prefer primary sources; use secondary sources only as supporting evidence.',
        '- Do not speculate, infer missing numbers, or generalize from unrelated robots.',
        '- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.',
      ].join('\n'),
    broad_scan:
      [
        '- This is a broad discovery-scan task.',
        '- Maximize coverage of new entities/signals, even with moderate confidence.',
        '- Include early signals (pilots, announcements, funding, notable demos) with clear caveats.',
        '- Keep speculative findings low confidence (< 0.6) and avoid hard field-change proposals.',
        '- For broad scan, proposedChanges may be empty when findings are not production-grade.',
      ].join('\n'),
  };

  for (const robot of robots) {
    const objective = `Research updates for robot "${robot.name}" by ${robot.manufacturer} on ${runDate}. Focus on deployments, specs, pricing, capabilities, and limitations.`;
    tasks.push({
      id: `robot-${robot.id}`,
      type: 'robot',
      priority: 'high',
      mode: 'strict_update',
      entity: robot,
      queryHints: [
        `${robot.name} ${robot.manufacturer} 2025 2026 deployment`,
        `${robot.name} specs pricing`,
        `${robot.name} limitations issues`,
      ],
      prompt: renderPrompt(taskPromptTemplate, {
        objective,
        entityType: 'robot',
        entityName: robot.name,
        entityId: robot.id,
        manufacturer: robot.manufacturer,
        mode: 'strict_update',
        modePolicy: modePolicies.strict_update,
      }),
    });
  }

  for (const topic of targetsConfig.discoveryTopics || []) {
    tasks.push({
      id: `topic-${slug(topic.name)}`,
      type: 'discovery',
      priority: topic.priority || 'medium',
      mode: 'broad_scan',
      entity: { id: slug(topic.name), name: topic.name },
      queryHints: topic.queryHints || [],
      prompt: renderPrompt(taskPromptTemplate, {
        objective: topic.objective,
        entityType: topic.type || 'trend',
        entityName: topic.name,
        entityId: slug(topic.name),
        manufacturer: '',
        mode: 'broad_scan',
        modePolicy: modePolicies.broad_scan,
      }),
    });
  }

  return tasks;
}

function renderPrompt(template, data) {
  return template
    .replaceAll('{{objective}}', data.objective || '')
    .replaceAll('{{entityType}}', data.entityType || '')
    .replaceAll('{{entityName}}', data.entityName || '')
    .replaceAll('{{entityId}}', data.entityId || '')
    .replaceAll('{{manufacturer}}', data.manufacturer || '')
    .replaceAll('{{mode}}', data.mode || '')
    .replaceAll('{{modePolicy}}', data.modePolicy || '');
}

function planProviders({ providersConfig, selectedProviderArg, isManualOnly }) {
  if (isManualOnly) return [{ id: 'manual', type: 'manual', enabled: true }];

  let providers = providersConfig.providers.filter((p) => p.enabled);
  if (selectedProviderArg) {
    providers = providers.filter((p) => p.id === selectedProviderArg);
  } else {
    const preferredOrder = providersConfig.defaultProviderOrder || [];
    providers.sort((a, b) => preferredOrder.indexOf(a.id) - preferredOrder.indexOf(b.id));
  }

  if (!providers.some((p) => p.type === 'manual')) {
    providers.push({ id: 'manual', type: 'manual', enabled: true });
  }
  return providers;
}

function buildQueue({ robots, tasks, providerPlan }) {
  return {
    generatedAt: new Date().toISOString(),
    stats: {
      robots: robots.length,
      tasks: tasks.length,
      providers: providerPlan.length,
      highPriorityTasks: tasks.filter((t) => t.priority === 'high').length,
    },
    robots,
    providerPlan,
    tasks: tasks.map((t) => ({
      id: t.id,
      type: t.type,
      priority: t.priority,
      entity: t.entity,
      queryHints: t.queryHints,
    })),
  };
}

function writeTaskPacket({ queue, tasks, providerPlan, findingSchema }) {
  const lines = [];
  lines.push('# Robonomics Research Tasks');
  lines.push('');
  lines.push(`Generated: ${queue.generatedAt}`);
  lines.push(`Providers: ${providerPlan.map((p) => p.id).join(', ')}`);
  lines.push(`Tasks: ${tasks.length}`);
  lines.push('');
  lines.push('## Output Contract');
  lines.push('Return JSON array of findings matching this schema summary:');
  lines.push('`taskId`, `entityType`, `entityId`, `summary`, `confidence`, `sources[]`, `proposedChanges[]`');
  lines.push('');
  lines.push('## Finding Schema');
  lines.push('```json');
  lines.push(JSON.stringify(findingSchema, null, 2));
  lines.push('```');
  lines.push('');
  lines.push('## Tasks');
  for (const [index, task] of tasks.entries()) {
    lines.push(`### ${index + 1}. ${task.id} (${task.priority})`);
    lines.push(`Type: ${task.type}`);
    lines.push(`Entity: ${task.entity?.name || task.id}`);
    lines.push('Query hints:');
    for (const hint of task.queryHints) lines.push(`- ${hint}`);
    lines.push('Prompt:');
    lines.push('```text');
    lines.push(task.prompt);
    lines.push('```');
    lines.push('');
  }
  writeFileSync(TASK_PACKET_FILE, `${lines.join('\n')}\n`);
}

async function runProviders({ providerPlan, tasks, findingSchema }) {
  const findings = [];
  const providerResults = [];

  for (const provider of providerPlan) {
    if (provider.type === 'manual') {
      providerResults.push({
        provider: provider.id,
        status: 'queued_for_manual_execution',
        executedTasks: 0,
      });
      continue;
    }

    if (provider.type === 'command') {
      const taskResults = [];
      for (const task of tasks) {
        const payload = {
          instruction: provider.instruction || 'Perform web research and return JSON findings only.',
          findingSchema,
          task: {
            id: task.id,
            type: task.type,
            priority: task.priority,
            entity: task.entity,
            queryHints: task.queryHints,
            prompt: task.prompt,
          },
        };

        const run = runCommandProvider(provider, payload);
        taskResults.push({
          taskId: task.id,
          ok: run.ok,
          stderr: run.stderr,
          parseError: run.parseError,
        });

        if (Array.isArray(run.findings)) findings.push(...run.findings);
      }

      providerResults.push({
        provider: provider.id,
        status: 'executed',
        executedTasks: taskResults.length,
        successTasks: taskResults.filter((r) => r.ok).length,
        failedTasks: taskResults.filter((r) => !r.ok).length,
      });
    }
  }

  return { findings, providerResults };
}

function runCommandProvider(provider, payload) {
  const payloadString = JSON.stringify(payload);
  const rawArgs = provider.args || [];
  const args = rawArgs.map((arg) =>
    typeof arg === 'string' ? arg.replaceAll('{{PAYLOAD}}', payloadString) : arg
  );

  try {
    const proc = spawnSync(provider.command, args, {
      input: provider.inputMode === 'stdin' ? payloadString : undefined,
      env: process.env,
      cwd: PROJECT_ROOT,
      encoding: 'utf-8',
      timeout: Number(provider.timeoutMs || 300000),
      maxBuffer: 10 * 1024 * 1024,
    });

    if (proc.error) {
      return { ok: false, stderr: proc.error.message, findings: [] };
    }

    const output = (proc.stdout || '').trim();
    if (!output) {
      return { ok: false, stderr: proc.stderr || 'No output', findings: [] };
    }

    const parsed = parseFindingsOutput(output);
    if (!parsed.ok) {
      return {
        ok: false,
        stderr: proc.stderr || '',
        parseError: parsed.error,
        findings: [],
      };
    }

    return { ok: true, findings: parsed.data, stderr: proc.stderr || '' };
  } catch (error) {
    return { ok: false, stderr: error.message, findings: [] };
  }
}

function parseFindingsOutput(output) {
  try {
    const direct = JSON.parse(output);
    return { ok: true, data: Array.isArray(direct) ? direct : [direct] };
  } catch {
    const firstBracket = output.indexOf('[');
    const lastBracket = output.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket > firstBracket) {
      const maybeArray = output.slice(firstBracket, lastBracket + 1);
      try {
        const parsed = JSON.parse(maybeArray);
        return { ok: true, data: Array.isArray(parsed) ? parsed : [parsed] };
      } catch {
        return { ok: false, error: 'Unable to parse JSON array from provider output' };
      }
    }
    return { ok: false, error: 'Provider output is not valid JSON' };
  }
}

function validateFindings(findings, findingSchema, tasks = []) {
  const accepted = [];
  const rejected = [];
  const taskModeById = new Map(tasks.map((task) => [task.id, task.mode]));
  const requiredTopLevel = findingSchema.required || [];
  const requiredSource = findingSchema.properties?.sources?.items?.required || [];
  const requiredChange = findingSchema.properties?.proposedChanges?.items?.required || [];

  for (const finding of findings) {
    const errors = [];
    if (!isObject(finding)) {
      rejected.push({ finding, errors: ['Finding must be an object'] });
      continue;
    }

    for (const field of requiredTopLevel) {
      if (finding[field] === undefined || finding[field] === null || finding[field] === '') {
        errors.push(`Missing field: ${field}`);
      }
    }

    if (typeof finding.confidence !== 'number' || finding.confidence < 0 || finding.confidence > 1) {
      errors.push('confidence must be number between 0 and 1');
    }

    const taskMode = taskModeById.get(finding.taskId);
    if (taskMode === 'strict_update' && finding.confidence < MIN_STRICT_UPDATE_CONFIDENCE) {
      errors.push(`strict_update findings require confidence >= ${MIN_STRICT_UPDATE_CONFIDENCE}`);
    }

    if (!Array.isArray(finding.sources) || finding.sources.length === 0) {
      errors.push('sources must be a non-empty array');
    } else {
      for (const [index, source] of finding.sources.entries()) {
        for (const field of requiredSource) {
          if (!source?.[field]) errors.push(`sources[${index}].${field} is required`);
        }
      }
    }

    if (Array.isArray(finding.proposedChanges)) {
      for (const [index, change] of finding.proposedChanges.entries()) {
        for (const field of requiredChange) {
          if (!change?.[field]) errors.push(`proposedChanges[${index}].${field} is required`);
        }
      }
    } else {
      errors.push('proposedChanges must be an array');
    }

    if (errors.length > 0) {
      rejected.push({ finding, errors });
    } else {
      accepted.push(finding);
    }
  }

  return { accepted, rejected };
}

function dedupeFindings(findings) {
  const seen = new Set();
  const out = [];
  for (const finding of findings) {
    const key = `${finding.taskId}::${finding.entityId}::${finding.summary}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(finding);
  }
  return out;
}

function deriveProposedUpdates(findings) {
  const updates = [];
  for (const finding of findings) {
    for (const change of finding.proposedChanges || []) {
      updates.push({
        taskId: finding.taskId,
        entityType: finding.entityType,
        entityId: finding.entityId,
        confidence: finding.confidence,
        field: change.field,
        oldValue: change.oldValue,
        newValue: change.newValue,
        reason: change.reason,
        sources: finding.sources || [],
      });
    }
  }
  return updates;
}

function applySimpleUpdatesToRobotsFile(updates) {
  const allowedFields = new Set(['deploymentCount', 'pricingModel', 'availability', 'description']);
  const content = readFileSync(DATA_FILE, 'utf-8');
  let updatedContent = content;
  let attempted = 0;
  let applied = 0;
  let skipped = 0;

  for (const update of updates) {
    attempted += 1;
    if (update.entityType !== 'robot' || !allowedFields.has(update.field)) {
      skipped += 1;
      continue;
    }
    if (typeof update.confidence !== 'number' || update.confidence < MIN_APPLY_CONFIDENCE) {
      skipped += 1;
      continue;
    }
    if (typeof update.newValue !== 'string' || update.newValue.trim() === '') {
      skipped += 1;
      continue;
    }

    const robotSpan = findRobotObjectSpan(updatedContent, update.entityId);
    if (!robotSpan) {
      skipped += 1;
      continue;
    }

    const robotBlock = updatedContent.slice(robotSpan.start, robotSpan.end);
    const escaped = escapeSingleQuotes(update.newValue.trim());
    const fieldRegex = new RegExp(`(${update.field}:\\s*)'[^']*'`);
    if (!fieldRegex.test(robotBlock)) {
      skipped += 1;
      continue;
    }

    const updatedBlock = robotBlock.replace(fieldRegex, `$1'${escaped}'`);
    updatedContent = `${updatedContent.slice(0, robotSpan.start)}${updatedBlock}${updatedContent.slice(robotSpan.end)}`;
    applied += 1;
  }

  if (applied > 0) {
    writeFileSync(DATA_FILE, updatedContent);
  }
  return { attempted, applied, skipped };
}

function findRobotObjectSpan(content, robotId) {
  const robotsStart = content.indexOf('export const robots');
  if (robotsStart === -1) return null;
  const idNeedle = `id: '${robotId}'`;
  const idPos = content.indexOf(idNeedle, robotsStart);
  if (idPos === -1) return null;

  let start = idPos;
  while (start >= 0 && content[start] !== '{') start -= 1;
  if (start < 0) return null;

  let depth = 0;
  let end = -1;
  for (let i = start; i < content.length; i += 1) {
    const ch = content[i];
    if (ch === '{') depth += 1;
    if (ch === '}') {
      depth -= 1;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end === -1) return null;
  return { start, end };
}

function escapeSingleQuotes(text) {
  return text.replaceAll("\\", '\\\\').replaceAll("'", "\\'");
}

function writeReport({
  robots,
  tasks,
  providerPlan,
  providerResults,
  acceptedCount,
  rejectedCount,
  applied,
  isDryRun,
}) {
  const lines = [];
  lines.push('# Robonomics Research Report');
  lines.push(`Last Updated: ${new Date().toISOString()}`);
  lines.push('');
  lines.push('## Summary');
  lines.push(`- Robots tracked: ${robots.length}`);
  lines.push(`- Tasks generated: ${tasks.length}`);
  lines.push(`- Providers planned: ${providerPlan.map((p) => p.id).join(', ')}`);
  lines.push(`- Accepted findings: ${acceptedCount}`);
  lines.push(`- Rejected findings: ${rejectedCount}`);
  lines.push(`- Apply mode: ${isDryRun ? 'disabled (dry-run)' : 'enabled (default), disable via --no-apply'}`);
  lines.push(`- Minimum apply confidence: ${MIN_APPLY_CONFIDENCE}`);
  lines.push(`- Updates applied: ${applied.applied}/${applied.attempted}`);
  lines.push('');
  lines.push('## Provider Execution');
  for (const p of providerResults) {
    lines.push(`- ${p.provider}: ${p.status}, executed ${p.executedTasks || 0}, success ${p.successTasks || 0}, failed ${p.failedTasks || 0}`);
  }
  lines.push('');
  lines.push('## Artifacts');
  lines.push(`- Queue: ${relative(QUEUE_FILE)}`);
  lines.push(`- Task packet: ${relative(TASK_PACKET_FILE)}`);
  lines.push(`- Findings: ${relative(FINDINGS_FILE)}`);
  lines.push(`- Proposed updates: ${relative(PROPOSED_UPDATES_FILE)}`);
  lines.push('');
  lines.push('## Next Step');
  lines.push('Run a provider (e.g. Hermes) against `tools/output/research-tasks.md`, write JSON findings, and rerun with `--apply` after review.');
  lines.push('');

  writeFileSync(REPORT_FILE, `${lines.join('\n')}\n`);
}

function printPromptPreview() {
  const template = readFileSafe(TASK_PROMPT_FILE);
  console.log('\n=== TASK PROMPT TEMPLATE ===\n');
  console.log(template);
  console.log('\n=== FINDING SCHEMA ===\n');
  console.log(JSON.stringify(readJson(FINDING_SCHEMA_FILE), null, 2));
}

function slug(text) {
  return String(text || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function relative(path) {
  return path.replace(`${PROJECT_ROOT}/`, '');
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
