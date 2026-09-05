# unenv-als-broken

Demonstrating why better-auth fails on Cloudflare Workers: https://github.com/better-auth/better-auth/issues/6613

## The Bug

**Direct `node:async_hooks` import works on CF Workers.** But libraries that import through bundled modules get the broken polyfill.

## Test Results

```bash
curl https://unenv-als-broken.maximogarciamtnez.workers.dev/api/test
```

```json
{
  "hasGlobalALS": false,
  "direct": {
    "name": "node:async_hooks",
    "isPolyfill": false,
    "sync": { "pass": true },
    "async": { "pass": true }  // ✅ WORKS
  },
  "globalThis": { "available": false }
}
```

## The Problem

**CF Workers:** `globalThis.AsyncLocalStorage` is NOT available

**Nitro bundled code:**
```js
// nitro.mjs
const e = globalThis.AsyncLocalStorage || class { __unenv__... }  // Uses polyfill!
export const asyncHooksModule = { AsyncLocalStorage: e }
```

**better-auth bundled code:**
```js
// auth.mjs
import("../nitro/nitro.mjs")
  .then(t => t.L)  // Gets nitro's async_hooks export
  .then(t => t.AsyncLocalStorage)  // Gets the POLYFILL
```

**Direct import (WORKS):**
```js
import('node:async_hooks').then(m => m.AsyncLocalStorage)  // Gets NATIVE
```

## The Polyfill Bug

```js
run(store, callback) {
  this._currentStore = store;
  const result = callback();  // If async, result is Promise
  return this._currentStore = void 0, result;  // Clears BEFORE promise resolves!
}
```

## Fix Options

### Option 1: Fix in better-auth (recommended)
Import directly from `node:async_hooks`:
```js
// Before (broken)
const asyncHooksModule = await import("@better-auth/core/async_hooks")

// After (works)
const { AsyncLocalStorage } = await import("node:async_hooks")
```

### Option 2: Fix in Nitro/unenv
Make bundled async_hooks re-export use native when available on CF Workers.

## Verify

```bash
pnpm install
pnpm dev
curl http://localhost:3000/api/test  # Works locally

pnpm build
CLOUDFLARE_ACCOUNT_ID=xxx npx wrangler deploy .output/server/index.mjs --assets .output/public
curl https://unenv-als-broken.xxx.workers.dev/api/test  # Direct import works, globalThis fails
```
