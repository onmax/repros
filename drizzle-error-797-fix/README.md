# drizzle-error-797-fix

Issue: https://github.com/nuxt-hub/core/pull/797

## Problem

`db.query.users` and `schema.users` fail with DrizzleTypeError during `nuxt build` with `typescript.typeCheck: 'build'`.

## Verify

```bash
pnpm i && pnpm build
```

## Expected

Build succeeds without TypeScript errors.

## Actual (without fix)

```
error TS2339: Property 'users' does not exist on type 'DrizzleTypeError<"Seems like the schema generic is missing...">'
```

## Fix

Patch applies 3 fixes to `@nuxthub/core`:
1. Merge build+copy hooks into single sequential operation (prevents race condition)
2. Only write stub files if they don't exist (prevents overwriting real types)
3. Fall back to `.nuxt/` when buildDir is in cache (handles build cache scenario)
