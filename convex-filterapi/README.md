# convex-filterapi

Issue: TypeScript/Convex type inference bug with npm `file:` dependencies

## Problem

When using `@convex-dev/r2` via npm `file:` link, `FilterApi` incorrectly filters out public mutations.

The `api.r2` object should contain:
- `generateUploadUrl` (mutation)
- `syncMetadata` (mutation)
- `deleteObject` (mutation)
- `listImages` (query)

But after `FilterApi<..., FunctionReference<any, "public">>`, only `listImages` remains.

## Root Cause

The `_visibility` field gets widened from `"public"` to `FunctionVisibility` (`"public" | "internal"`) when types flow through `ApiFromModules`. This causes `FilterApi` to exclude the mutations because their widened visibility doesn't satisfy `extends "public"`.

This only occurs with **npm** `file:` dependencies (symlinks to source), not with:
- pnpm `file:` dependencies
- npm registry packages

## Verify

```bash
# Must use npm (not pnpm) to reproduce
npm i && npm run typecheck
```

## Expected

Build should pass - `api.r2` should have `generateUploadUrl` and `syncMetadata`.

## Actual

```
error TS2739: Type '{ listImages: FunctionReference<...> }' is missing properties: generateUploadUrl, syncMetadata
```

## Notes

- The issue is related to how TypeScript resolves types across npm symlinks
- When npm symlinks to source repo, types may be resolved from different `node_modules` locations
- This causes type identity issues even with identical type definitions
