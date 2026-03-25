# Robonomics Research Tools

Agentic, provider-agnostic research pipeline for keeping robot data current.

## Goals

- Avoid lock-in to a single LLM/search API.
- Support command-driven agents (e.g. Hermes), plus manual execution.
- Validate all findings against a strict JSON schema.
- Produce auditable outputs before any data file updates.

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

Default behavior applies eligible updates directly to `src/data/robots.ts` after each scan.

### Force Manual Packet Mode

```bash
node tools/research.js --manual
```

### Use a Specific Provider

```bash
node tools/research.js --provider hermes
```

### Apply Simple Approved Updates to `robots.ts`

```bash
node tools/research.js --provider hermes --apply
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

- `type: "command"`: run an external agent CLI and parse JSON output.
- `type: "manual"`: produce task packets for a human/agent run outside the script.

Example command provider shape:

```json
{
  "id": "hermes",
  "type": "command",
  "enabled": true,
  "command": "hermes",
  "args": ["run", "--json"],
  "inputMode": "stdin",
  "timeoutMs": 300000
}
```

## Open Research Configuration

Edit `tools/config/research-targets.json` to add:

- new discovery topics
- new query hints
- changed priorities

No code change is required for these additions.

## Output Artifacts

- `tools/output/research-queue.json` - task queue + provider plan
- `tools/output/research-tasks.md` - human/agent task packet
- `tools/output/new-findings.json` - validated + rejected findings
- `tools/output/proposed-updates.json` - extracted field-level update proposals
- `tools/output/research-report.md` - run summary

## Research Workflow

1. Scheduler runs `tools/run-research.sh`.
2. `tools/research.js` generates queue + task packet.
3. Provider executes tasks (Hermes/manual).
4. Findings are schema-validated and deduplicated.
5. Proposed updates are generated.
6. By default, eligible simple robot updates are applied to `src/data/robots.ts`.

## Key Files

- `tools/research.js` - orchestrator
- `tools/config/providers.json` - provider adapters
- `tools/config/research-targets.json` - open discovery config
- `tools/prompts/task.md` - task prompt template
- `tools/schemas/finding.schema.json` - output contract
- `tools/run-research.sh` - scheduler wrapper
- `tools/com.robonomics.research.plist` - macOS launch agent config
