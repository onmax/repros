# nuxthub-777

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

## Actual

Generated `db.mjs` contains:
```js
const hyperdrive = process.env.POSTGRES || globalThis.__env__?.POSTGRES || globalThis.POSTGRES
if (!hyperdrive) throw new Error('POSTGRES binding not found')
```
