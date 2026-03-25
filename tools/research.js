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
 *   - tools/output/topic-expansions.json
 *   - tools/output/new-findings.json
 *   - tools/output/proposed-updates.json
 *   - tools/output/entity-addition-review.json
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
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const TOOLS_DIR = join(PROJECT_ROOT, 'tools');
const OUTPUT_DIR = join(TOOLS_DIR, 'output');
const LOG_DIR = join(PROJECT_ROOT, 'logs');
const LOG_FILE = join(LOG_DIR, 'research.log');
const ROBOTS_FILE = join(PROJECT_ROOT, 'src/data/robots.ts');
const INDUSTRIES_FILE = join(PROJECT_ROOT, 'src/data/industries.ts');
const PROFESSIONS_FILE = join(PROJECT_ROOT, 'src/data/professions.ts');
const REFERENCES_FILE = join(PROJECT_ROOT, 'src/data/references.ts');
const PROVIDERS_CONFIG = join(TOOLS_DIR, 'config/providers.json');
const RESEARCH_TARGETS_CONFIG = join(TOOLS_DIR, 'config/research-targets.json');
const TASK_PROMPT_FILE = join(TOOLS_DIR, 'prompts/task.md');
const FINDING_SCHEMA_FILE = join(TOOLS_DIR, 'schemas/finding.schema.json');
const FINDINGS_FILE = join(OUTPUT_DIR, 'new-findings.json');
const TOPIC_EXPANSIONS_FILE = join(OUTPUT_DIR, 'topic-expansions.json');
const ENTITY_REVIEW_FILE = join(OUTPUT_DIR, 'entity-addition-review.json');
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
const MIN_ADD_ENTITY_CONFIDENCE = 0.6;

ensureDir(OUTPUT_DIR);
ensureDir(LOG_DIR);

if (isEntryPoint()) {
  main().catch((error) => {
    log(`fatal: ${error?.stack || error?.message || String(error)}`);
    process.exitCode = 1;
  });
}

