# nuxt-better-auth-31-fixed

Issue: https://github.com/onmax/nuxt-better-auth/issues/31

## Problem

`defineServerAuth` is not auto-imported in server context, causing production builds to fail.

## Verify

```bash
BETTER_AUTH_SECRET="this-is-a-test-secret-that-is-at-least-32-chars" pnpm i && pnpm build && timeout 3 node .output/server/index.mjs || true
```

## Expected

Build succeeds and server starts without errors

## Actual (with patch)

Server starts successfully ✅

## Fix

Added `addServerImports` call to register `defineServerAuth` as a server auto-import, and inject `defineServerAuth` into global scope for jiti-loaded configs.
