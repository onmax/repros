# nuxthub-758-fixed

Fix for PR #758 regression

## Verify
```bash
pnpm i && pnpm prepare
ls .nuxt/hub/db/  # schema.mjs + schema.d.mts
```

## Fix
Add `tsconfig: false` to tsdown build options in `src/db/lib/build.ts`.

Prevents rolldown from resolving project tsconfig.json which extends `.nuxt/tsconfig.json` (doesn't exist during first prepare).
