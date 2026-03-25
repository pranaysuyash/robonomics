#!/usr/bin/env node

import { stdin, stdout, argv, exit } from 'node:process';

function readStdin() {
  return new Promise((resolve, reject) => {
    let data = '';
    stdin.setEncoding('utf8');
    stdin.on('data', (chunk) => {
      data += chunk;
    });
    stdin.on('end', () => resolve(data));
    stdin.on('error', reject);
  });
}

async function main() {
  const modeArg = argv.find((item) => item.startsWith('--mode='));
  const mode = modeArg ? modeArg.split('=')[1] : 'normal';
  const payloadText = await readStdin();
  const payload = payloadText ? JSON.parse(payloadText) : {};

  if (mode === 'malformed') {
    stdout.write('{"not":"json"');
    return;
  }

  if (payload.kind === 'topic_expansion') {
    stdout.write(
      JSON.stringify([
        {
          name: 'Warehouse autonomy breakthroughs',
          type: 'trend',
          priority: 'medium',
          objective: 'Track meaningful autonomy changes in warehouse robotics.',
          queryHints: ['warehouse autonomy 2026', 'robotics autonomy deployment'],
        },
      ])
    );
    return;
  }

  stdout.write(
    JSON.stringify([
      {
        taskId: payload.task?.id || 'robot-flippy-2',
        entityType: 'robot',
        entityId: 'flippy-2',
        action: 'update_entity',
        summary: 'Flippy 2 throughput increased in the latest rollout.',
        confidence: 0.94,
        sources: [
          {
            url: 'https://example.com/flippy-update',
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
            reason: 'Release note confirms throughput changes.',
          },
        ],
      },
      {
        taskId: payload.task?.id || 'robot-flippy-2',
        entityType: 'company',
        entityId: 'nova-robotics',
        action: 'add_entity',
        summary: 'A new robotics company launched a warehouse demo.',
        confidence: 0.62,
        sources: [
          {
            url: 'https://example.com/nova-launch',
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
    ])
  );
}

main().catch((error) => {
  stdout.write(JSON.stringify({ error: error?.message || String(error) }));
  exit(1);
});
