# nuxthub-841-fix

Issue: https://github.com/nuxt-hub/core/issues/841

## Problem

NuxtHub forces `driver: 'd1'` on Cloudflare production builds, ignoring user's explicit `driver: 'libsql'` + connection config (e.g. Turso with custom env vars).

## Fix

Reorder priority checks in `resolveDatabaseConfig`: move `userExplicitLibsql` check **before** the Cloudflare D1 override so explicit `driver: 'libsql'` is respected.

## Verify

```bash
pnpm i && pnpm verify
```

## Expected

Build output (`node_modules/@nuxthub/db/db.mjs`) uses `drizzle-orm/libsql`.

## Actual (with patch)

PASS: Build correctly uses libsql driver.
