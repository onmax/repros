# nuxthub-830-kv-fix

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

## Fix
Uses `addTemplate` + alias for dev/typecheck, defers physical `node_modules` writes to `nitro:build:before`. Same pattern as blob fix (PR #831).
