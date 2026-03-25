# Robonomics Research System - Critical Flaws Analysis

**Date**: 2026-03-24  
**Branch**: manual (upgraded research setup)  
**Status**: Pre-implementation review for Codex validation

---

## Executive Summary

The current automated research system has a **fundamental design limitation**: it operates as a closed-world discovery engine that can only track entities explicitly pre-defined in configuration files. This prevents the system from discovering new robots, companies, industries, or trends that haven't been manually added to the dataset beforehand.

---

## Current Architecture Overview

### What Works Well
- ✅ **Structured data pipeline**: `research.js` orchestrates tasks, validates findings, proposes updates
- ✅ **Schema validation**: Strict output contract ensures quality and traceability
- ✅ **Field update automation**: Auto-applies confident changes to existing entities (75%+ confidence)
- ✅ **Daily scheduling**: Cron setup ready for 6 AM execution
- ✅ **Evidence tracking**: All findings require source URLs with verification

### What's Hardcoded/Predefined
```javascript
// research.js line 75: Only extracts what already exists
const robots = extractRobotsFromFile(); // ← Must be in robots.ts

// tools/config/research-targets.json - only 3 fixed topics
"discoveryTopics": [
  { "name": "New commercial robot deployments", ... },
  { "name": "Cross-industry capability trends", ... },
  { "name": "Pricing and business model changes", ... }
]
```

---

## Critical Flaws Identified

### 1. **Closed-World Discovery** (Severity: CRITICAL)

**Problem**: System can only research entities that already exist in `robots.ts`

**Current Code**:
```javascript
function extractRobotsFromFile() {
  const content = readFileSync(DATA_FILE, 'utf-8');
  // ...parses ONLY what's already in robots.ts
}
```

**Impact**: 
- New robot announcements are **missed entirely** unless manually added first
- System cannot discover breakthrough innovations from new entrants
- Research scope is bounded by human awareness of entities to track

**Example Failure Case**:
> Tesla announces Optimus v3 with major improvements. Since it's already in the database, updates work. But if a completely unknown startup launches "RoboChef 2000" for restaurant automation, **it will never be discovered**.

---

### 2. **Pre-Defined Discovery Topics** (Severity: MAJOR)

**Problem**: Only 3 fixed research topics can be monitored; no mechanism to follow emerging signals

**Current Code**:
```json
// tools/config/research-targets.json
"discoveryTopics": [
  { "name": "New commercial robot deployments", ... },
  { "name": "Cross-industry capability trends", ... },
  { "name": "Pricing and business model changes", ... }
]
```

**Impact**:
- Entirely new industries (e.g., "robotic pet care") cannot be tracked automatically
- Company pivots to robotics go unnoticed unless pre-configured
- No adaptive discovery based on market signals or news trends

---

### 3. **No Entity Addition Workflow** (Severity: CRITICAL)

**Problem**: System can only update existing entities; no path to add new ones

**Current Code**:
```javascript
function applySimpleUpdatesToRobotsFile(updates) {
  const allowedFields = new Set(['deploymentCount', 'pricingModel', 'availability', 'description']);
  // Only handles field updates on known robots.ts entries
}
```

**Impact**:
- Even if AI confidently identifies a new robot, there's **no code path to add it**
- System would reject or discard findings proposing entity additions
- Requires manual intervention for every discovery, defeating automation purpose

---

### 4. **Schema Doesn't Support Additions** (Severity: CRITICAL)

**Problem**: Finding schema assumes entity already exists; no pattern for new entities

**Current Schema Assumption**:
```json
{
  "taskId": "robot-flippy-2", // ← References known robot
  "entityId": "flippy-2",     // ← Must exist in robots.ts
  "proposedChanges": [
    { "field": "deploymentCount", "newValue": "100 units" }
  ]
}
```

**Missing Pattern**:
```json
{
  "taskId": "discovery-new-robot",
  "entityType": "robot",      // ← New type support needed
  "action": "add_entity",     // ← No such action exists
  "proposedEntity": {         // ← Full entity structure missing
    "id": "robochef-2000",
    "name": "RoboChef 2000",
    "manufacturer": "KitchenAI",
    ...
  }
}
```

---

### 5. **Deduplication Breaks New Entity Discovery** (Severity: MEDIUM)

**Problem**: Same new robot mentioned multiple times gets deduplicated out before review

**Current Code**:
```javascript
function dedupeFindings(findings) {
  const seen = new Set();
  for (const finding of findings) {
    const key = `${finding.taskId}::${finding.entityId}::${finding.summary}`;
    if (seen.has(key)) continue; // ← Skips duplicates entirely
    seen.add(key);
    out.push(finding);
  }
}
```

**Impact**: Multiple sources reporting same new robot → only one finding survives, potentially losing important context or confidence signals.

---

### 6. **Confidence Threshold Too High for Early Discovery** (Severity: MEDIUM)

**Problem**: Early signals about new entities often have moderate confidence (<75%) and get rejected

**Current Code**:
```javascript
const MIN_STRICT_UPDATE_CONFIDENCE = 0.75;
if (taskMode === 'strict_update' && finding.confidence < MIN_STRICT_UPDATE_CONFIDENCE) {
  errors.push(`strict_update findings require confidence >= ${MIN_STRICT_UPDATE_CONFIDENCE}`);
}
```

**Impact**: 
- Early market signals, press releases, or pilot announcements rejected
- Missed opportunities to track emerging trends before they mature
- No "early warning" category for moderate-confidence discoveries

---

### 7. **No Fallback Alert When Nothing Found** (Severity: LOW)

**Problem**: System logs execution but doesn't alert when AI finds nothing new

