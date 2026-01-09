# nimiq-core-3278

Issue: https://github.com/nimiq/core-rs-albatross/pull/3278

## Problem
@nimiq/core Node.js build uses `import Comlink from 'comlink'` in 3 files (crypto.mjs, index.mjs, worker.mjs) but comlink has no default export. This breaks in Cloudflare Workers and Vercel Edge Runtime with strict ESM bundling.

## Reproduce

### 1. Verify incorrect import exists
```bash
pnpm i
grep "import Comlink from" node_modules/@nimiq/core/nodejs/*.mjs
# Should show 3 files with incorrect default import
```

### 2. Check comlink has no default export
```bash
tail -5 node_modules/.pnpm/comlink@*/node_modules/comlink/dist/esm/comlink.mjs
# Shows: export { createEndpoint, expose, ... } - NO default export
```

### 3. Test in Node.js (works but incorrect)
```bash
pnpm start
# Node.js is lenient and allows this, but it violates ESM spec
```

### 4. Deploy to Cloudflare Workers or Vercel Edge (fails)
See [nimiq/starter](https://github.com/nimiq/starter) cloudflare-d1 example which needs patches/@nimiq__core@2.2.0.patch to work around this issue.

## Expected
Code should use `import * as Comlink from 'comlink'` (namespace import)

## Actual
Uses `import Comlink from 'comlink'` (default import) which fails in strict bundlers
