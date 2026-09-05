# nuxthub-830

Issue: https://github.com/nuxt-hub/core/issues/830

## Problem
`@nuxthub/core` generates a physical `@nuxthub/blob` package in the project `node_modules/@nuxthub/blob/` during module setup.

This means `nuxt typecheck` mutates `node_modules/`, and concurrent Nuxt runs can race and overwrite/corrupt `node_modules/@nuxthub/blob/blob.mjs`.

## Verify
```bash
pnpm i
pnpm verify
```

## Expected
`nuxt typecheck` should not write `node_modules/@nuxthub/blob/*`.

## Actual
`nuxt typecheck` writes `node_modules/@nuxthub/blob/blob.mjs` (and related files), which enables races/corruption with concurrent Nuxt runs.

## Optional: nondeterministic race repro
```bash
ATTEMPTS=25 pnpm repro
```