async function main() {
  if (argSet.has('--prompts')) {
    printPromptPreview();
    return;
  }

  const providersConfig = readJson(PROVIDERS_CONFIG);
  const researchTargetsConfig = readJson(RESEARCH_TARGETS_CONFIG);
  const findingSchema = readJson(FINDING_SCHEMA_FILE);
  const taskPromptTemplate = readFileSafe(TASK_PROMPT_FILE);

  const robots = extractRobotsFromFile();
  const dataReferences = extractDataReferencesFromFile();
  if (robots.length === 0) {
    throw new Error(`No robots parsed from ${ROBOTS_FILE}.`);
  }

  const providerPlan = planProviders({ providersConfig, selectedProviderArg, isManualOnly });
  const topicExpansion = await expandDiscoveryTopics({ providerPlan, robots });
  const referenceDiscoveryTopics = buildReferenceDiscoveryTopics({ robots, dataReferences });
  const mergedTargets = mergeDiscoveryTopics(
    {
      discoveryTopics: [
        ...referenceDiscoveryTopics,
        ...((researchTargetsConfig && Array.isArray(researchTargetsConfig.discoveryTopics))
          ? researchTargetsConfig.discoveryTopics
          : []),
      ],
    },
    topicExpansion.accepted
  );
  const tasks = buildTasks({
    robots,
    discoveryTopics: mergedTargets.discoveryTopics,
    taskPromptTemplate,
  });
  const queue = buildQueue({ robots, tasks, providerPlan, topicExpansion });
  writeJson(QUEUE_FILE, queue);
  writeJson(TOPIC_EXPANSIONS_FILE, topicExpansion);
  writeTaskPacket({ queue, tasks, providerPlan, findingSchema, topicExpansion });

  log(`queue: ${tasks.length} tasks for ${robots.length} robots`);
  log(`providers: ${providerPlan.map((p) => p.id).join(', ')}`);

  const execution = await runProviders({ providerPlan, tasks, findingSchema });
  const validated = validateFindings(execution.findings, findingSchema, tasks);
  const deduped = dedupeFindings(validated.accepted);
  const proposedUpdates = deriveProposedUpdates(deduped);
  const proposedAdditions = deriveProposedAdditions(deduped);
  const entityReviewCandidates = deriveEntityReviewCandidates(deduped);

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
    additions: proposedAdditions,
  });
  writeEntityReviewArtifact(entityReviewCandidates);

  let applied = { attempted: 0, applied: 0, skipped: 0 };
  if (isApply && !isDryRun) {
    applied = applyResearchChangesToDataFile({ updates: proposedUpdates, additions: proposedAdditions });
  }

  writeReport({
    robots,
    tasks,
    providerPlan,
    providerResults: execution.providerResults,
    topicExpansion,
    acceptedCount: deduped.length,
    rejectedCount: validated.rejected.length,
    entityReviewCount: entityReviewCandidates.additions.length,
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
  const content = readFileSync(ROBOTS_FILE, 'utf-8');
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

function extractDataReferencesFromFile() {
  const industriesContent = readFileSync(INDUSTRIES_FILE, 'utf-8');
  const professionsContent = readFileSync(PROFESSIONS_FILE, 'utf-8');
  const robotsContent = readFileSync(ROBOTS_FILE, 'utf-8');
  const referencesContent = existsSync(REFERENCES_FILE) ? readFileSync(REFERENCES_FILE, 'utf-8') : '';

  const industries = extractQuotedValuesFromNamedArray(industriesContent, 'industries', 'name');
  const useCases = [
    ...extractQuotedValuesFromNamedArray(professionsContent, 'professions', 'name'),
    ...extractQuotedStringsFromObjectArray(referencesContent, 'useCases'),
  ];
  const companies = [
    ...extractQuotedValuesFromNamedArray(robotsContent, 'robots', 'manufacturer'),
    ...extractQuotedStringsFromObjectArray(referencesContent, 'companies'),
  ];

  return {
    industries: [...new Set(industries)].sort(),
    useCases: [...new Set(useCases)].sort(),
    companies: [...new Set(companies)].sort(),
  };
}

function extractQuotedValuesFromNamedArray(content, exportName, fieldName) {
  const exportMarker = `export const ${exportName}`;
  const markerIdx = content.indexOf(exportMarker);
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

  const listSection = content.slice(listStart, listEnd + 1);
  const regex = new RegExp(`${fieldName}:\\s*'([^']+)'`, 'g');
  const values = [];

  for (const match of listSection.matchAll(regex)) {
    values.push(match[1]);
  }

  return [...new Set(values)].sort();
}

function extractQuotedStringsFromObjectArray(content, key) {
  if (!content) return [];
  const regex = new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`, 'm');
  const match = content.match(regex);
  if (!match) return [];
  return [...match[1].matchAll(/'([^']+)'/g)].map((entry) => entry[1]);
}

function buildReferenceDiscoveryTopics({ robots, dataReferences }) {
  const topics = [];
  const robotNames = robots.map((robot) => robot.name).sort();

  if (dataReferences.industries.length > 0) {
    topics.push({
      name: 'Industry gap scan',
      type: 'industry',
      priority: 'high',
      objective: `Use the current industry references as anchors (${dataReferences.industries.join(', ')}). Find missing industries, robots entering adjacent industries, and newly important deployment clusters not yet represented in the catalog.`,
      queryHints: [
        'industrial robotics deployments 2025 2026 by industry',
        ...dataReferences.industries.slice(0, 6).map((industry) => `${industry} robotics 2025 2026`),
      ],
    });
  }

  if (dataReferences.useCases.length > 0) {
    topics.push({
      name: 'Use case gap scan',
      type: 'use_case',
      priority: 'high',
      objective: `Use the current use-case references as anchors (${dataReferences.useCases.join(', ')}). Find missing use cases, professions, or task categories where robotics adoption is now material enough to add to the dataset.`,
      queryHints: [
        'warehouse picking fry cook surgery bricklaying robotics 2025 2026',
        ...dataReferences.useCases.slice(0, 6).map((useCase) => `${useCase} robot automation 2025 2026`),
      ],
    });
  }

  if (dataReferences.companies.length > 0 || robotNames.length > 0) {
    topics.push({
      name: 'Company and robot gap scan',
      type: 'company',
      priority: 'high',
      objective: `Use the current company and robot references as anchors. Known companies: ${dataReferences.companies.join(', ')}. Known robots: ${robotNames.join(', ')}. Find missing companies, missing robots from known companies, and net-new robots that should be added directly to the catalog.`,
      queryHints: [
        'commercial robotics companies 2025 2026',
        'new warehouse robot launch 2025 2026',
        ...dataReferences.companies.slice(0, 8).map((company) => `${company} new robot 2025 2026`),
      ],
    });
  }

  return topics;
}

function buildTasks({ robots, discoveryTopics = [], taskPromptTemplate }) {
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
        '- Return action="update_entity" for known robots only.',
        '- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.',
      ].join('\n'),
    broad_scan:
      [
        '- This is a broad discovery-scan task.',
        '- Maximize coverage of new entities/signals, even with moderate confidence.',
        '- Include early signals (pilots, announcements, funding, notable demos) with clear caveats.',
        '- Keep speculative findings low confidence (< 0.6) and avoid hard field-change proposals.',
        '- Use action="add_entity" for newly discovered entities and include proposedEntity data.',
        '- Use action="update_entity" only for well-supported changes to already-known robots.',
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

  for (const topic of discoveryTopics) {
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

function mergeDiscoveryTopics(targetsConfig, expandedTopics = []) {
  const discoveryTopics = [...(targetsConfig.discoveryTopics || [])];
  const seen = new Set(discoveryTopics.map((topic) => slug(topic.name)));

  for (const topic of expandedTopics) {
    const nameKey = slug(topic.name);
    if (!nameKey || seen.has(nameKey)) continue;
    seen.add(nameKey);
    discoveryTopics.push({
      name: topic.name,
      type: topic.type || 'trend',
      priority: topic.priority || 'medium',
      objective: topic.objective || `Investigate ${topic.name}.`,
      queryHints: Array.isArray(topic.queryHints) ? topic.queryHints : [],
    });
  }

  return { ...targetsConfig, discoveryTopics };
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

function buildQueue({ robots, tasks, providerPlan, topicExpansion }) {
  return {
    generatedAt: new Date().toISOString(),
    stats: {
      robots: robots.length,
      tasks: tasks.length,
      providers: providerPlan.length,
      highPriorityTasks: tasks.filter((t) => t.priority === 'high').length,
      expandedTopics: topicExpansion?.accepted?.length || 0,
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

function writeTaskPacket({ queue, tasks, providerPlan, findingSchema, topicExpansion }) {
  const lines = [];
  lines.push('# Robonomics Research Tasks');
  lines.push('');
  lines.push(`Generated: ${queue.generatedAt}`);
  lines.push(`Providers: ${providerPlan.map((p) => p.id).join(', ')}`);
  lines.push(`Tasks: ${tasks.length}`);
  lines.push(`Expanded topics accepted: ${topicExpansion?.accepted?.length || 0}`);
  lines.push('');
  lines.push('## Output Contract');
  lines.push('Return a JSON array of findings matching the schema below.');
  lines.push('Each finding must include `action` (`update_entity` or `add_entity`).');
  lines.push('Use `proposedEntity` only for `add_entity` findings.');
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
          kind: 'finding_task',
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

    const parsed = parseProviderOutput(output);
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

function parseProviderOutput(output) {
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

async function expandDiscoveryTopics({ providerPlan, robots }) {
  const accepted = [];
  const rejected = [];
  const providerResults = [];
  const catalogSnapshot = {
    robotsTracked: robots.length,
    manufacturers: [...new Set(robots.map((robot) => robot.manufacturer))].sort(),
    availabilityBreakdown: robots.reduce((acc, robot) => {
      acc[robot.availability] = (acc[robot.availability] || 0) + 1;
      return acc;
    }, {}),
  };

  for (const provider of providerPlan) {
    if (provider.type === 'manual') {
      providerResults.push({
        provider: provider.id,
        status: 'manual_only',
        executedTasks: 0,
        acceptedTopics: 0,
      });
      continue;
    }

    const payload = {
      kind: 'topic_expansion',
      instruction:
        provider.instruction ||
        'Suggest additional discovery topics as a JSON array of topic objects only. Return no markdown, no prose, and no wrapper object. Focus on open-ended gaps in the catalog instead of repeating the catalog itself.',
      robots: robots.map((robot) => ({
        id: robot.id,
        name: robot.name,
        manufacturer: robot.manufacturer,
        availability: robot.availability,
      })),
      seedTopics: [],
      catalogSnapshot,
    };

    const run = runCommandProvider(provider, payload);
    const parsedTopics = Array.isArray(run.findings) ? run.findings : [];
    const validated = validateExpandedTopics(parsedTopics);
    accepted.push(...validated.accepted);
    rejected.push(...validated.rejected);

    providerResults.push({
      provider: provider.id,
      status: run.ok ? 'executed' : 'failed',
      executedTasks: 1,
      acceptedTopics: validated.accepted.length,
      rejectedTopics: validated.rejected.length,
      parseError: run.parseError || '',
    });
  }

  return {
    generatedAt: new Date().toISOString(),
    accepted,
    rejected,
    providerResults,
  };
}

function validateExpandedTopics(topics) {
  const accepted = [];
  const rejected = [];
  const seen = new Set();

  for (const topic of topics) {
    const errors = [];
    if (!isObject(topic)) {
      rejected.push({ topic, errors: ['Topic suggestion must be an object'] });
      continue;
    }

    if (typeof topic.name !== 'string' || topic.name.trim() === '') errors.push('name is required');
    if (typeof topic.objective !== 'string' || topic.objective.trim() === '') errors.push('objective is required');
    if (typeof topic.type !== 'string' || topic.type.trim() === '') errors.push('type is required');
    if (!Array.isArray(topic.queryHints)) errors.push('queryHints must be an array');

    const normalizedName = slug(topic.name);
    if (!normalizedName) errors.push('name must produce a valid slug');
    if (seen.has(normalizedName)) errors.push('duplicate topic suggestion');

    if (errors.length > 0) {
      rejected.push({ topic, errors });
      continue;
    }

    seen.add(normalizedName);
    accepted.push({
      name: topic.name.trim(),
      type: topic.type.trim(),
      priority: topic.priority || 'medium',
      objective: topic.objective.trim(),
      queryHints: topic.queryHints
        .filter((hint) => typeof hint === 'string')
        .map((hint) => hint.trim())
        .filter(Boolean),
    });
  }

  return { accepted, rejected };
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

    if (!['update_entity', 'add_entity'].includes(finding.action)) {
      errors.push('action must be update_entity or add_entity');
    }

    if (typeof finding.confidence !== 'number' || finding.confidence < 0 || finding.confidence > 1) {
      errors.push('confidence must be number between 0 and 1');
    }

    const taskMode = taskModeById.get(finding.taskId);
    if (taskMode === 'strict_update' && finding.confidence < MIN_STRICT_UPDATE_CONFIDENCE) {
      errors.push(`strict_update findings require confidence >= ${MIN_STRICT_UPDATE_CONFIDENCE}`);
    }

    if (taskMode === 'strict_update' && finding.action !== 'update_entity') {
      errors.push('strict_update tasks must return action=update_entity');
    }
    if (taskMode === 'broad_scan' && finding.action === 'update_entity' && finding.entityType !== 'robot') {
      errors.push('update_entity findings are only supported for robots');
    }
    if (finding.action === 'add_entity' && typeof finding.proposedEntity !== 'object') {
      errors.push('proposedEntity is required for add_entity findings');
    }
    if (finding.action === 'update_entity' && finding.proposedEntity !== undefined) {
      errors.push('proposedEntity must be omitted for update_entity findings');
    }
    if (finding.action === 'add_entity' && finding.confidence < MIN_ADD_ENTITY_CONFIDENCE) {
      errors.push(`add_entity findings require confidence >= ${MIN_ADD_ENTITY_CONFIDENCE}`);
    }

    if (!Array.isArray(finding.sources) || finding.sources.length === 0) {
      errors.push('sources must be a non-empty array');
    } else {
      for (const [index, source] of finding.sources.entries()) {
        for (const field of requiredSource) {
          if (source?.[field] === undefined) errors.push(`sources[${index}].${field} is required`);
        }
      }
    }

    if (Array.isArray(finding.proposedChanges)) {
      for (const [index, change] of finding.proposedChanges.entries()) {
        for (const field of requiredChange) {
          if (change?.[field] === undefined) errors.push(`proposedChanges[${index}].${field} is required`);
        }
      }
    } else {
      errors.push('proposedChanges must be an array');
    }

    if (finding.action === 'add_entity' && isObject(finding.proposedEntity)) {
      if (typeof finding.proposedEntity.id !== 'string' || finding.proposedEntity.id.trim() === '') {
        errors.push('proposedEntity.id is required');
      }
      if (typeof finding.proposedEntity.name !== 'string' || finding.proposedEntity.name.trim() === '') {
        errors.push('proposedEntity.name is required');
      }
      if (typeof finding.proposedEntity.entityType !== 'string' || finding.proposedEntity.entityType.trim() === '') {
        errors.push('proposedEntity.entityType is required');
      }
      if (typeof finding.proposedEntity.summary !== 'string' || finding.proposedEntity.summary.trim() === '') {
        errors.push('proposedEntity.summary is required');
      }
      if (['robot', 'new_robot'].includes(finding.proposedEntity.entityType)) {
        const requiredRobotFields = [
          'manufacturer',
          'pricingModel',
          'availability',
          'deploymentCount',
          'description',
        ];
        for (const field of requiredRobotFields) {
          if (typeof finding.proposedEntity[field] !== 'string' || finding.proposedEntity[field].trim() === '') {
            errors.push(`proposedEntity.${field} is required for robot additions`);
          }
        }
        if (!Array.isArray(finding.proposedEntity.limitations)) {
          errors.push('proposedEntity.limitations is required for robot additions');
        }
        if (!isObject(finding.proposedEntity.specs)) {
          errors.push('proposedEntity.specs is required for robot additions');
        }
        if (!Array.isArray(finding.proposedEntity.evidence)) {
          errors.push('proposedEntity.evidence is required for robot additions');
        }
        if (!Array.isArray(finding.proposedEntity.capabilities)) {
          errors.push('proposedEntity.capabilities is required for robot additions');
        }
      }
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
    const entityKey = finding.action === 'add_entity' ? finding.proposedEntity?.id || finding.entityId : finding.entityId;
    const key = `${finding.taskId}::${finding.action}::${entityKey}::${finding.summary}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(finding);
  }
  return out;
}

function deriveProposedUpdates(findings) {
  const updates = [];
  for (const finding of findings) {
    if (finding.action !== 'update_entity') continue;
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

function deriveProposedAdditions(findings) {
  return findings
    .filter((finding) => finding.action === 'add_entity' && isObject(finding.proposedEntity))
    .map((finding) => ({
      taskId: finding.taskId,
      entityType: finding.proposedEntity.entityType || finding.entityType,
      entityId: finding.proposedEntity.id || finding.entityId,
      confidence: finding.confidence,
      summary: finding.summary,
      proposedEntity: finding.proposedEntity,
      sources: finding.sources || [],
      proposedChanges: finding.proposedChanges || [],
    }));
}

function deriveEntityReviewCandidates(findings) {
  const additions = [];
  for (const finding of findings) {
    if (finding.action !== 'add_entity' || !isObject(finding.proposedEntity)) continue;
    additions.push({
      taskId: finding.taskId,
      entityType: finding.entityType,
      entityId: finding.entityId,
      confidence: finding.confidence,
      summary: finding.summary,
      proposedEntity: finding.proposedEntity,
      sources: finding.sources || [],
      proposedChanges: finding.proposedChanges || [],
    });
  }
  return {
    generatedAt: new Date().toISOString(),
    additions,
  };
}

function writeEntityReviewArtifact(reviewData, filePath = ENTITY_REVIEW_FILE) {
  writeJson(filePath, reviewData);
}

function applyResearchChangesToDataFile({ updates, additions }) {
  const allowedFields = new Set(['deploymentCount', 'pricingModel', 'availability', 'description']);
  let robotsContent = readFileSync(ROBOTS_FILE, 'utf-8');
  let industriesContent = readFileSync(INDUSTRIES_FILE, 'utf-8');
  let referencesContent = readFileSync(REFERENCES_FILE, 'utf-8');
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

    const robotSpan = findRobotObjectSpan(robotsContent, update.entityId);
    if (!robotSpan) {
      skipped += 1;
      continue;
    }

    const robotBlock = robotsContent.slice(robotSpan.start, robotSpan.end);
    const escaped = escapeSingleQuotes(update.newValue.trim());
    const fieldRegex = new RegExp(`(${update.field}:\\s*)'[^']*'`);
    if (!fieldRegex.test(robotBlock)) {
      skipped += 1;
      continue;
    }

    const updatedBlock = robotBlock.replace(fieldRegex, `$1'${escaped}'`);
    robotsContent = `${robotsContent.slice(0, robotSpan.start)}${updatedBlock}${robotsContent.slice(robotSpan.end)}`;
    applied += 1;
  }

  for (const addition of additions) {
    attempted += 1;
    if (typeof addition.confidence !== 'number' || addition.confidence < MIN_ADD_ENTITY_CONFIDENCE) {
      skipped += 1;
      continue;
    }

    const nextFiles = applyAdditionToDataFiles(
      { robotsContent, industriesContent, referencesContent },
      addition
    );
    if (
      nextFiles.robotsContent === robotsContent &&
      nextFiles.industriesContent === industriesContent &&
      nextFiles.referencesContent === referencesContent
    ) {
      skipped += 1;
      continue;
    }

    robotsContent = nextFiles.robotsContent;
    industriesContent = nextFiles.industriesContent;
    referencesContent = nextFiles.referencesContent;
    applied += 1;
  }

  robotsContent = updateResearchDate(robotsContent);
  industriesContent = updateResearchDate(industriesContent);
  referencesContent = updateResearchDate(referencesContent);

  if (applied > 0) {
    writeFileSync(ROBOTS_FILE, robotsContent);
    writeFileSync(INDUSTRIES_FILE, industriesContent);
    writeFileSync(REFERENCES_FILE, referencesContent);
  }
  return { attempted, applied, skipped };
}

function applyAdditionToDataFiles(files, addition) {
  const entityType = addition.entityType;
  const proposedEntity = addition.proposedEntity || {};
  const nextFiles = { ...files };

  if (['robot', 'new_robot'].includes(entityType)) {
    nextFiles.robotsContent = appendRobotEntity(files.robotsContent, proposedEntity);
    return nextFiles;
  }

  if (entityType === 'industry') {
    nextFiles.industriesContent = appendIndustryEntity(files.industriesContent, proposedEntity);
    return nextFiles;
  }

  if (entityType === 'company') {
    nextFiles.referencesContent = appendReferenceValue(files.referencesContent, 'companies', proposedEntity.name);
    return nextFiles;
  }

  if (entityType === 'use_case') {
    nextFiles.referencesContent = appendReferenceValue(files.referencesContent, 'useCases', proposedEntity.name);
    return nextFiles;
  }

  if (entityType === 'capability') {
    nextFiles.referencesContent = appendReferenceValue(files.referencesContent, 'capabilities', proposedEntity.name);
    return nextFiles;
  }

  if (entityType === 'trend') {
    nextFiles.referencesContent = appendReferenceValue(files.referencesContent, 'trends', proposedEntity.name);
    return nextFiles;
  }

  return nextFiles;
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

function appendRobotEntity(content, proposedEntity) {
  const robotId = String(proposedEntity.id || '').trim();
  const robotName = String(proposedEntity.name || '').trim();
  if (!robotId || !robotName) return content;
  if (findRobotObjectSpan(content, robotId)) return content;

  const robotsMarker = 'export const robots';
  const markerIdx = content.indexOf(robotsMarker);
  if (markerIdx === -1) return content;

  const listStart = content.indexOf('[', markerIdx);
  if (listStart === -1) return content;

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

  if (listEnd === -1) return content;

  const objectLiteral = renderRobotEntity(proposedEntity);
  const beforeListEnd = content.slice(0, listEnd).trimEnd();
  const separator = beforeListEnd.endsWith('[') ? '\n' : ',\n';
  return `${content.slice(0, listEnd)}${separator}${objectLiteral}\n${content.slice(listEnd)}`;
}

function appendIndustryEntity(content, proposedEntity) {
  const industryName = String(proposedEntity.name || '').trim();
  if (!industryName) return content;

  const marker = 'export const industries';
  const markerIdx = content.indexOf(marker);
  if (markerIdx === -1) return content;

  const listStart = content.indexOf('[', markerIdx);
  if (listStart === -1) return content;

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

  if (listEnd === -1) return content;

  const listSection = content.slice(listStart, listEnd + 1);
  if (new RegExp(`name:\\s*'${escapeRegExp(industryName)}'`).test(listSection)) {
    return content;
  }

  const description = escapeSingleQuotes(String(proposedEntity.description || proposedEntity.summary || '').trim());
  const futureImpactScore = Number.isFinite(proposedEntity.futureImpactScore)
    ? Math.max(0, Math.min(100, Math.round(proposedEntity.futureImpactScore)))
    : 50;
  const industryLiteral = `\n  { name: '${escapeSingleQuotes(industryName)}', description: '${description}', futureImpactScore: ${futureImpactScore} },`;

  return `${content.slice(0, listEnd)}${industryLiteral}\n${content.slice(listEnd)}`;
}

function appendReferenceValue(content, key, value) {
  const normalizedValue = String(value || '').trim();
  if (!normalizedValue) return content;

  const regex = new RegExp(`(${key}:\\s*\\[)([^\\]]*)(\\])`, 'm');
  const match = content.match(regex);
  if (!match) return content;

  const currentValues = [...match[2].matchAll(/'([^']+)'/g)].map((entry) => entry[1]);
  if (currentValues.includes(normalizedValue)) return content;

  const insertion = currentValues.length === 0
    ? `'${escapeSingleQuotes(normalizedValue)}'`
    : `${match[2].trimEnd()}, '${escapeSingleQuotes(normalizedValue)}'`;

  return content.replace(regex, `$1${insertion}$3`);
}

function renderRobotEntity(proposedEntity) {
  const specs = sortObjectEntries(proposedEntity.specs || {});
  const limitations = Array.isArray(proposedEntity.limitations) ? proposedEntity.limitations : [];
  const evidence = Array.isArray(proposedEntity.evidence) ? proposedEntity.evidence : [];
  const capabilities = Array.isArray(proposedEntity.capabilities) ? proposedEntity.capabilities : [];
  const lines = [];

  lines.push('  {');
  lines.push(`    id: '${escapeSingleQuotes(String(proposedEntity.id || '').trim())}',`);
  lines.push(`    name: '${escapeSingleQuotes(String(proposedEntity.name || '').trim())}',`);
  lines.push(`    manufacturer: '${escapeSingleQuotes(String(proposedEntity.manufacturer || '').trim())}',`);
  lines.push(`    pricingModel: '${escapeSingleQuotes(String(proposedEntity.pricingModel || '').trim())}',`);
  lines.push(`    availability: '${escapeSingleQuotes(String(proposedEntity.availability || 'Available').trim())}',`);
  lines.push(`    deploymentCount: '${escapeSingleQuotes(String(proposedEntity.deploymentCount || '').trim())}',`);
  lines.push(`    description: '${escapeSingleQuotes(String(proposedEntity.description || proposedEntity.summary || '').trim())}',`);
  if (proposedEntity.videoUrl) {
    lines.push(`    videoUrl: '${escapeSingleQuotes(String(proposedEntity.videoUrl).trim())}',`);
  }
  lines.push('    limitations: [');
  for (const limitation of limitations) {
    lines.push(`      '${escapeSingleQuotes(String(limitation).trim())}',`);
  }
  lines.push('    ],');
  lines.push('    specs: {');
  for (const [specKey, specValue] of Object.entries(specs)) {
    lines.push(`      '${escapeSingleQuotes(specKey)}': '${escapeSingleQuotes(String(specValue).trim())}',`);
  }
  lines.push('    },');
  lines.push('    evidence: [');
  for (const item of evidence) {
    lines.push(`      { id: '${escapeSingleQuotes(String(item.id || '').trim())}', title: '${escapeSingleQuotes(String(item.title || '').trim())}', url: '${escapeSingleQuotes(String(item.url || '').trim())}', type: '${escapeSingleQuotes(String(item.type || 'Company Claim').trim())}', verified: ${Boolean(item.verified)}, deploymentType: '${escapeSingleQuotes(String(item.deploymentType || 'Production').trim())}' },`);
  }
  lines.push('    ],');
  lines.push('    capabilities: [');
  for (const item of capabilities) {
    const evidenceIds = Array.isArray(item.evidenceIds) ? item.evidenceIds : [];
    const evidenceLiteral = evidenceIds.map((entry) => `'${escapeSingleQuotes(String(entry).trim())}'`).join(', ');
    lines.push(`      { taskId: '${escapeSingleQuotes(String(item.taskId || '').trim())}', successLevel: '${escapeSingleQuotes(String(item.successLevel || 'Partial').trim())}', confidenceScore: ${Number(item.confidenceScore || 0)}, evidenceIds: [${evidenceLiteral}], notes: '${escapeSingleQuotes(String(item.notes || '').trim())}' },`);
  }
  lines.push('    ]');
  lines.push('  }');

  return lines.join('\n');
}

function sortObjectEntries(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key, value]) => String(key).trim() && String(value ?? '').trim())
      .sort(([left], [right]) => left.localeCompare(right))
  );
}

