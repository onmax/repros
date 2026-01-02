# better-auth-6613-fixed

Issue: https://github.com/better-auth/better-auth/issues/6613

## Problem

better-auth v1.4+ throws "No request state found" on Cloudflare Workers when calling `auth.api.signInSocial()` directly. Works locally, fails when deployed.

## Root Cause Analysis

**The issue is NOT in better-auth. It's in Nitro/unenv.**

### Debug Output from CF Workers

```json
{"error":"No request state found...","debug":{"hasGlobalALS":false,"alsType":"native"}}
```

- `hasGlobalALS: false` - Cloudflare Workers doesn't expose AsyncLocalStorage on `globalThis`
- This causes Nitro to use `unenv`'s polyfill instead of the real AsyncLocalStorage

### The Broken Polyfill

In `.output/server/chunks/nitro/nitro.mjs`:

```js
const e = globalThis.AsyncLocalStorage || class {
  __unenv__ = true;
  _currentStore;
  run(e, t, ...r) {
    this._currentStore = e;
    const s = t(...r);          // If t is async, s is a Promise
    return this._currentStore = void 0, s;  // CLEARS IMMEDIATELY!
  }
  // ...
};
```

The polyfill clears `_currentStore` synchronously after calling the callback. But when the callback is async (returns a Promise), the store is cleared before any awaited code runs.

### Why It Works Locally

Local dev uses Node.js with native AsyncLocalStorage which properly maintains context across async boundaries.

### Why Patches Don't Help

1. **better-auth patches** - Correctly wrap calls, but the ALS instance they use is the broken polyfill
2. **better-auth 1.4.8-beta.1** - Added conditional async_hooks imports, but Nitro still bundles the polyfill

## Tested Versions

- `better-auth@1.4.7` - fails
- `better-auth@1.4.8-beta.1` - still fails

## The Fix Needed

**Option 1: Fix in Nitro/unenv**
- Use real AsyncLocalStorage from `node:async_hooks` when `nodejs_compat` is enabled
- Or fix the polyfill to handle async callbacks:
  ```js
  run(store, fn, ...args) {
    this._currentStore = store;
    const result = fn(...args);
    if (result?.then) {
      return result.finally(() => { this._currentStore = undefined; });
    }
    this._currentStore = undefined;
    return result;
  }
  ```

**Option 2: Fix in better-auth**
- Don't rely on AsyncLocalStorage for request state
- Use explicit request context passing

## Deployed Test

```bash
curl -X POST https://better-auth-6613.maximogarciamtnez.workers.dev/api/test
```

## Setup

```bash
pnpm install
pnpm dev
curl -X POST http://localhost:3000/api/test
```

## Related

- Nitro: https://github.com/nitrojs/nitro
- unenv: https://github.com/unjs/unenv
- better-auth PR #6630: Conditional async_hooks imports (doesn't fix this)
