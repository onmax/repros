# nimiq-core-3278

Issue: https://github.com/nimiq/core-rs-albatross/pull/3278

## Problem
@nimiq/core@2.2.0 Node.js build uses incorrect comlink import in 3 files:
- nodejs/crypto.mjs
- nodejs/index.mjs
- nodejs/worker.mjs

Uses: `import Comlink from 'comlink'` (default import)
Should be: `import * as Comlink from 'comlink'` (namespace import)

Comlink has no default export, breaking strict ESM bundlers.

## Verify

### 1. Check nodejs build has bug
```bash
pnpm i
grep "import Comlink from" node_modules/@nimiq/core/nodejs/*.mjs
```
Expected: 3 files with incorrect default import

### 2. Check comlink exports
```bash
cat node_modules/.pnpm/comlink@*/node_modules/comlink/dist/esm/comlink.mjs | grep "export {"
```
Shows: `export { createEndpoint, expose, ... }` - no default

### 3. Run dev server
```bash
pnpm dev
```
Note: Browser build (bundler/*.js) works fine and has correct imports.
Bug only affects nodejs/*.mjs used by Node.js and edge runtimes.

## Expected
Files should use namespace import: `import * as Comlink from 'comlink'`

## Actual
Files use default import: `import Comlink from 'comlink'` which fails in strict bundlers