**Current Behavior**: 
- Logs "accepted=0 rejected=0 applied=0"
- No notification if entire day yields no discoveries
- Easy to miss in log files during busy periods

---

## Required Fixes for Open-Ended Discovery

### Fix 1: Expand Schema to Support Entity Addition

```json
// tools/schemas/finding.schema.json - NEW STRUCTURE
{
  "type": "object",
  "properties": {
    "action": {
      "enum": ["update_entity", "add_entity"],
      "description": "Type of action being proposed"
    },
    "entityId": { "type": "string" }, // Required for update, optional for add
    "proposedChanges": [ ... ],        // For updates
    "proposedEntity": {                // NEW: Full entity structure for additions
      "$ref": "#/$defs/RobotEntity"
    }
  },
  "required": ["action", "entityType"]
}
```

### Fix 2: Create Entity Addition Workflow

```javascript
// research.js - NEW FUNCTION
function applyEntityAddition(findings) {
  const newEntities = findings.filter(f => f.action === 'add_entity');
  
  for (const finding of newEntities) {
    // 1. Validate proposed entity against schema
    if (!validateEntitySchema(finding.proposedEntity)) continue;
    
    // 2. Check for duplicates (by name/manufacturer combination)
    if (entityExists(finding.proposedEntity.name, finding.proposedEntity.manufacturer)) {
      log(`Skipping duplicate: ${finding.proposedEntity.name}`);
      continue;
    }
    
    // 3. Append to robots.ts array after review approval
    appendEntityToFallbackQueue(finding);
  }
}
```

### Fix 3: Dynamic Discovery Topic Generation

```javascript
// research.js - NEW LOGIC
async function generateDynamicDiscoveryTopics() {
  // Analyze recent news signals for emerging topics
  const signalAnalysis = await analyzeNewsSignals();
  
  return [
    ...predefinedTopics,
    ...signalAnalysis.emergingTrends.map(t => ({
      name: t.topic,
      priority: 'medium',
      objective: `Track ${t.topic} developments`,
      queryHints: t.queryTemplates
    }))
  ];
}
```

### Fix 4: Lower Confidence Threshold for Early Signals

```javascript
// research.js - NEW CONSTANTS
const EARLY_SIGNAL_CONFIDENCE_THRESHOLD = 0.5; // Instead of 0.75
const MIN_STRICT_UPDATE_CONFIDENCE = 0.75;     // Keep existing

// Add new task mode: 'early_discovery'
modePolicies.early_discovery = [
  '- Flag early signals with moderate confidence (>= 0.5)',
  '- Mark as "potential_discovery" for human review',
  '- Don\'t auto-apply, but don\'t reject either'
];
```

---

## Proposed Workflow Changes

### Current Flow (Closed-World)
1. Extract robots from `robots.ts`
2. Generate tasks for each known robot
3. Research only updates to existing entities
4. Apply confident changes automatically
5. ❌ **No path for new entity discovery**

### New Flow (Open-World Discovery)
1. Extract known robots + generate dynamic topics
2. Generate tasks for:
   - Known robots (update mode, 75%+ confidence threshold)
   - Predefined discovery topics (broad scan mode)
   - **Dynamic emerging signals** (early discovery mode, 50%+ confidence)
3. Research can propose:
   - Field updates to existing entities (auto-apply if confident)
   - **New entity additions** (queue for review)
4. Human reviews new entity queue → approves/rejects
5. Approved entities appended to `robots.ts` automatically

---

## Implementation Priority Matrix

| Fix | Complexity | Impact | Priority |
|-----|------------|--------|----------|
| Schema expansion | Low | Critical | **P0** |
| Entity addition workflow | Medium | Critical | **P0** |
| Dynamic discovery topics | High | Major | P1 |
| Lower confidence threshold | Low | Medium | P2 |
| Deduplication improvement | Low | Medium | P3 |
| Fallback alert system | Low | Low | P4 |

---

## Next Steps for Codex Validation

### Questions to Validate:
1. **Schema Design**: Is the proposed `action` + `proposedEntity` pattern appropriate?
2. **Workflow Safety**: Should new entities require human approval before insertion?
3. **Duplicate Detection**: What matching criteria for "same entity" (name only vs name+manufacturer)?
4. **Confidence Thresholds**: Are 50%/75% thresholds reasonable for early/strict modes?
5. **Dynamic Topics**: How to generate meaningful discovery topics without manual configuration?

### Recommended Validation Approach:
1. Review schema changes with Codex for type safety
2. Test entity addition workflow with sample new robot data
3. Simulate early signal discovery (moderate confidence findings)
4. Verify deduplication doesn't discard valid discoveries
5. Confirm human approval gate prevents accidental additions

---

## Risk Assessment if Unfixed

| Scenario | Current Behavior | Business Impact |
|----------|-----------------|-----------------|
| Breakthrough robot launch | ❌ Missed entirely | Competitor advantage lost, market intelligence gap |
| New industry emergence | ❌ Not tracked | Strategic blind spot in emerging markets |
| Company pivot announcement | ❌ Ignored unless pre-configured | M&A opportunities missed |
| Early signal detection | ❌ Rejected as low confidence | Missing trend before competitors |

---

## Conclusion

The current system is **excellent for maintaining known entity data** but **fundamentally incapable of discovery**. For a production-grade research tool that truly "discovers anything," the schema and workflow must support open-ended entity addition with appropriate human review gates.

**Recommendation**: Implement P0 fixes (schema + workflow) before next sprint cycle to enable true discovery capabilities.

---

*Document prepared for Codex validation review - 2026-03-24*
