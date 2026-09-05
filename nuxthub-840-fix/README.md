# nuxthub-840-fix

Issue: https://github.com/nuxt-hub/core/issues/840

## Problem
`connection` options like `prepare: false` are silently dropped when creating postgres-js clients.

## Fix
Patch strips known NuxtHub connection fields (url, host, port, etc.) and spreads the rest into the postgres() options object.

## Verify
```bash
pnpm i && pnpm build
```
Then check `node_modules/@nuxthub/db/db.mjs` — `prepare: false` IS present in the postgres() call.

## Expected
`postgres('postgresql://localhost:5432/test', { onnotice: () => {}, ...{"prepare":false} })`
