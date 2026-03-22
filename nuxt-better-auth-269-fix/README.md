# nuxt-better-auth-269-fix

Issue: https://github.com/nuxt-modules/better-auth/issues/269

## Problem

`config.d.ts` imports `CasingOption` from `../schema-generator.js`, but `dist/schema-generator.d.ts` is never emitted by `nuxt-module-build` (only `dist/runtime/**` is included). This makes `auth.schema.casing` typed as `any` in `nuxt.config.ts`.

## Verify

```bash
pnpm i && pnpm verify
```

## Expected

`casing` should be typed as `'camelCase' | 'snake_case'`.

## Actual (without fix)

`casing` is `any` because `dist/schema-generator.d.ts` doesn't exist.

## Fix

pnpm patch replaces the broken `import type { CasingOption } from '../schema-generator.js'` with an inline `type CasingOption = 'camelCase' | 'snake_case'` in `dist/runtime/config.d.ts`.

The real fix in the source should move `CasingOption` into `src/runtime/` so it's included in `dist/runtime/`.
