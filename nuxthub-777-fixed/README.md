# nuxthub-777-fixed

Issue: https://github.com/nuxt-hub/core/issues/777

## Problem

`DATABASE_URL` env var is ignored when building for Cloudflare. Generated code looks for `POSTGRES` Hyperdrive binding instead.

## Verify

```bash
pnpm i && NITRO_PRESET=cloudflare-pages pnpm build
cat .nuxt/hub/db.mjs
```

## Expected

Generated `db.mjs` should use `DATABASE_URL` connection string directly.

## Actual (after fix)

Generated `db.mjs` uses connection URL directly:
```js
const db = drizzle({ connection: {"url":"postgresql://..."}, schema })
```

## Fix

Patch modifies condition at line 493 to only use Hyperdrive code when `hyperdriveId` is configured:
```diff
- if (["postgres-js", "mysql2"].includes(driver) && hub.hosting.includes("cloudflare")) {
+ if (["postgres-js", "mysql2"].includes(driver) && hub.hosting.includes("cloudflare") && connection?.hyperdriveId) {
```
