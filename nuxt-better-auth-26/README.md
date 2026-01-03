# nuxt-better-auth-26

Issue: https://github.com/onmax/nuxt-better-auth/pull/26

## Problem

No autocompletion for `ctx.runtimeConfig` and `ctx.db` in `defineServerAuth`

## Verify

```bash
BETTER_AUTH_SECRET="12345678901234567890123456789012" pnpm i && pnpm prepare && pnpm typecheck
```

Error shows `ctx.runtimeConfig` is `Record<string, unknown>` not `RuntimeConfig`.

## Expected

- `ctx.runtimeConfig` → `RuntimeConfig` from `nuxt/schema`
- `ctx.db` → Drizzle D1 database type

## Actual

- `ctx.runtimeConfig` → `Record<string, unknown>`
- `ctx.db` → `unknown`

## Root Cause

`defineServerAuth` imports `ServerAuthContext` directly from `@onmax/nuxt-better-auth/dist/runtime/types/augment.js`. The generated types in `.nuxt/types/nuxt-better-auth-infer.d.ts` use `declare module '#nuxt-better-auth'` to extend the interface, but `config.d.ts` doesn't import from the module alias - it imports from the source file directly.

**Declaration merging doesn't work across different import paths.**

## Fix (NOT PR #26's approach)

PR #26 tries to fix this by changing `augment.ts` directly, but that's wrong because:
1. Can't import from `#imports` in module source code
2. Breaks non-hub:db setups

**Correct fix:** Change how `defineServerAuth` imports `ServerAuthContext` - use the module alias `#nuxt-better-auth` instead of direct import.