function updateResearchDate(content) {
  const currentDate = new Date().toISOString().slice(0, 10);
  return content.replace(/\/\/ Last Research Update: \d{4}-\d{2}-\d{2}/, `// Last Research Update: ${currentDate}`);
}

function escapeSingleQuotes(text) {
  return text.replaceAll("\\", '\\\\').replaceAll("'", "\\'");
}

function escapeRegExp(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function writeReport({
  robots,
  tasks,
  providerPlan,
  providerResults,
  topicExpansion,
  acceptedCount,
  rejectedCount,
  entityReviewCount,
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
  lines.push(`- Expanded discovery topics: ${topicExpansion?.accepted?.length || 0}`);
  lines.push(`- Accepted findings: ${acceptedCount}`);
  lines.push(`- Rejected findings: ${rejectedCount}`);
  lines.push(`- Catalog addition candidates: ${entityReviewCount}`);
  lines.push(`- Apply mode: ${isDryRun ? 'disabled (dry-run)' : 'enabled (default), disable via --no-apply'}`);
  lines.push(`- Minimum apply confidence: ${MIN_APPLY_CONFIDENCE}`);
  lines.push(`- Updates applied: ${applied.applied}/${applied.attempted}`);
  if (acceptedCount === 0 && rejectedCount === 0) {
    lines.push('- Warning: no findings were returned by any provider.');
  }
  lines.push('');
  lines.push('## Topic Expansion');
  for (const p of topicExpansion?.providerResults || []) {
    lines.push(`- ${p.provider}: ${p.status}, accepted ${p.acceptedTopics || 0}, rejected ${p.rejectedTopics || 0}`);
  }
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
  lines.push(`- Entity audit: ${relative(ENTITY_REVIEW_FILE)}`);
  lines.push(`- Topic expansions: ${relative(TOPIC_EXPANSIONS_FILE)}`);
  lines.push('');
  lines.push('## Next Step');
  lines.push('Run any command-capable harness against `tools/output/research-tasks.md` or configure a command provider that reads the payload and returns JSON only. High-confidence updates and additions will be written directly into the catalog when `--no-apply` is not set.');
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

function isEntryPoint() {
  return process.argv[1] ? resolve(process.argv[1]) === fileURLToPath(import.meta.url) : false;
}

export {
  buildTasks,
  buildQueue,
  dedupeFindings,
  deriveProposedAdditions,
  deriveEntityReviewCandidates,
  deriveProposedUpdates,
  expandDiscoveryTopics,
  extractDataReferencesFromFile,
  mergeDiscoveryTopics,
  parseProviderOutput,
  planProviders,
  runCommandProvider,
  validateExpandedTopics,
  validateFindings,
  writeEntityReviewArtifact,
};
