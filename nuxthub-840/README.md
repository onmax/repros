# nuxthub-840

Issue: https://github.com/nuxt-hub/core/issues/840

## Problem
`connection` options like `prepare: false` are silently dropped when creating postgres-js clients. Only `connection.url` is extracted; everything else is discarded.

## Verify
```bash
pnpm i && pnpm build
```
Then check `node_modules/@nuxthub/db/db.mjs` — `prepare: false` is missing from the postgres() call.

## Expected
`postgres('postgresql://localhost:5432/test', { onnotice: () => {}, ...{"prepare":false} })`

## Actual
`postgres('postgresql://localhost:5432/test', { onnotice: () => {} })`
