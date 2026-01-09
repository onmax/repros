# nimiq-core-3278-fixed

Issue: https://github.com/nimiq/core-rs-albatross/pull/3278

## Problem
@nimiq/core@2.2.0 Node.js build uses incorrect comlink import

## Fix
Changed 3 files via pnpm patch:
- nodejs/crypto.mjs
- nodejs/index.mjs
- nodejs/worker.mjs

```diff
-import Comlink from 'comlink'
+import * as Comlink from 'comlink'
```

## Verify

### 1. Check patch applied
```bash
pnpm i
grep "import.*Comlink.*from" node_modules/@nimiq/core/nodejs/*.mjs
```
Expected: 3 files with `import * as Comlink from 'comlink'`

### 2. Run dev server
```bash
pnpm dev
```
Works correctly with the patch applied.

## Patch
See `patches/@nimiq__core.patch` for the fix applied to @nimiq/core@2.2.0
