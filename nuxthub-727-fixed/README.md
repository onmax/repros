# nuxthub-727-fixed

Issue: https://github.com/nuxt-hub/core/issues/727

## Problem

MySQL drizzle client missing `mode` parameter causes "You need to specify mode" error when using relational queries with schema.

## Fix

pnpm patch adds `mode` option to drizzle constructor for MySQL dialect:
- Extracts `mode` from config (defaults to `'default'`)
- Passes to drizzle call: `drizzle({ connection, schema, mode })`
- Applies to both regular and Cloudflare Hyperdrive cases

## Verify

```bash
pnpm install
MYSQL_URL="mysql://test:test@localhost/test" pnpm nuxi prepare
cat .nuxt/hub/db.mjs
```

## Expected (now works)

Generated `db.mjs` includes mode parameter:
```js
const db = drizzle({ connection: {...}, schema, mode: 'default' })
```
