# nuxt-better-auth-392-fix

Issue: [nuxt-modules/better-auth#392](https://github.com/nuxt-modules/better-auth/issues/392)

## Problem

Better Auth supports versioned secret rotation through `BETTER_AUTH_SECRETS`, but `@onmax/nuxt-better-auth` still requires `NUXT_BETTER_AUTH_SECRET` or `BETTER_AUTH_SECRET` before it creates the Better Auth instance.

This minimal production server sets only `BETTER_AUTH_SECRETS` and calls `serverAuth()` from `/api/check`.

## Fix

The pnpm patch matches the PR implementation: it keeps the module's fail-fast production check, accepts runtime singular and versioned Better Auth environment variables, and checks missing secrets before resolving the site URL. The module still rejects missing configurations and singular secrets shorter than 32 characters.

## Verify

```bash
pnpm install
pnpm verify
```

## Expected

`pnpm verify` passes: versioned and runtime-only singular secrets return HTTP 200, while short and missing singular secrets return the module's expected HTTP 500 guidance.

## Actual (with patch)

All four production runtime cases pass.
