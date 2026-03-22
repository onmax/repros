# nuxt-better-auth-269

Issue: https://github.com/nuxt-modules/better-auth/issues/269

## Problem

`config.d.ts` imports `CasingOption` from `../schema-generator.js`, but `dist/schema-generator.d.ts` is never emitted by `nuxt-module-build` (only `dist/runtime/**` is included). This makes `auth.schema.casing` typed as `any` in `nuxt.config.ts`.

## Verify

```bash
pnpm i && pnpm verify
```

## Expected

`casing` should be typed as `'camelCase' | 'snake_case'`.

## Actual

`casing` is `any` because `dist/schema-generator.d.ts` doesn't exist and the import in `config.d.ts` is broken.
