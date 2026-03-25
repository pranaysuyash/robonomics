# Catalog Structure

**Status**: current as of 2026-03-25

This repo now has a split catalog source layout with a compatibility surface.

## Public Compatibility Surface

This is the file external consumers can keep importing:

- [`/Users/pranay/Projects/robonomics/src/data/robots.ts`](/Users/pranay/Projects/robonomics/src/data/robots.ts)

What it exposes:

- `robots`
- `industries` via re-export
- `professions` via re-export
- `researchReferences` via re-export

This means older code that imports from `./data/robots` can continue to work.

## Source of Truth Files

These are the files the research pipeline now treats as the actual writable catalog modules:

- [`/Users/pranay/Projects/robonomics/src/data/robots.ts`](/Users/pranay/Projects/robonomics/src/data/robots.ts)
  - Canonical robot records
  - Existing robot field updates
  - New robot additions

- [`/Users/pranay/Projects/robonomics/src/data/industries.ts`](/Users/pranay/Projects/robonomics/src/data/industries.ts)
  - Canonical industry records
  - New industry additions

- [`/Users/pranay/Projects/robonomics/src/data/professions.ts`](/Users/pranay/Projects/robonomics/src/data/professions.ts)
  - Canonical profession/use-case records used by the UI
  - Currently read by the research runner as reference input

- [`/Users/pranay/Projects/robonomics/src/data/references.ts`](/Users/pranay/Projects/robonomics/src/data/references.ts)
  - Supplemental discovery references
  - `companies`
  - `useCases`
  - `capabilities`
  - `trends`

## Research Intent

The important distinction is:

- `professions.ts` is structured catalog data used by the app
- `references.ts` is lightweight discovery guidance for future research prompts and open-world expansion

So `researchReferences` is not meant to replace the main app-facing catalog. It is meant to help future discovery.

## Practical Rule

If a consumer only needs one import path:

- use [`/Users/pranay/Projects/robonomics/src/data/robots.ts`](/Users/pranay/Projects/robonomics/src/data/robots.ts)

If an updater or research agent needs to modify the catalog correctly:

- edit the split source files directly

## Current UI Usage

The app currently imports directly from the split modules:

- [`/Users/pranay/Projects/robonomics/src/App.tsx`](/Users/pranay/Projects/robonomics/src/App.tsx)

But legacy or external tools can still use the compatibility surface in `robots.ts`.
