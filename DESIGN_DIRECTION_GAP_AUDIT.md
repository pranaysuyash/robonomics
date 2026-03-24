# Robonomics Design Direction Gap Audit

Date: 2026-03-24  
Scope: Gap audit against the shared product/design direction (living intelligence system, editorial + exploratory UX, task-centric model, trust-first experience, contribution-ready platform).

## Direction Gaps (From Shared Vision)

| # | Direction Item | Current Status | Evidence |
|---|----------------|----------------|----------|
| 1 | Replace dashboard feel with editorial + exploratory narrative landing | Partial | Home still presents KPI cards + industry list pattern, not a strong narrative/editorial flow: [src/App.tsx:259](/Users/pranay/Projects/robonomics/src/App.tsx:259), [src/App.tsx:277](/Users/pranay/Projects/robonomics/src/App.tsx:277) |
| 2 | Add direct “Featured Systems” exploration entry on homepage | Not implemented | Home has no featured robot/system block: [src/App.tsx:277](/Users/pranay/Projects/robonomics/src/App.tsx:277) |
| 3 | Transparent filters with expectation-setting counts | Not implemented | Static availability labels only, no computed counts: [src/App.tsx:45](/Users/pranay/Projects/robonomics/src/App.tsx:45), [src/App.tsx:169](/Users/pranay/Projects/robonomics/src/App.tsx:169) |
| 4 | Strong wayfinding with persistent escape hatch (Home in header) | Not implemented | Header lacks dedicated home control near search: [src/App.tsx:141](/Users/pranay/Projects/robonomics/src/App.tsx:141) |
| 5 | Consistent back navigation across hierarchy (industry -> profession -> robot) | Partial | Robot has back button, Profession does not: [src/App.tsx:487](/Users/pranay/Projects/robonomics/src/App.tsx:487), [src/App.tsx:321](/Users/pranay/Projects/robonomics/src/App.tsx:321) |
| 6 | Preserve context/history when moving from search results to detail and back | Partial | Filter branch renders before robot detail branch, causing behavior mismatch: [src/App.tsx:196](/Users/pranay/Projects/robonomics/src/App.tsx:196), [src/App.tsx:207](/Users/pranay/Projects/robonomics/src/App.tsx:207) |
| 7 | Replace alert-style submission with polished success state | Not implemented | Submission flow still calls `alert(...)`: [src/App.tsx:913](/Users/pranay/Projects/robonomics/src/App.tsx:913) |
| 8 | Unify submission UX around one path (remove stale parallel component) | Partial / drift | Legacy form still exists with simulated alert flow: [src/components/SubmissionForm.tsx:34](/Users/pranay/Projects/robonomics/src/components/SubmissionForm.tsx:34) |
| 9 | Task-centric system model in UX (`task -> robots -> professions`) as primary exploration axis | Partial | Task breakdown exists only inside profession detail; no global task-first entry/explore path: [src/App.tsx:358](/Users/pranay/Projects/robonomics/src/App.tsx:358), [src/App.tsx:214](/Users/pranay/Projects/robonomics/src/App.tsx:214) |
| 10 | “State of world” narrative layer before deep data | Partial | Intro copy exists but flow quickly reverts to report/grid interaction pattern: [src/App.tsx:250](/Users/pranay/Projects/robonomics/src/App.tsx:250), [src/App.tsx:281](/Users/pranay/Projects/robonomics/src/App.tsx:281) |
| 11 | Trust layer prominence: clear verified vs inferred/speculative framing across views | Partial | Verified labels exist at evidence item level; no global confidence explainer/legend at exploration level: [src/App.tsx:594](/Users/pranay/Projects/robonomics/src/App.tsx:594), [src/App.tsx:656](/Users/pranay/Projects/robonomics/src/App.tsx:656) |
| 12 | “Last 10% blocker” insight emphasis as central product value | Partial | Blockers shown in profession view, but no cross-profession/global blocker intelligence layer: [src/App.tsx:431](/Users/pranay/Projects/robonomics/src/App.tsx:431), [src/App.tsx:220](/Users/pranay/Projects/robonomics/src/App.tsx:220) |
| 13 | Comparative intelligence as decision-first workflow, not modal utility | Partial | Comparison is modal from robot page only; not a first-class multi-entity compare route: [src/App.tsx:509](/Users/pranay/Projects/robonomics/src/App.tsx:509), [src/App.tsx:755](/Users/pranay/Projects/robonomics/src/App.tsx:755) |
| 14 | Contribution model that signals “living document” with validation quality controls | Partial | “Living document” copy exists, but no visible moderation/quality state in UI after submission: [src/App.tsx:889](/Users/pranay/Projects/robonomics/src/App.tsx:889), [src/App.tsx:913](/Users/pranay/Projects/robonomics/src/App.tsx:913) |
| 15 | Distinctive visual identity (non-generic dashboard look) tied to design system tokens and guidance | Partial | Custom palette/typography exists, but no explicit design-system guide or enforceable token docs in repo: [src/App.tsx:62](/Users/pranay/Projects/robonomics/src/App.tsx:62), [README.md](/Users/pranay/Projects/robonomics/README.md) |

## Platform/System Direction Gaps

| # | System Direction Item | Current Status | Evidence |
|---|------------------------|----------------|----------|
| 1 | End-to-end Hermes execution proven in automation path | Partial | Adapter exists but no verified operational result in code path docs/tests: [tools/config/providers.json:10](/Users/pranay/Projects/robonomics/tools/config/providers.json:10), [tools/README.md:74](/Users/pranay/Projects/robonomics/tools/README.md:74) |
| 2 | Scheduler semantics fully aligned with orchestrator flags | Partial | Scheduler uses `--cron` but orchestrator has no dedicated cron branch: [tools/run-research.sh:25](/Users/pranay/Projects/robonomics/tools/run-research.sh:25), [tools/research.js:47](/Users/pranay/Projects/robonomics/tools/research.js:47) |
| 3 | Provider docs and adapter contract consistency | Partial | README provider example args differ from active provider config: [tools/README.md:85](/Users/pranay/Projects/robonomics/tools/README.md:85), [tools/config/providers.json:11](/Users/pranay/Projects/robonomics/tools/config/providers.json:11) |
| 4 | Data completeness quality bar for production-facing intelligence | Partial | Some production-facing robot fields remain placeholders: [src/data/robots.ts:618](/Users/pranay/Projects/robonomics/src/data/robots.ts:618), [src/data/robots.ts:834](/Users/pranay/Projects/robonomics/src/data/robots.ts:834) |

## Notes

- This file intentionally captures direction-level gaps that may not be explicit feature tickets yet.
- Status labels are implementation-facing (`Not implemented` / `Partial`), not design-approval judgments.
