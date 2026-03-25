# Robonomics Research Tasks

Generated: 2026-03-25T11:09:47.091Z
Providers: hermes, manual
Tasks: 36
Expanded topics accepted: 0

## Output Contract
Return a JSON array of findings matching the schema below.
Each finding must include `action` (`update_entity` or `add_entity`).
Use `proposedEntity` only for `add_entity` findings.

## Finding Schema
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ResearchFinding",
  "type": "object",
  "required": [
    "taskId",
    "entityType",
    "entityId",
    "action",
    "summary",
    "confidence",
    "sources",
    "proposedChanges"
  ],
  "properties": {
    "taskId": {
      "type": "string"
    },
    "action": {
      "type": "string",
      "enum": [
        "update_entity",
        "add_entity"
      ]
    },
    "entityType": {
      "type": "string",
      "enum": [
        "robot",
        "industry",
        "trend",
        "company",
        "capability",
        "new_robot"
      ]
    },
    "entityId": {
      "type": "string"
    },
    "summary": {
      "type": "string"
    },
    "confidence": {
      "type": "number",
      "minimum": 0,
      "maximum": 1
    },
    "sources": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "url",
          "title",
          "publishedAt",
          "excerpt"
        ],
        "properties": {
          "url": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "publishedAt": {
            "type": "string"
          },
          "excerpt": {
            "type": "string"
          }
        }
      }
    },
    "proposedChanges": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "field",
          "oldValue",
          "newValue",
          "reason"
        ],
        "properties": {
          "field": {
            "type": "string"
          },
          "oldValue": {
            "type": [
              "string",
              "number",
              "boolean",
              "null"
            ]
          },
          "newValue": {
            "type": [
              "string",
              "number",
              "boolean",
              "null"
            ]
          },
          "reason": {
            "type": "string"
          }
        }
      }
    },
    "proposedEntity": {
      "type": "object",
      "required": [
        "id",
        "name",
        "entityType",
        "summary"
      ],
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "entityType": {
          "type": "string",
          "enum": [
            "robot",
            "industry",
            "trend",
            "company",
            "capability",
            "new_robot"
          ]
        },
        "summary": {
          "type": "string"
        },
        "manufacturer": {
          "type": "string"
        },
        "pricingModel": {
          "type": "string"
        },
        "availability": {
          "type": "string"
        },
        "description": {
          "type": "string"
        }
      },
      "additionalProperties": true
    }
  },
  "allOf": [
    {
      "if": {
        "properties": {
          "action": {
            "const": "add_entity"
          }
        }
      },
      "then": {
        "required": [
          "proposedEntity"
        ]
      }
    },
    {
      "if": {
        "properties": {
          "action": {
            "const": "update_entity"
          }
        }
      },
      "then": {
        "not": {
          "required": [
            "proposedEntity"
          ]
        }
      }
    }
  ],
  "additionalProperties": true
}
```

## Tasks
### 1. robot-flippy-2 (high)
Type: robot
Entity: Flippy 2
Query hints:
- Flippy 2 Miso Robotics 2025 2026 deployment
- Flippy 2 specs pricing
- Flippy 2 limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Flippy 2" by Miso Robotics on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: flippy-2
- entityName: Flippy 2
- manufacturer: Miso Robotics
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 2. robot-hadrian-x (high)
Type: robot
Entity: Hadrian X
Query hints:
- Hadrian X FBR 2025 2026 deployment
- Hadrian X specs pricing
- Hadrian X limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Hadrian X" by FBR on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: hadrian-x
- entityName: Hadrian X
- manufacturer: FBR
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 3. robot-dusty-fieldprinter (high)
Type: robot
Entity: FieldPrinter 2
Query hints:
- FieldPrinter 2 Dusty Robotics 2025 2026 deployment
- FieldPrinter 2 specs pricing
- FieldPrinter 2 limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "FieldPrinter 2" by Dusty Robotics on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: dusty-fieldprinter
- entityName: FieldPrinter 2
- manufacturer: Dusty Robotics
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 4. robot-grid-maintenance-robot (high)
Type: robot
Entity: State Grid Inspection Robot
Query hints:
- State Grid Inspection Robot State Grid Corp of China 2025 2026 deployment
- State Grid Inspection Robot specs pricing
- State Grid Inspection Robot limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "State Grid Inspection Robot" by State Grid Corp of China on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: grid-maintenance-robot
- entityName: State Grid Inspection Robot
- manufacturer: State Grid Corp of China
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 5. robot-davinci-5 (high)
Type: robot
Entity: Da Vinci 5
Query hints:
- Da Vinci 5 Intuitive Surgical 2025 2026 deployment
- Da Vinci 5 specs pricing
- Da Vinci 5 limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Da Vinci 5" by Intuitive Surgical on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: davinci-5
- entityName: Da Vinci 5
- manufacturer: Intuitive Surgical
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 6. robot-stryker-mako (high)
Type: robot
Entity: Mako SmartRobotics
Query hints:
- Mako SmartRobotics Stryker 2025 2026 deployment
- Mako SmartRobotics specs pricing
- Mako SmartRobotics limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Mako SmartRobotics" by Stryker on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: stryker-mako
- entityName: Mako SmartRobotics
- manufacturer: Stryker
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 7. robot-figure-02 (high)
Type: robot
Entity: Figure 02
Query hints:
- Figure 02 Figure AI 2025 2026 deployment
- Figure 02 specs pricing
- Figure 02 limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Figure 02" by Figure AI on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: figure-02
- entityName: Figure 02
- manufacturer: Figure AI
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 8. robot-agility-digit (high)
Type: robot
Entity: Digit
Query hints:
- Digit Agility Robotics 2025 2026 deployment
- Digit specs pricing
- Digit limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Digit" by Agility Robotics on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: agility-digit
- entityName: Digit
- manufacturer: Agility Robotics
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 9. robot-carbon-robotics-weeder (high)
Type: robot
Entity: LaserWeeder
Query hints:
- LaserWeeder Carbon Robotics 2025 2026 deployment
- LaserWeeder specs pricing
- LaserWeeder limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "LaserWeeder" by Carbon Robotics on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: carbon-robotics-weeder
- entityName: LaserWeeder
- manufacturer: Carbon Robotics
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 10. robot-monarch-tractor-mkv (high)
Type: robot
Entity: MK-V
Query hints:
- MK-V Monarch Tractor 2025 2026 deployment
- MK-V specs pricing
- MK-V limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "MK-V" by Monarch Tractor on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: monarch-tractor-mkv
- entityName: MK-V
- manufacturer: Monarch Tractor
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 11. robot-stretch-boston-dynamics (high)
Type: robot
Entity: Stretch
Query hints:
- Stretch Boston Dynamics 2025 2026 deployment
- Stretch specs pricing
- Stretch limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Stretch" by Boston Dynamics on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: stretch-boston-dynamics
- entityName: Stretch
- manufacturer: Boston Dynamics
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 12. robot-simbe-tally (high)
Type: robot
Entity: Tally 4.0
Query hints:
- Tally 4.0 Simbe Robotics 2025 2026 deployment
- Tally 4.0 specs pricing
- Tally 4.0 limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Tally 4.0" by Simbe Robotics on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: simbe-tally
- entityName: Tally 4.0
- manufacturer: Simbe Robotics
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 13. robot-knightscope-k5 (high)
Type: robot
Entity: K5
Query hints:
- K5 Knightscope 2025 2026 deployment
- K5 specs pricing
- K5 limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "K5" by Knightscope on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: knightscope-k5
- entityName: K5
- manufacturer: Knightscope
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 14. robot-tesla-optimus (high)
Type: robot
Entity: Optimus Gen 2
Query hints:
- Optimus Gen 2 Tesla 2025 2026 deployment
- Optimus Gen 2 specs pricing
- Optimus Gen 2 limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Optimus Gen 2" by Tesla on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: tesla-optimus
- entityName: Optimus Gen 2
- manufacturer: Tesla
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 15. robot-boston-dynamics-atlas (high)
Type: robot
Entity: Electric Atlas
Query hints:
- Electric Atlas Boston Dynamics 2025 2026 deployment
- Electric Atlas specs pricing
- Electric Atlas limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Electric Atlas" by Boston Dynamics on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: boston-dynamics-atlas
- entityName: Electric Atlas
- manufacturer: Boston Dynamics
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 16. robot-apptronik-apollo (high)
Type: robot
Entity: Apollo
Query hints:
- Apollo Apptronik 2025 2026 deployment
- Apollo specs pricing
- Apollo limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Apollo" by Apptronik on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: apptronik-apollo
- entityName: Apollo
- manufacturer: Apptronik
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 17. robot-amazon-astro (high)
Type: robot
Entity: Astro
Query hints:
- Astro Amazon 2025 2026 deployment
- Astro specs pricing
- Astro limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Astro" by Amazon on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: amazon-astro
- entityName: Astro
- manufacturer: Amazon
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 18. robot-serve-robotics (high)
Type: robot
Entity: Serve Autonomous Robot
Query hints:
- Serve Autonomous Robot Serve Robotics 2025 2026 deployment
- Serve Autonomous Robot specs pricing
- Serve Autonomous Robot limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Serve Autonomous Robot" by Serve Robotics on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: serve-robotics
- entityName: Serve Autonomous Robot
- manufacturer: Serve Robotics
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 19. robot-starship-delivery (high)
Type: robot
Entity: Starship Delivery Robot
Query hints:
- Starship Delivery Robot Starship Technologies 2025 2026 deployment
- Starship Delivery Robot specs pricing
- Starship Delivery Robot limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Starship Delivery Robot" by Starship Technologies on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: starship-delivery
- entityName: Starship Delivery Robot
- manufacturer: Starship Technologies
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 20. robot-kiwibot (high)
Type: robot
Entity: Kiwibot 4.0
Query hints:
- Kiwibot 4.0 Kiwibot 2025 2026 deployment
- Kiwibot 4.0 specs pricing
- Kiwibot 4.0 limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Kiwibot 4.0" by Kiwibot on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: kiwibot
- entityName: Kiwibot 4.0
- manufacturer: Kiwibot
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 21. robot-neolix (high)
Type: robot
Entity: Neolix Autonomous Van
Query hints:
- Neolix Autonomous Van Neolix 2025 2026 deployment
- Neolix Autonomous Van specs pricing
- Neolix Autonomous Van limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Neolix Autonomous Van" by Neolix on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: neolix
- entityName: Neolix Autonomous Van
- manufacturer: Neolix
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 22. robot-doordash-dot (high)
Type: robot
Entity: Dot
Query hints:
- Dot DoorDash 2025 2026 deployment
- Dot specs pricing
- Dot limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Dot" by DoorDash on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: doordash-dot
- entityName: Dot
- manufacturer: DoorDash
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 23. robot-brightpick-autopicker (high)
Type: robot
Entity: Autopicker
Query hints:
- Autopicker Brightpick 2025 2026 deployment
- Autopicker specs pricing
- Autopicker limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Autopicker" by Brightpick on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: brightpick-autopicker
- entityName: Autopicker
- manufacturer: Brightpick
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 24. robot-galbot-g1 (high)
Type: robot
Entity: G1 Mobile Manipulator
Query hints:
- G1 Mobile Manipulator Galbot 2025 2026 deployment
- G1 Mobile Manipulator specs pricing
- G1 Mobile Manipulator limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "G1 Mobile Manipulator" by Galbot on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: galbot-g1
- entityName: G1 Mobile Manipulator
- manufacturer: Galbot
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 25. robot-fendt-xaver (high)
Type: robot
Entity: Xaver GT
Query hints:
- Xaver GT Fendt (AGCO) 2025 2026 deployment
- Xaver GT specs pricing
- Xaver GT limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Xaver GT" by Fendt (AGCO) on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: fendt-xaver
- entityName: Xaver GT
- manufacturer: Fendt (AGCO)
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 26. robot-john-deere-autonomy (high)
Type: robot
Entity: John Deere Autonomy 2.0
Query hints:
- John Deere Autonomy 2.0 John Deere 2025 2026 deployment
- John Deere Autonomy 2.0 specs pricing
- John Deere Autonomy 2.0 limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "John Deere Autonomy 2.0" by John Deere on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: john-deere-autonomy
- entityName: John Deere Autonomy 2.0
- manufacturer: John Deere
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 27. robot-geek-robots (high)
Type: robot
Entity: Geek+ AMR
Query hints:
- Geek+ AMR Geek+ 2025 2026 deployment
- Geek+ AMR specs pricing
- Geek+ AMR limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Geek+ AMR" by Geek+ on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: geek-robots
- entityName: Geek+ AMR
- manufacturer: Geek+
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 28. robot-greyorange (high)
Type: robot
Entity: GreyOrange Butler
Query hints:
- GreyOrange Butler GreyOrange 2025 2026 deployment
- GreyOrange Butler specs pricing
- GreyOrange Butler limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "GreyOrange Butler" by GreyOrange on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: greyorange
- entityName: GreyOrange Butler
- manufacturer: GreyOrange
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 29. robot-mir-mobile (high)
Type: robot
Entity: MC600 Mobile Manipulator
Query hints:
- MC600 Mobile Manipulator Mobile Industrial Robots (MiR) 2025 2026 deployment
- MC600 Mobile Manipulator specs pricing
- MC600 Mobile Manipulator limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "MC600 Mobile Manipulator" by Mobile Industrial Robots (MiR) on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: mir-mobile
- entityName: MC600 Mobile Manipulator
- manufacturer: Mobile Industrial Robots (MiR)
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 30. robot-nuro (high)
Type: robot
Entity: Nuro R3
Query hints:
- Nuro R3 Nuro 2025 2026 deployment
- Nuro R3 specs pricing
- Nuro R3 limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Nuro R3" by Nuro on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: nuro
- entityName: Nuro R3
- manufacturer: Nuro
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 31. robot-ecorobotix (high)
Type: robot
Entity: Ecorobotix
Query hints:
- Ecorobotix Ecorobotix 2025 2026 deployment
- Ecorobotix specs pricing
- Ecorobotix limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Ecorobotix" by Ecorobotix on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: ecorobotix
- entityName: Ecorobotix
- manufacturer: Ecorobotix
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 32. robot-saga-robotics (high)
Type: robot
Entity: Thorvald
Query hints:
- Thorvald Saga Robotics 2025 2026 deployment
- Thorvald specs pricing
- Thorvald limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Thorvald" by Saga Robotics on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: saga-robotics
- entityName: Thorvald
- manufacturer: Saga Robotics
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 33. robot-swarmfarm (high)
Type: robot
Entity: SwarmBot
Query hints:
- SwarmBot SwarmFarm Robotics 2025 2026 deployment
- SwarmBot specs pricing
- SwarmBot limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "SwarmBot" by SwarmFarm Robotics on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: swarmfarm
- entityName: SwarmBot
- manufacturer: SwarmFarm Robotics
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 34. robot-dexterity-truck (high)
Type: robot
Entity: Dexterity Mech
Query hints:
- Dexterity Mech Dexterity 2025 2026 deployment
- Dexterity Mech specs pricing
- Dexterity Mech limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Dexterity Mech" by Dexterity on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: dexterity-truck
- entityName: Dexterity Mech
- manufacturer: Dexterity
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 35. robot-jungheinrich-eac (high)
Type: robot
Entity: EAC 212a
Query hints:
- EAC 212a Jungheinrich 2025 2026 deployment
- EAC 212a specs pricing
- EAC 212a limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "EAC 212a" by Jungheinrich on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: jungheinrich-eac
- entityName: EAC 212a
- manufacturer: Jungheinrich
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

### 36. robot-quasi-c2 (high)
Type: robot
Entity: Model C2 PartPorter
Query hints:
- Model C2 PartPorter Quasi Robotics 2025 2026 deployment
- Model C2 PartPorter specs pricing
- Model C2 PartPorter limitations issues
Prompt:
```text
You are a robotics research agent.

