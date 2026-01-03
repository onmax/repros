# nuxt-better-auth-20-fixed

Issue: https://github.com/onmax/nuxt-better-auth/pull/20

## Problem

PR #20 uses invalid TS indexed access: `FunctionType['parameterName']`. Functions don't expose parameter names this way.

## Fix

Use inline types instead of indexed access patterns. The return type interface is kept for `.d.ts` generation but parameter types use direct types.

## Verify

```bash
pnpm i && pnpm typecheck
```

## Expected

✅ Build passes.
