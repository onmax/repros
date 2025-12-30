# nuxthub-755

Issue: https://github.com/nuxt-hub/core/issues/755

## Problem

DB schema types not generated during `nuxt prepare`. Breaks CI typecheck on clean `.nuxt` folder.

## Verify

```bash
pnpm i
rm -rf .nuxt
pnpm prepare
ls .nuxt/hub/db/schema.mjs  # Should exist but doesn't
```

## Expected

`.nuxt/hub/db/schema.mjs` and `.nuxt/hub/db/schema.d.mts` exist after `nuxt prepare`.

## Actual

Files missing. `nuxt typecheck` fails with type errors on `hub:db` imports.
