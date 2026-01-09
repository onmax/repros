# nimiq-core-3278-fixed

Issue: https://github.com/nimiq/core-rs-albatross/pull/3278

## Problem
@nimiq/core Node.js build uses `import Comlink from 'comlink'` in 3 files (crypto.mjs, index.mjs, worker.mjs) but comlink has no default export. This breaks in Cloudflare Workers and Vercel Edge Runtime with strict ESM bundling.

## Verify Fix
```bash
pnpm i
grep "import \* as Comlink from" node_modules/@nimiq/core/nodejs/*.mjs
# Should show 3 files with correct namespace import
pnpm start
# Works correctly
```

## Fix
Changed 3 files (crypto.mjs, index.mjs, worker.mjs) from:
```js
import Comlink from 'comlink'
```
to:
```js
import * as Comlink from 'comlink'
```
