# Robonomics Research System - Improvement Plan

**Date**: 2026-03-24  
**Branch Strategy**: Keep all work on `manual` branch (not staging)  
**Status**: Codex validation complete, ready for implementation  

---

## Validation Summary from Codex

### What's Already Implemented ✅
| Feature | Status | Location |
|---------|--------|----------|
| Research orchestrator engine | Implemented | `tools/research.js` |
| Provider adapter wiring (Hermes + manual) | Implemented | `tools/config/providers.json` |
| Strict validation gate (>= 0.75 confidence) | Implemented | Line 54, 511 |
| Auto-apply gate for simple fields | Implemented | Lines 53, 577, 591 |
| Output artifacts/report pipeline | Implemented | Lines 10, 657 |
| Scheduling wrapper + launch agent file | Implemented | `run-research.sh`, plist |

### What Still Needs Implementation ⚠️
| Feature | Priority | Location to Modify |
|---------|----------|-------------------|
| **Closed-world discovery** | P0 | `research.js` line 75, 156 |
| **No entity-addition workflow** | P0 | `research.js` line 577 |
| **Schema lacks action/proposedEntity flow** | P0 | `schemas/finding.schema.json` |
| **Dynamic topic generation** | P1 | `research.js` line 264 |
| **Dedupe limitation for new entities** | P2 | `research.js` line 545 |
| **Early-discovery threshold mode** | P2 | `research.js` line 220 |
| **Zero findings alert/escalation** | P3 | `research.js` line 124 |

---

## Target Architecture: Provider-Agnostic, Model-Agnostic Discovery

### Core Design Principles

```
┌─────────────────────────────────────────────────────────────┐
│                    RESEARCH ORCHESTRATOR                     │
│                   (tools/research.js)                        │
│  - Task generation from entities/topics                      │
│  - Schema validation enforcement                             │
│  - Confidence gate enforcement                               │
│  - Artifact output management                                │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    PROVIDER ADAPTER LAYER                   │
│              (tools/config/providers.json)                  │
│  - Abstracts execution to ANY CLI agent                     │
│  - Model choice stays INSIDE provider adapter               │
│  - Only enforces INPUT/OUTPUT contract                      │
└───────────┬──────────────┬──────────────┬───────────────────┘
            │              │              │
            ▼              ▼              ▼
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │ Hermes CLI  │  │ OpenClaw    │  │ Local Model │
    │ adapter     │  │ adapter     │  │ wrapper     │
    └─────────────┘  └─────────────┘  └─────────────┘
```

### Key Requirement: No API Hardcoding in Research Engine

**Current State (Partially Aligned)**:
- ✅ Provider execution abstracted through `runCommandProvider()`
- ✅ Output contract is schema-based, not API-based
- ❌ Provider docs read Hermes-specific
- ❌ Schema still closed-world for entity discovery

**Target State**:
- ✅ **No model/API requirement from research engine itself**
- ✅ **Any configured agent CLI can be used**
- ✅ **Model choice stays inside provider adapter**
- ✅ **Research system only enforces contract and confidence rules**

---

## Implementation Plan - Phase 1: Open-World Discovery (P0)

### Change 1.1: Expand Finding Schema to Support Entity Addition

**File**: `tools/schemas/finding.schema.json`

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Research Finding",
  "type": "object",
  "required": ["taskId", "entityType", "action", "summary", "confidence", "sources"],
  "properties": {
    "taskId": { "type": "string" },
    "entityType": { 
      "type": "string", 
      "enum": ["robot", "company", "industry", "trend", "capability"]
    },
    "action": {
      "type": "string",
      "enum": ["update_entity", "add_entity"],
      "description": "Type of action being proposed"
    },
    "entityId": { 
      "type": "string",
      "description": "Required for update_entity, optional for add_entity"
    },
    "summary": { "type": "string" },
    "confidence": { 
      "type": "number", 
      "minimum": 0, 
      "maximum": 1 
    },
    "sources": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["title", "url"],
        "properties": {
          "title": { "type": "string" },
          "url": { "type": "string", "format": "uri" },
          "type": { "type": "string" },
          "verified": { "type": "boolean" }
        }
      }
    },
    "proposedChanges": {
      "type": "array",
      "description": "For update_entity actions - field modifications",
      "items": {
        "type": "object",
        "required": ["field", "newValue"],
        "properties": {
          "field": { "type": "string" },
          "oldValue": { "type": "string" },
          "newValue": { "type": "string" },
          "reason": { "type": "string" }
        }
      }
    },
    "proposedEntity": {
      "type": "object",
      "description": "For add_entity actions - full entity structure",
      "$ref": "#/$defs/RobotEntity"
    }
  },
  "if": { "properties": { "action": { "const": "update_entity" } } },
  "then": { "required": ["entityId"] },
  "if": { "properties": { "action": { "const": "add_entity" } } },
  "then": { "required": ["proposedEntity"], "not": { "required": ["entityId"] } },
  
  "$defs": {
    "RobotEntity": {
      "type": "object",
      "required": ["id", "name", "manufacturer", "availability"],
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "manufacturer": { "type": "string" },
        "pricingModel": { "type": "string" },
        "availability": { 
          "type": "string",
          "enum": ["Available", "Pilot", "Concept", "Retired"]
        },
        "deploymentCount": { "type": "string" },
        "description": { "type": "string" },
        "videoUrl": { "type": "string" },
        "limitations": { "type": "array", "items": { "type": "string" } },
        "specs": { "type": "object" },
        "evidence": { 
          "type": "array",
          "items": {
            "type": "object",
            "required": ["id", "title", "url"],
            "properties": {
              "id": { "type": "string" },
              "title": { "type": "string" },
              "url": { "type": "string" },
              "type": { "type": "string" },
              "verified": { "type": "boolean" }
            }
          }
        },
        "capabilities": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["taskId", "successLevel"],
            "properties": {
              "taskId": { "type": "string" },
              "successLevel": { "type": "string", "enum": ["None", "Partial", "Full", "Superhuman"] },
              "confidenceScore": { "type": "number" }
            }
          }
        }
      }
    }
  }
}
```

---

### Change 1.2: Add Entity Addition Workflow to Research Orchestrator

**File**: `tools/research.js` - ADD NEW FUNCTIONS AFTER LINE 576

```javascript
// === NEW: Entity Addition Workflow ===

