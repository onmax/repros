# nuxt-better-auth-392-fix

Issue: [nuxt-modules/better-auth#392](https://github.com/nuxt-modules/better-auth/issues/392)

## Problem

Better Auth supports versioned secret rotation through `BETTER_AUTH_SECRETS`, but `@onmax/nuxt-better-auth` still requires `NUXT_BETTER_AUTH_SECRET` or `BETTER_AUTH_SECRET` before it creates the Better Auth instance.

This minimal production server sets only `BETTER_AUTH_SECRETS` and calls `serverAuth()` from `/api/check`.

## Fix

The pnpm patch removes the module's duplicate singular-secret checks and lets Better Auth validate either its singular or versioned secret configuration.

## Verify

```bash
pnpm install
pnpm verify
```

## Expected

`/api/check` returns HTTP 200 and `pnpm verify` passes because the versioned secrets provide an active encryption key.

## Actual (with patch)

`/api/check` returns HTTP 200 and `pnpm verify` passes.
