# nuxthub-707

Issue: https://github.com/nuxt-hub/core/issues/707

## Problem

`nuxt db migrate` crashes with `Cannot read properties of undefined (reading 'uri')` when using D1 driver.

## Reproduce

```bash
pnpm i
pnpm prepare
pnpm nuxt db migrate
# Before fix: Cannot read properties of undefined (reading 'uri')
# After fix: D1 driver cannot be used with CLI commands. Use `d1-http` driver with API credentials, or run migrations directly with `npx wrangler d1 migrations apply DB`.
```

## Root Cause

1. CLI commands access `hubConfig.db.connection.uri` without checking if `connection` exists
2. D1 driver has no `connection` object (uses Cloudflare Workers bindings)
3. `createDrizzleClient` didn't handle D1 driver

## Fix

1. Add optional chaining to `connection?.uri` in CLI commands
2. Add D1 driver check with helpful error message
3. Add `d1-http` driver support using `drizzle-orm/sqlite-proxy`
