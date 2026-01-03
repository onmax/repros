# nuxt-better-auth-20

Issue: https://github.com/onmax/nuxt-better-auth/pull/20

## Problem

PR #20 uses invalid TS indexed access: `FunctionType['parameterName']`. Functions don't expose parameter names this way.

## Verify

```bash
pnpm i && pnpm typecheck
```

## Expected

Build should pass.

## Actual

```
error TS2339: Property 'updates' does not exist on type '(updates: { name?: string; }) => void'.
error TS2339: Property 'options' does not exist on type '(options?: ...) => Promise<void>'.
```
