# nuxt-better-auth-31

Issue: https://github.com/onmax/nuxt-better-auth/issues/31

## Problem

`defineServerAuth` is not auto-imported in server context, causing production server to crash at startup.

## Verify

```bash
BETTER_AUTH_SECRET="this-is-a-test-secret-that-is-at-least-32-chars" pnpm i && pnpm build && node .output/server/index.mjs
```

## Expected

Server starts without errors

## Actual

```
ReferenceError: defineServerAuth is not defined
    at file:///.output/server/chunks/nitro/nitro.mjs
```
