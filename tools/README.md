# Robonomics Research Tools

Agentic, harness-agnostic research pipeline for keeping robot data current.

## Goals

- Avoid lock-in to a single LLM/search API.
- Support command-driven harnesses (Codex CLI, Claude Code, Qwen, Hermes Agent, OpenClaw, or any compatible command runner), plus manual execution.
- Validate all findings against a strict JSON schema.
- Produce auditable outputs before any data file updates.
- Let high-confidence additions land directly in the catalog while still emitting an audit artifact.

## Daily Job Setup

### macOS Launch Agent

```bash
cp tools/com.robonomics.research.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.robonomics.research.plist
```

### Cron

```bash
# crontab -e
0 6 * * * /Users/pranay/Projects/robonomics/tools/run-research.sh
```

Runs daily at 6:00 AM.

## Usage

### Default Run

```bash
node tools/research.js
```

Default behavior applies approved robot updates and high-confidence additions directly to the generated catalog modules under `/Users/pranay/Projects/robonomics/src/data/`.

### Force Manual Packet Mode

```bash
node tools/research.js --manual
```

### Use a Specific Provider

```bash
node tools/research.js --provider your-harness
```

### Apply Approved Updates to the Catalog

```bash
node tools/research.js --provider your-harness --apply
```

Apply is already enabled by default. To disable writes:

```bash
node tools/research.js --no-apply
```

### Print Prompt + Schema Contract

```bash
node tools/research.js --prompts
```

## Provider Configuration

Edit `tools/config/providers.json`.

- `type: "command"`: run an external agent or harness CLI and parse JSON output.
- `type: "manual"`: produce task packets for a human/agent run outside the script.

Command providers must accept a JSON payload via either `{{PAYLOAD}}` interpolation in the command args or stdin, and must return JSON findings on stdout only.

Example command provider shape:

```json
{
  "id": "codex",
  "type": "command",
  "enabled": true,
  "command": "your-harness",
  "args": ["run", "{{PAYLOAD}}"],
  "inputMode": "none",
  "timeoutMs": 300000
}
```

## Open Research Configuration

`tools/config/research-targets.json` is optional supplemental input. The runner now also derives discovery scans from the current catalog modules in `src/data/`, including industries, professions/use cases, and tracked companies/manufacturers.

## Output Artifacts

- `tools/output/research-queue.json` - task queue + provider plan
- `tools/output/research-tasks.md` - human/agent task packet
- `tools/output/topic-expansions.json` - validated discovery-topic expansions
- `tools/output/new-findings.json` - validated + rejected findings
- `tools/output/proposed-updates.json` - extracted field-level update proposals
- `tools/output/entity-addition-review.json` - audit log for entity additions
- `tools/output/research-report.md` - run summary

## Research Workflow

1. Scheduler runs `tools/run-research.sh`.
2. `tools/research.js` generates queue + task packet.
3. Providers may first suggest additional discovery topics.
4. The runner also creates broad scans from current industries, use cases, and company references already in the catalog.
5. A harness executes tasks and returns findings as JSON.
6. Findings are validated, deduplicated, and split into field updates plus additions.
7. By default, eligible updates and additions are applied directly to `src/data/robots.ts`, `src/data/industries.ts`, and `src/data/references.ts`.

## Key Files

- `tools/research.js` - orchestrator
- `tools/config/providers.json` - provider adapters
- `tools/config/research-targets.json` - open discovery config
- `tools/prompts/task.md` - task prompt template
- `tools/schemas/finding.schema.json` - output contract
- `tools/run-research.sh` - scheduler wrapper
- `tools/com.robonomics.research.plist` - macOS launch agent config