function deriveProposedUpdatesAndAdditions(findings) {
  const updates = [];
  const additions = [];
  
  for (const finding of findings) {
    if (finding.action === 'update_entity') {
      // Existing logic - field updates on known entities
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
    } else if (finding.action === 'add_entity') {
      // NEW: Queue new entity for review
      additions.push({
        taskId: finding.taskId,
        entityType: finding.entityType,
        confidence: finding.confidence,
        proposedEntity: finding.proposedEntity,
        summary: finding.summary,
        sources: finding.sources || [],
      });
    }
  }
  
  return { updates, additions };
}

function validateNewEntity(newEntity) {
  // Basic validation for new entity before review queue
  const requiredFields = ['id', 'name', 'manufacturer', 'availability'];
  const missing = requiredFields.filter(f => !newEntity[f]);
  
  if (missing.length > 0) {
    return { valid: false, errors: [`Missing fields: ${missing.join(', ')}`] };
  }
  
  // Check for duplicates by name + manufacturer combination
  const content = readFileSync(DATA_FILE, 'utf-8');
  const duplicatePattern = new RegExp(`name:\\s*'${newEntity.name}'\\s*,\\s*manufacturer:\\s*'${newEntity.manufacturer}'`, 'i');
  
  if (duplicatePattern.test(content)) {
    return { valid: false, errors: ['Duplicate entity detected'] };
  }
  
  return { valid: true };
}

function appendToReviewQueue(additions) {
  const reviewFile = join(OUTPUT_DIR, 'entity-addition-review.json');
  
  let existingQueue = [];
  if (existsSync(reviewFile)) {
    try {
      existingQueue = JSON.parse(readFileSync(reviewFile, 'utf-8')).additions || [];
    } catch {}
  }
  
  const validatedAdditions = additions.map(addition => {
    const validation = validateNewEntity(addition.proposedEntity);
    return { ...addition, validation };
  }).filter(a => a.validation.valid);
  
  // Merge with existing queue (dedupe by entity id)
  const merged = [...existingQueue];
  for (const addition of validatedAdditions) {
    const exists = merged.find(m => m.proposedEntity.id === addition.proposedEntity.id);
    if (!exists) {
      merged.push(addition);
    }
  }
  
  writeJson(reviewFile, { generatedAt: new Date().toISOString(), additions: merged });
  return validatedAdditions;
}

function applyEntityAdditions() {
  const reviewFile = join(OUTPUT_DIR, 'entity-addition-review.json');
  if (!existsSync(reviewFile)) return { attempted: 0, applied: 0 };
  
  try {
    const data = JSON.parse(readFileSync(reviewFile, 'utf-8'));
    let applied = 0;
    
    for (const addition of data.additions) {
      // Skip if validation failed
      if (!addition.validation.valid) continue;
      
      // Check confidence threshold for auto-apply
      if (addition.confidence < MIN_APPLY_CONFIDENCE) {
        log(`Skipping ${addition.proposedEntity.name} - confidence ${addition.confidence} below threshold`);
        continue;
      }
      
      // Append to robots.ts
      const content = readFileSync(DATA_FILE, 'utf-8');
      const newEntityJson = JSON.stringify(addition.proposedEntity, null, 2);
      
      // Insert before closing bracket of robots array
      const updatedContent = content.replace(/\]\s*;\s*$/, `\n${newEntityJson}\n  ]\n;`);
      
      if (updatedContent !== content) {
        writeFileSync(DATA_FILE, updatedContent);
        applied++;
      }
    }
    
    // Clear review queue after successful apply
    if (applied > 0) {
      writeJson(reviewFile, { generatedAt: new Date().toISOString(), additions: [] });
    }
    
    return { attempted: data.additions.length, applied };
  } catch (error) {
    log(`Error applying entity additions: ${error.message}`);
    return { attempted: 0, applied: 0 };
  }
}

