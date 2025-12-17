# nuxthub-727

Issue: https://github.com/nuxt-hub/core/issues/727

## Problem

MySQL drizzle client missing `mode` parameter causes "You need to specify mode" error when using relational queries with schema.

## Verify

```bash
pnpm install
MYSQL_URL="mysql://test:test@localhost/test" pnpm nuxi prepare
cat .nuxt/hub/db.mjs
```

## Expected

Generated `db.mjs` should include mode parameter:
```js
const db = drizzle({ connection: {...}, schema, mode: 'default' })
```

## Actual

Generated `db.mjs` is missing mode:
```js
const db = drizzle({ connection: {...}, schema })
```
