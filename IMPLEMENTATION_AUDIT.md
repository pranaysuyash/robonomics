# Robonomics Implementation Audit

Date: 2026-03-24  
Scope: Current repository state (UI flows, research pipeline integration, and data completeness signals).

## Non-Implemented / Partial Work

| # | Item | Status | Evidence |
|---|------|--------|----------|
| 1 | Transparent status filter counts (for example `Available (11)`) | Not implemented | [src/App.tsx:45](/Users/pranay/Projects/robonomics/src/App.tsx:45), [src/App.tsx:169](/Users/pranay/Projects/robonomics/src/App.tsx:169) |
| 2 | Dedicated Home button beside search in top header | Not implemented | [src/App.tsx:141](/Users/pranay/Projects/robonomics/src/App.tsx:141) |
| 3 | Profession view back button | Not implemented | [src/App.tsx:321](/Users/pranay/Projects/robonomics/src/App.tsx:321) |
| 4 | Navigation preservation for `search -> robot -> back` | Partial / mismatch | View branching still prioritizes filtering state before robot detail: [src/App.tsx:196](/Users/pranay/Projects/robonomics/src/App.tsx:196), [src/App.tsx:207](/Users/pranay/Projects/robonomics/src/App.tsx:207) |
| 5 | Homepage `Featured Systems` section | Not implemented | Home currently contains stats + Industry Intelligence Reports only: [src/App.tsx:277](/Users/pranay/Projects/robonomics/src/App.tsx:277) |
| 6 | Submission success state replacing `alert()` | Not implemented | [src/App.tsx:913](/Users/pranay/Projects/robonomics/src/App.tsx:913) |
| 7 | Legacy submission component still uses simulated alert flow | Not implemented / stale path | [src/components/SubmissionForm.tsx:34](/Users/pranay/Projects/robonomics/src/components/SubmissionForm.tsx:34) |
| 8 | Scheduler `--cron` behavior is wired but no cron-specific logic exists in orchestrator | Partial / integration drift | Scheduler call: [tools/run-research.sh:25](/Users/pranay/Projects/robonomics/tools/run-research.sh:25). Arg parsing only handles `--manual`, `--dry-run`, `--no-apply`, `--prompts`: [tools/research.js:50](/Users/pranay/Projects/robonomics/tools/research.js:50), [tools/research.js:51](/Users/pranay/Projects/robonomics/tools/research.js:51), [tools/research.js:52](/Users/pranay/Projects/robonomics/tools/research.js:52), [tools/research.js:65](/Users/pranay/Projects/robonomics/tools/research.js:65) |
| 9 | Provider docs example is stale vs current Hermes adapter args | Not implemented / documentation drift | Example docs: [tools/README.md:85](/Users/pranay/Projects/robonomics/tools/README.md:85), [tools/README.md:86](/Users/pranay/Projects/robonomics/tools/README.md:86), [tools/README.md:87](/Users/pranay/Projects/robonomics/tools/README.md:87). Actual config: [tools/config/providers.json:10](/Users/pranay/Projects/robonomics/tools/config/providers.json:10), [tools/config/providers.json:11](/Users/pranay/Projects/robonomics/tools/config/providers.json:11) |
| 10 | Some robot pricing fields remain `TBD` placeholders | Not implemented / data completeness gap | [src/data/robots.ts:618](/Users/pranay/Projects/robonomics/src/data/robots.ts:618), [src/data/robots.ts:834](/Users/pranay/Projects/robonomics/src/data/robots.ts:834) |

## Explicitly Implemented (for contrast)

| Item | Status | Evidence |
|------|--------|----------|
| Robot detail back button | Implemented | [src/App.tsx:487](/Users/pranay/Projects/robonomics/src/App.tsx:487) |
| Strict confidence gate for `strict_update` findings (`>= 0.75`) | Implemented | [tools/research.js:54](/Users/pranay/Projects/robonomics/tools/research.js:54), [tools/research.js:511](/Users/pranay/Projects/robonomics/tools/research.js:511) |
| Apply gate for updates (`>= 0.75`) | Implemented | [tools/research.js:53](/Users/pranay/Projects/robonomics/tools/research.js:53), [tools/research.js:591](/Users/pranay/Projects/robonomics/tools/research.js:591) |

## Notes

- This document tracks only currently observable implementation gaps in code/config/docs.
- It does not include subjective design direction requests unless there is concrete missing code for them.
