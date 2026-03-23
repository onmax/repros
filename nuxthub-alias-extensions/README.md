# nuxthub-alias-extensions

Issue: https://github.com/nuxt-hub/core/issues/TBD

## Problem
`nuxt db generate` fails to resolve aliases pointing to `.mjs` template files.

`getTsconfigAliases()` reads `.nuxt/tsconfig.json` paths which strip extensions (standard TS behavior). The alias resolves to e.g. `.nuxt/custom/tables` but the file is `tables.mjs`. Rolldown can't find it.

## Verify
```bash
pnpm i && npx nuxt db generate
```

## Expected
Migration generated

## Actual
```
Error: Could not resolve '#custom/tables' in server/db/schema.ts
```
