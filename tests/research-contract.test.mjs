import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import test from 'node:test';

import {
  deriveProposedAdditions,
  deriveEntityReviewCandidates,
  deriveProposedUpdates,
  expandDiscoveryTopics,
  extractDataReferencesFromFile,
  mergeDiscoveryTopics,
  runCommandProvider,
  validateExpandedTopics,
  validateFindings,
  writeEntityReviewArtifact,
} from '../tools/research.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const FIXTURE = fileURLToPath(new URL('./fixtures/mock-provider.mjs', import.meta.url));
const SCHEMA_FILE = join(ROOT, 'tools/schemas/finding.schema.json');

function readSchema() {
  return JSON.parse(readFileSync(SCHEMA_FILE, 'utf-8'));
}

function mockProvider(extraArgs = []) {
  return {
    id: 'mock',
    type: 'command',
    command: process.execPath,
    args: [FIXTURE, ...extraArgs],
    inputMode: 'stdin',
    timeoutMs: 5000,
  };
}

test('finding schema is valid JSON and exposes the action split', () => {
  const schema = readSchema();
  assert.ok(schema.required.includes('action'));
  assert.deepEqual(schema.properties.action.enum, ['update_entity', 'add_entity']);
  assert.ok(schema.properties.proposedEntity);
  assert.ok(schema.properties.entityType.enum.includes('use_case'));
});

test('validateFindings accepts update and addition findings and rejects invalid action', () => {
  const schema = readSchema();
  const tasks = [
    { id: 'robot-flippy-2', mode: 'strict_update' },
    { id: 'topic-new-robot', mode: 'broad_scan' },
  ];
  const findings = [
    {
      taskId: 'robot-flippy-2',
      entityType: 'robot',
      entityId: 'flippy-2',
      action: 'update_entity',
      summary: 'Flippy 2 gained a throughput bump.',
      confidence: 0.94,
      sources: [
        {
          url: 'https://example.com/flippy',
          title: 'Flippy update',
          publishedAt: '2026-03-01',
          excerpt: 'Throughput increased.',
        },
      ],
      proposedChanges: [
        {
          field: 'description',
          oldValue: 'old',
          newValue: 'new',
          reason: 'Confirmed by release note.',
        },
      ],
    },
    {
      taskId: 'topic-new-robot',
      entityType: 'company',
      entityId: 'nova-robotics',
      action: 'add_entity',
      summary: 'A new robotics company launched a warehouse demo.',
      confidence: 0.62,
      sources: [
        {
          url: 'https://example.com/nova',
          title: 'Nova Robotics launch',
          publishedAt: '2026-02-18',
          excerpt: 'Pilot rollout announced.',
        },
      ],
      proposedChanges: [],
      proposedEntity: {
        id: 'nova-robotics',
        name: 'Nova Robotics',
        entityType: 'company',
        summary: 'Warehouse robotics startup with a public pilot.',
      },
    },
    {
      taskId: 'topic-new-robot',
      entityType: 'company',
      entityId: 'bad',
      action: 'unknown_action',
      summary: 'Invalid finding',
      confidence: 0.1,
      sources: [
        {
          url: 'https://example.com/bad',
          title: 'Bad finding',
          publishedAt: '2026-01-01',
          excerpt: 'Nope.',
        },
      ],
      proposedChanges: [],
    },
  ];

  const validated = validateFindings(findings, schema, tasks);
  assert.equal(validated.accepted.length, 2);
  assert.equal(validated.rejected.length, 1);

  const updates = deriveProposedUpdates(validated.accepted);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].field, 'description');

  const additions = deriveProposedAdditions(validated.accepted);
  assert.equal(additions.length, 1);
  assert.equal(additions[0].proposedEntity.name, 'Nova Robotics');

  const review = deriveEntityReviewCandidates(validated.accepted);
  assert.equal(review.additions.length, 1);
  assert.equal(review.additions[0].proposedEntity.name, 'Nova Robotics');
});

test('extractDataReferencesFromFile derives industries, use cases, and companies from split catalog modules', () => {
  const references = extractDataReferencesFromFile();
  assert.ok(references.industries.includes('Logistics'));
  assert.ok(references.useCases.includes('Warehouse Order Picker'));
  assert.ok(references.companies.includes('Agility Robotics'));
});

test('validateExpandedTopics accepts valid topic suggestions and mergeDiscoveryTopics dedupes', () => {
  const accepted = validateExpandedTopics([
    {
      name: 'Warehouse autonomy breakthroughs',
      type: 'trend',
      priority: 'medium',
      objective: 'Track meaningful autonomy changes in warehouse robotics.',
      queryHints: ['warehouse autonomy 2026', 'robotics autonomy deployment'],
    },
  ]);

  assert.equal(accepted.accepted.length, 1);
  const merged = mergeDiscoveryTopics(
    {
      discoveryTopics: [
        {
          name: 'Warehouse autonomy breakthroughs',
          type: 'trend',
          priority: 'medium',
          objective: 'Existing topic.',
          queryHints: ['duplicate'],
        },
      ],
    },
    accepted.accepted
  );

  assert.equal(merged.discoveryTopics.length, 1);
});

test('runCommandProvider parses provider JSON and rejects malformed output', () => {
  const ok = runCommandProvider(mockProvider(), {
    kind: 'finding_task',
    instruction: 'Return JSON only.',
    task: { id: 'robot-flippy-2' },
  });

  assert.equal(ok.ok, true);
  assert.ok(Array.isArray(ok.findings));
  assert.equal(ok.findings.length, 2);

  const bad = runCommandProvider(mockProvider(['--mode=malformed']), {
    kind: 'finding_task',
    instruction: 'Return JSON only.',
    task: { id: 'robot-flippy-2' },
  });

  assert.equal(bad.ok, false);
  assert.match(String(bad.parseError || bad.stderr || ''), /JSON/i);
});

test('expandDiscoveryTopics uses the provider contract and writes review files safely', async () => {
  const providerPlan = [mockProvider()];
  const expansion = await expandDiscoveryTopics({
    providerPlan,
    robots: [{ id: 'flippy-2', name: 'Flippy 2', manufacturer: 'Miso Robotics', availability: 'Available' }],
    targetsConfig: {
      discoveryTopics: [
        {
          name: 'Existing research topic',
          type: 'trend',
          priority: 'medium',
          objective: 'Existing topic.',
          queryHints: ['existing'],
        },
      ],
    },
  });

  assert.equal(expansion.accepted.length, 1);

  const tempDir = mkdtempSync(join(tmpdir(), 'robonomics-review-'));
  const reviewFile = join(tempDir, 'entity-addition-review.json');
  writeEntityReviewArtifact(
    {
      generatedAt: '2026-03-25T00:00:00.000Z',
      additions: [
        {
          taskId: 'topic-new-robot',
          entityType: 'company',
          entityId: 'nova-robotics',
          confidence: 0.62,
          summary: 'New robotics company.',
          proposedEntity: {
            id: 'nova-robotics',
            name: 'Nova Robotics',
            entityType: 'company',
            summary: 'Warehouse robotics startup with a public pilot.',
          },
          sources: [],
          proposedChanges: [],
        },
      ],
    },
    reviewFile
  );

  const saved = JSON.parse(readFileSync(reviewFile, 'utf-8'));
  assert.equal(saved.additions.length, 1);
});
