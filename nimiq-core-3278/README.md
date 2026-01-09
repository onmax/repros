# nimiq-core-3278

Issue: https://github.com/nimiq/core-rs-albatross/pull/3278

## Problem
@nimiq/core@2.2.0 and @nimiq/core@2.2.1 have incorrect comlink imports in nodejs/*.mjs files:
- nodejs/crypto.mjs
- nodejs/index.mjs
- nodejs/worker.mjs

Bug: `import Comlink from 'comlink'` (default import)
Fix: `import * as Comlink from 'comlink'` (namespace import)

Comlink has no default export - only named exports.

## Verify Bug Exists

```bash
pnpm i
grep "import Comlink from" node_modules/@nimiq/core/nodejs/*.mjs
```

Expected output:
```
node_modules/@nimiq/core/nodejs/crypto.mjs:import Comlink from 'comlink';
node_modules/@nimiq/core/nodejs/index.mjs:import Comlink from 'comlink';
node_modules/@nimiq/core/nodejs/worker.mjs:import Comlink from 'comlink';
```

Verify comlink has no default:
```bash
cat node_modules/.pnpm/comlink@*/node_modules/comlink/dist/esm/comlink.mjs | tail -5
```

Shows: `export { createEndpoint, expose, ... }` - no default export.

## Why Hard to Reproduce

The bug exists in code but doesn't manifest easily because:
1. **Browser/bundler builds** already have correct imports (`import * as Comlink`)
2. **Node.js is lenient** - doesn't error on this
3. **Most runtimes use bundler build** not nodejs build

The nodejs/*.mjs files would be used by Node.js or edge runtimes with strict ESM, but those environments are complex to set up for testing.

## Demo

Vue app showing Nimiq client works (uses browser build which has correct imports):
```bash
pnpm dev
```

The bug is in the nodejs build code, verifiable via grep.
