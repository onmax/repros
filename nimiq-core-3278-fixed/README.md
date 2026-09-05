# nimiq-core-3278-fixed

Issue: https://github.com/nimiq/core-rs-albatross/pull/3278

## Fix Applied

Used pnpm patch to fix 3 files in @nimiq/core@2.2.0:
- nodejs/crypto.mjs
- nodejs/index.mjs
- nodejs/worker.mjs

```diff
-import Comlink from 'comlink'
+import * as Comlink from 'comlink'
```

## Verify Fix

```bash
pnpm i
grep "import \* as Comlink from" node_modules/@nimiq/core/nodejs/*.mjs
```

Expected output:
```
node_modules/@nimiq/core/nodejs/crypto.mjs:import * as Comlink from 'comlink';
node_modules/@nimiq/core/nodejs/index.mjs:import * as Comlink from 'comlink';
node_modules/@nimiq/core/nodejs/worker.mjs:import * as Comlink from 'comlink';
```

## Patch File

See `patches/@nimiq__core.patch` for the exact changes.

## Demo

```bash
pnpm dev
```
