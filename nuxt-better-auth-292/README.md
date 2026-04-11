# nuxt-better-auth-292

Issue: https://github.com/nuxt-modules/better-auth/issues/292

## Problem
`#auth/schema` alias not resolved when running `npx nuxt db generate`

## Root cause
NuxtHub's `getTsconfigAliases()` reads `.nuxt/tsconfig.json` paths which strip file extensions (standard TS behavior). The alias resolves to `.nuxt/better-auth/schema` but the file is `schema.mjs`. Rolldown can't find it.

## Verify bug
```bash
pnpm i && npx nuxt db generate
```

## Expected
Migration generated successfully

## Actual
```
Error: Could not resolve '#auth/schema' in server/db/schema.ts
```

## Fix
Patch `@nuxthub/core` — `getTsconfigAliases` now tries common extensions (`.mjs`, `.js`, `.ts`) when the resolved path doesn't exist as-is.

Remove pnpm patch config from `package.json` to reproduce the bug.