Objective:
Research updates for robot "Model C2 PartPorter" by Quasi Robotics on 2026-03-25. Focus on deployments, specs, pricing, capabilities, and limitations.

Entity Context:
- entityType: robot
- entityId: quasi-c2
- entityName: Model C2 PartPorter
- manufacturer: Quasi Robotics
- mode: strict_update

Instructions:
1. Use web/search/browser tools available to you.
2. Prioritize primary sources (company release, official docs, regulatory filings) and reputable reporting.
3. Collect publish dates and exact URLs for every claim.
4. Return ONLY JSON (no markdown, no prose outside JSON).
5. Keep confidence from 0.0 to 1.0.
6. Add at least 2 sources for non-trivial updates.
7. Every finding must include `action`.
8. Use `action="update_entity"` for changes to an existing robot.
9. Use `action="add_entity"` for a newly discovered company, capability, trend, or robot candidate and include `proposedEntity`.
10. If no reliable update exists, still return one review-only finding with summary and an empty `proposedChanges` array.
11. Prefer sources dated 2025-01-01 or later unless older source is required for historical comparison.

Mode-specific policy:
- This is a strict production-update task.
- Propose changes only when confidence is >= 0.75.
- Every proposed change must be directly traceable to cited sources.
- Prefer primary sources; use secondary sources only as supporting evidence.
- Do not speculate, infer missing numbers, or generalize from unrelated robots.
- Return action="update_entity" for known robots only.
- If evidence conflicts, keep proposedChanges empty and explain conflict in summary.

Output format:
- JSON array of findings conforming to provided schema.

```

