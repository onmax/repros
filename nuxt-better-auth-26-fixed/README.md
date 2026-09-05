# nuxt-better-auth-26-fixed

Issue: https://github.com/onmax/nuxt-better-auth/issues/29

## Problem

No autocompletion for `ctx.runtimeConfig` and `ctx.db` in `defineServerAuth`

## Fix

Augment `@onmax/nuxt-better-auth/config` module with properly typed `defineServerAuth` in generated types.

The fix adds to `nuxt-better-auth-infer.d.ts`:
```typescript
interface _AugmentedServerAuthContext {
  runtimeConfig: RuntimeConfig
  db: typeof import('hub:db')['db']  // conditional based on hasHubDb
}

declare module '@onmax/nuxt-better-auth/config' {
  export function defineServerAuth<T>(config: (ctx: _AugmentedServerAuthContext) => T): ...
}
```

## Verify

```bash
BETTER_AUTH_SECRET="12345678901234567890123456789012" pnpm i && pnpm prepare && pnpm typecheck
```

Typecheck passes (no errors).
