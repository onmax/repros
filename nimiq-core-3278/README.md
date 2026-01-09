# nimiq-core-3278

Issue: https://github.com/nimiq/core-rs-albatross/pull/3278

## Problem
@nimiq/core Node.js build uses `import Comlink from 'comlink'` in 3 files (crypto.mjs, index.mjs, worker.mjs) but comlink has no default export. This breaks in Cloudflare Workers and Vercel Edge Runtime with strict ESM bundling.

## Verify
```bash
pnpm i && pnpm start
```

## Expected
Module loads successfully

## Actual
Works in Node.js but fails in Cloudflare Workers/Vercel Edge with bundling error about missing default export
