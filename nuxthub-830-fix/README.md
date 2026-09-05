# nuxthub-830-fix

Issue: https://github.com/nuxt-hub/core/issues/830

## Problem
Same as `nuxthub-830`.

## Verify
```bash
pnpm i
pnpm verify
```

## Fix
Uses a `pnpm patch` for `@nuxthub/core@0.10.6` that:
- stops writing `node_modules/@nuxthub/blob/*` during `nuxt typecheck` / module setup
- only materializes the physical `@nuxthub/blob` package during build hooks
- uses atomic writes to avoid partial/corrupted `blob.mjs`
