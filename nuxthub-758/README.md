# nuxthub-758

Reproduction for https://github.com/nuxt-hub/core/issues/758

## Issue
PR #758 breaks first `nuxi prepare` when `.nuxt/` doesn't exist.

## Reproduce
```bash
pnpm i && rm -rf .nuxt && pnpm prepare
```

## Expected error
```
[UNHANDLEABLE_ERROR] Error: Tsconfig not found .nuxt/tsconfig.json
Caused by: Failed to resolve tsconfig option
```

## Root cause
`buildDatabaseSchema()` runs during `modules:done` hook (PR #758 change), before Nuxt generates `.nuxt/tsconfig.json`. The `tsconfig.json` extends `.nuxt/tsconfig.json`, causing rolldown to fail.
