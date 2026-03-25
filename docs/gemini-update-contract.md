# Gemini Update Contract

Use this when asking Gemini to update the catalog.

## Goal

Gemini should understand two things:

1. `robots.ts` is still the compatibility/output surface for existing consumers.
2. The writable source-of-truth is now split across multiple files.

## Files To Share With Gemini

Minimum set:

- [`/Users/pranay/Projects/robonomics/src/data/robots.ts`](/Users/pranay/Projects/robonomics/src/data/robots.ts)
- [`/Users/pranay/Projects/robonomics/src/data/industries.ts`](/Users/pranay/Projects/robonomics/src/data/industries.ts)
- [`/Users/pranay/Projects/robonomics/src/data/professions.ts`](/Users/pranay/Projects/robonomics/src/data/professions.ts)
- [`/Users/pranay/Projects/robonomics/src/data/references.ts`](/Users/pranay/Projects/robonomics/src/data/references.ts)
- [`/Users/pranay/Projects/robonomics/src/types.ts`](/Users/pranay/Projects/robonomics/src/types.ts)
- [`/Users/pranay/Projects/robonomics/tools/research.js`](/Users/pranay/Projects/robonomics/tools/research.js)
- [`/Users/pranay/Projects/robonomics/docs/catalog-structure.md`](/Users/pranay/Projects/robonomics/docs/catalog-structure.md)

If Gemini also needs to understand how the app consumes the data, include:

- [`/Users/pranay/Projects/robonomics/src/App.tsx`](/Users/pranay/Projects/robonomics/src/App.tsx)

## Editing Rules For Gemini

Tell Gemini to follow these rules:

### 1. Do not treat `robots.ts` as the only writable file

Instead:

- robot record updates and new robots go to `src/data/robots.ts`
- new industries go to `src/data/industries.ts`
- structured profession/use-case catalog changes go to `src/data/professions.ts`
- discovery-only references go to `src/data/references.ts`

### 2. Preserve compatibility

Do not remove these re-exports from `src/data/robots.ts`:

- `industries`
- `professions`
- `researchReferences`

### 3. Use `references.ts` for prompt guidance, not as a replacement for core app data

Use `references.ts` for:

- discovered companies
- discovered use cases that are not yet promoted into `professions.ts`
- capabilities
- trends

Do not move core UI catalog data out of the structured modules just to simplify research.

### 4. If a new use case becomes canonical app data

Then Gemini should:

- add it to `src/data/professions.ts`
- keep or remove the duplicate lightweight reference in `references.ts` based on whether it still helps discovery

### 5. Keep dates updated

When modifying generated catalog files, update:

- `// Last Research Update: YYYY-MM-DD`

## Recommended Prompt To Gemini

Use this prompt:

```md
Update the Robonomics catalog using the current split data structure.

Important:
- `src/data/robots.ts` is still the public compatibility surface and must keep re-exporting `industries`, `professions`, and `researchReferences`.
- Do not assume everything belongs in `robots.ts`.
- Write updates to the correct source modules:
  - robots -> `src/data/robots.ts`
  - industries -> `src/data/industries.ts`
  - professions/use-case catalog -> `src/data/professions.ts`
  - discovery-only references -> `src/data/references.ts`

Use `docs/catalog-structure.md` as the contract.
If you add new canonical app-facing use cases, prefer `professions.ts`.
If you only discover references useful for future research, use `references.ts`.
Do not break existing imports that rely on `src/data/robots.ts`.
```

## Short Version

If you only want to send one sentence to Gemini:

> `src/data/robots.ts` is the compatibility surface, but the writable catalog is split across `robots.ts`, `industries.ts`, `professions.ts`, and `references.ts`; keep `robots.ts` re-exports intact and write each update to the correct source module.
