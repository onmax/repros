# nuxt-better-auth-269-fix

Issue: https://github.com/nuxt-modules/better-auth/issues/269

## Problem

`auth.schema.casing` in `nuxt.config.ts` is typed as `any` instead of `'camelCase' | 'snake_case'`.

## Fix

pnpm patch replaces the broken import in `dist/runtime/config.d.ts`:
- Before: `import type { CasingOption } from '../schema-generator.js'` (file doesn't exist)
- After: `import type { Casing as CasingOption } from 'drizzle-orm/utils'`

## Verify

```bash
pnpm i && npx nuxi typecheck
```

## Expected

Typecheck passes — `@ts-expect-error` correctly suppresses the error from `casing: 123` (proving `casing` is now properly typed).

## Actual

Typecheck passes.
