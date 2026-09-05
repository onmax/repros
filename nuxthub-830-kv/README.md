# nuxthub-830-kv

Issue: https://github.com/nuxt-hub/core/issues/830

## Problem
`@nuxthub/core` generates a physical `@nuxthub/kv` package in `node_modules/@nuxthub/kv/` during module setup (including typecheck). Concurrent Nuxt runs can race and overwrite/corrupt `node_modules/@nuxthub/kv/kv.mjs`.

## Verify
```bash
pnpm i
pnpm verify
```

## Expected
`nuxt typecheck` should not write `node_modules/@nuxthub/kv/*`.

## Actual
`nuxt typecheck` writes `node_modules/@nuxthub/kv/kv.mjs` (and related files), which enables races/corruption with concurrent Nuxt runs.

## Optional: nondeterministic race repro
```bash
ATTEMPTS=25 pnpm repro
```