// === Update main() function to use new workflow ===

async function main() {
  // ... existing setup code ...
  
  const execution = await runProviders({ providerPlan, tasks, findingSchema });
  const validated = validateFindings(execution.findings, findingSchema, tasks);
  const deduped = dedupeFindings(validated.accepted);
  const { updates, additions } = deriveProposedUpdatesAndAdditions(deduped);
  
  writeJson(PROPOSED_UPDATES_FILE, {
    generatedAt: new Date().toISOString(),
    simpleFieldUpdates: updates,
    entityAdditions: additions.map(a => ({
      id: a.proposedEntity.id,
      name: a.proposedEntity.name,
      manufacturer: a.proposedEntity.manufacturer,
      confidence: a.confidence
    }))
  });
  
  // Apply both field updates AND new entities
  const appliedUpdates = applySimpleUpdatesToRobotsFile(updates);
  const appliedAdditions = appendToReviewQueue(additions);
  
  writeReport({
    robots,
    tasks,
    providerPlan,
    providerResults: execution.providerResults,
    acceptedCount: deduped.length,
    rejectedCount: validated.rejected.length,
    appliedUpdates,
    appliedAdditions,
    isDryRun,
  });
  
  // ... rest of main() ...
}
```

---

### Change 1.3: Add Early-Discovery Task Mode

**File**: `tools/research.js` - ADD TO modePolicies OBJECT (after line 236)

```javascript
const modePolicies = {
  strict_update: [
    '- This is a strict production-update task.',
    '- Propose changes only when confidence is >= 0.75.',
    // ... existing policy text ...
  ],
  broad_scan: [
    '- This is a broad discovery-scan task.',
    '- Maximize coverage of new entities/signals, even with moderate confidence.',
    // ... existing policy text ...
  ],
  early_discovery: [
    '- This is an early-discovery scan for emerging signals.',
    '- Flag potential new entities with confidence >= 0.5 (lower than strict mode).',
    '- Mark findings as action="add_entity" for human review.',
    '- Don\'t auto-apply, but don\'t reject moderate-confidence discoveries.',
    '- Include early signals: pilots, announcements, funding, notable demos.',
    '- Keep speculative findings with clear caveats and lower confidence scores.'
  ]
};

// Update task building to include early_discovery mode for discovery topics
function buildTasks({ robots, targetsConfig, taskPromptTemplate }) {
  const tasks = [];
  
  // ... existing robot tasks (strict_update) ...
  
  for (const topic of targetsConfig.discoveryTopics || []) {
    const taskMode = topic.priority === 'high' ? 'broad_scan' : 'early_discovery';
    
    tasks.push({
      id: `topic-${slug(topic.name)}`,
      type: 'discovery',
      priority: topic.priority,
      mode: taskMode,  // ← Uses early_discovery for medium/low priority topics
      entity: { id: slug(topic.name), name: topic.name },
      queryHints: topic.queryHints || [],
      prompt: renderPrompt(taskPromptTemplate, {
        objective: topic.objective,
        entityType: topic.type,
        entityName: topic.name,
        entityId: slug(topic.name),
        manufacturer: '',
        mode: taskMode,
        modePolicy: modePolicies[taskMode],  // ← Uses correct policy
      }),
    });
  }
  
  return tasks;
}

