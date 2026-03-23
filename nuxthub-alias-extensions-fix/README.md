# nuxthub-alias-extensions-fix

Issue: https://github.com/nuxt-hub/core/issues/TBD

## Problem
`nuxt db generate` fails to resolve aliases pointing to `.mjs` template files.

## Verify
```bash
pnpm i && npx nuxt db generate
```

## Expected
Migration generated successfully

## Fix
Patch `@nuxthub/core` — `getTsconfigAliases` tries common extensions (`.mjs`, `.js`, `.ts`) when the resolved path doesn't exist as-is.
