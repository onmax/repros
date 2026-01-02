# nuxt-better-auth-21

Issue: https://github.com/onmax/nuxt-better-auth/issues/21

## Problem

PR #20 uses invalid TypeScript indexed access: `FunctionType['parameterName']`. Functions don't expose parameter names via indexed access.

## Verify

```bash
pnpm i && pnpm typecheck
```

## Expected

Build should pass.

## Actual

```
error TS2339: Property 'updates' does not exist on type '(updates: { name?: string; }) => void'.
error TS2339: Property 'options' does not exist on type '(options?: { headers?: HeadersInit; force?: boolean; }) => Promise<void>'.
error TS2339: Property 'options' does not exist on type '(options?: SignOutOptions) => Promise<unknown>'.
```