// Update validation to accept early_discovery with lower threshold
function validateFindings(findings, findingSchema, tasks = []) {
  const accepted = [];
  const rejected = [];
  const taskModeById = new Map(tasks.map((t) => [task.id, t.mode]));
  
  for (const finding of findings) {
    const errors = [];
    
    // ... existing validation logic ...
    
    const taskMode = taskModeById.get(finding.taskId);
    if (taskMode === 'strict_update' && finding.confidence < MIN_STRICT_UPDATE_CONFIDENCE) {
      errors.push(`strict_update findings require confidence >= ${MIN_STRICT_UPDATE_CONFIDENCE}`);
    } else if (taskMode === 'early_discovery' && finding.confidence < 0.5) {
      // Allow early discovery with lower threshold
      errors.push(`early_discovery findings require confidence >= 0.5`);
    }
    
    // ... rest of validation ...
  }
  
  return { accepted, rejected };
}
```

---

### Change 1.4: Zero Findings Alert System

**File**: `tools/research.js` - ADD TO writeReport FUNCTION (after line 670)

```javascript
function writeReport({
  robots,
  tasks,
  providerPlan,
  providerResults,
  acceptedCount,
  rejectedCount,
  appliedUpdates,
  appliedAdditions,
  isDryRun,
}) {
  const lines = [];
  
  // ... existing report generation ...
  
  if (acceptedCount === 0 && rejectedCount === 0) {
    lines.push('');
    lines.push('**⚠️ ZERO FINDINGS ALERT**: No discoveries or updates found this cycle.');
    lines.push('Consider:');
    lines.push('- Checking provider execution logs for errors');
    lines.push('- Expanding discovery topics if signal density is low');
    lines.push('- Verifying AI agent connectivity and API access');
  }
  
  // ... rest of report generation ...
}
```

---

## Implementation Order & Testing Strategy

### Phase 1: Core Discovery Infrastructure (P0)
**Files to modify**: `tools/schemas/finding.schema.json`, `tools/research.js`

1. **Schema expansion first** - Test JSON validity with `node --check tools/schemas/finding.schema.json`
2. **Add entity workflow functions** - Add new functions after line 576, test in isolation
3. **Update main() orchestration** - Integrate new derivation logic
4. **Test with sample data** - Create mock findings with `action: add_entity`, verify queue creation

### Phase 2: Discovery Modes (P1-P2)
**Files to modify**: `tools/research.js` task building and validation logic

5. **Add early_discovery mode policy** - Update modePolicies object
6. **Update task generation** - Route discovery topics to appropriate modes
7. **Adjust confidence thresholds** - 0.5 for early, 0.75 for strict
8. **Test with simulated findings** - Verify different modes produce expected validation results

### Phase 3: Alerting & UX (P3)
9. **Add zero-findings alert** - Update writeReport function
10. **Document provider-agnostic design** - Update README.md and provider docs

---

## Testing Checklist for Codex Validation

| Test | Expected Result | Files to Verify |
|------|-----------------|-----------------|
| Schema accepts `action: add_entity` with valid entity data | ✅ JSON parse succeeds | `finding.schema.json` |
| Schema rejects update without entityId or add without proposedEntity | ✅ Validation error | `finding.schema.json` |
| New entity workflow creates review queue file | ✅ `/tools/output/entity-addition-review.json` created | `research.js` |
| Duplicate detection prevents same entity twice | ✅ Skips with log message | `validateNewEntity()` function |
| Early discovery mode accepts 0.6 confidence findings | ✅ Accepted, not rejected | validation logic |
| Zero findings triggers alert in report | ✅ Warning message appears | writeReport function |

---

## Provider Agnostic Design Verification

### Current State (Before Implementation)
```json
{
  "providers": [
    {
      "id": "hermes",
      "command": "hermes",
      "args": ["chat", "-Q", "--provider", "openai-codex", ...]
    }
  ]
}
```

### Target State (After Implementation)
```json
{
  "providers": [
    {
      "id": "hermes-openai",
      "type": "command",
      "command": "hermes",
      "args": ["chat", "-Q", "--provider", "openai-codex", ...],
      "description": "Hermes CLI with OpenAI provider"
    },
    {
      "id": "hermes-local-llama3",
      "type": "command",
      "command": "hermes",
      "args": ["chat", "-Q", "--provider", "local-llama3"],
      "description": "Hermes CLI with local Llama 3 model"
    },
    {
      "id": "openclaw-v1",
      "type": "command",
      "command": "openclaw",
      "args": ["research", "--mode", "strict"],
      "description": "OpenClaw agent CLI for research tasks"
    },
    {
      "id": "local-model-wrapper",
      "type": "command",
      "command": "./models/local-research.sh",
      "args": ["--provider", "llama3-70b"],
      "description": "Local model wrapper for offline research"
    }
  ]
}
```

**Key Point**: The research engine (`research.js`) never knows or cares which provider is used. It only:
1. Generates task packets with clear objectives and schemas
2. Executes configured providers as shell commands
3. Validates JSON output against schema
4. Processes accepted findings regardless of source

---

## Next Steps

### Immediate Actions (Before Implementation)
1. ✅ **Review this plan** - Ensure proposed changes align with requirements
2. ⏳ **Codex validation** - Confirm schema design and workflow approach
3. ⏳ **Test environment setup** - Verify can run tests on `manual` branch

### After Validation
4. 🔄 **Implement Phase 1 fixes** (schema + entity workflow)
5. 🔄 **Run integration test** with sample new robot discovery scenario
6. 🔄 **Document provider-agnostic design** in README and docs

---

*Plan prepared for implementation - ready for Codex validation review - 2026-03-24*
