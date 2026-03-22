# nuxt-better-auth-269

Issue: https://github.com/nuxt-modules/better-auth/issues/269

## Problem

`auth.schema.casing` in `nuxt.config.ts` is typed as `any` instead of `'camelCase' | 'snake_case'`.

Root cause: `dist/runtime/config.d.ts` imports `CasingOption` from `../schema-generator.js`, but `dist/schema-generator.d.ts` doesn't exist (`nuxt-module-build` only emits `dist/runtime/**`).

## Verify

```bash
pnpm i && npx nuxi typecheck
```

## Expected

Typecheck passes — `@ts-expect-error` suppresses the error from `casing: 123`.

## Actual

`error TS2578: Unused '@ts-expect-error' directive` — `casing: 123` is accepted because `casing` is `any`.
