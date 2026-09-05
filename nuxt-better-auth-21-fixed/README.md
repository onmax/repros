# nuxt-better-auth-21-fixed

Issue: https://github.com/onmax/nuxt-better-auth/issues/21

## Problem

PR #20 uses invalid TypeScript indexed access: `FunctionType['parameterName']`. Functions don't expose parameter names via indexed access.

## Fix

Use inline types instead of indexed access patterns. The return type interface is kept for `.d.ts` generation and is now exported for consumer use.

## Verify

```bash
pnpm i && pnpm typecheck
```

## Expected

✅ Build passes.
