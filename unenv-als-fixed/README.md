# unenv AsyncLocalStorage.run() breaks with async callbacks

Minimal reproduction for [unjs/unenv](https://github.com/unjs/unenv).

## The Bug

`AsyncLocalStorage.run()` clears `_currentStore` synchronously after calling the callback. When the callback is async, the store is cleared before any awaited code runs.

**File:** `src/runtime/node/internal/async_hooks/async-local-storage.ts:32-36`

```ts
run(store, callback, ...args) {
  this._currentStore = store;
  const res = callback(...args);     // If async, res is a Promise
  this._currentStore = undefined;    // BUG: Clears BEFORE promise resolves!
  return res;
}
```

## Reproduce

```bash
pnpm install
pnpm test        # unenv polyfill - FAILS
pnpm test:native # native Node.js - PASSES
```

## Expected Output (native)

```
Using: native AsyncLocalStorage
Sync: ✅ PASS
Async: ✅ PASS
Nested: ✅ PASS
```

## Actual Output (unenv)

```
Using: unenv polyfill
Sync: ✅ PASS
Async: ❌ FAIL (got undefined)
Nested: ❌ FAIL (got undefined)
```

## Impact

Any library using AsyncLocalStorage with async callbacks breaks on runtimes using unenv polyfill (Cloudflare Workers, edge runtimes via Nitro, etc).

Real-world example: [better-auth#6613](https://github.com/better-auth/better-auth/issues/6613)

## Suggested Fix

```ts
run<R, TArgs extends any[]>(store: any, callback: (...args: TArgs) => R, ...args: TArgs): R {
  this._currentStore = store;
  const res = callback(...args);
  // Handle async callbacks
  if (res instanceof Promise) {
    return res.finally(() => { this._currentStore = undefined; }) as R;
  }
  this._currentStore = undefined;
  return res;
}
```

Note: This is a minimal fix. A proper implementation would need to handle nested `run()` calls correctly by restoring the previous store value instead of setting to `undefined`.
