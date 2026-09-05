# nuxthub-755-fixed

Issue: https://github.com/nuxt-hub/core/issues/755

## Problem

DB schema types not generated during `nuxt prepare`. Breaks CI typecheck on clean `.nuxt` folder.

## Verify

```bash
pnpm i
rm -rf .nuxt
pnpm prepare
ls .nuxt/hub/db/schema.mjs  # Now exists!
```

## Fix

Removed `!nuxt.options._prepare` guard in `src/db/setup.ts:243` so `buildDatabaseSchema()` runs during prepare.
