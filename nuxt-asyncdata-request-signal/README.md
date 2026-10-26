# Nuxt 5: server `useFetch` keeps finished requests alive past GC

On Nuxt 5 (Nitro 3), each server-side `useFetch` of an internal route keeps its whole request app (`nuxtApp`, payload, Vue app) alive after the request has finished. A forced full GC does not free it. It is freed only after a later event-loop turn, once undici's `FinalizationRegistry` cleanup has run and another GC follows. Under steady traffic this keeps a large, changing number of finished requests in the heap. In a 50-row table dashboard that means 130–700 MB after GC (Nuxt 4: 33 MB), 2.3 GB peak RSS and a p99 of 1.4 s.

## Run

```sh
node verify.mjs            # both fixtures, from the branch root
```

`verify.mjs` installs with the lockfile, builds each fixture for production, starts it with `--expose-gc --import ./probe.mjs`, and sends one concurrent burst of 50 requests to `/`. `probe.mjs` then forces two GCs and counts the request apps that are still alive (through WeakRefs added by `app/plugins/track-apps.server.ts`). It counts again after one `setTimeout(0)` turn.

## Expected and actual

| fixture | alive after forced GC | after one `setTimeout(0)` + GC |
|---|---|---|
| `nuxt-asyncdata-request-signal` (bug) | 33–38 of 50 apps, 85–97 MB heap | 0 apps, 12 MB |
| `nuxt-asyncdata-request-signal-fix` (control) | 0 apps, 11 MB | 0 apps, 11 MB |

Expected: 0 apps in both columns, as on Nuxt 4.6.2 with the same app (measured: 0 apps, 15 MB).

## Environment

- `nuxt-nightly@5.0.0-2610251741-2aa3d76` (nitro 3.0.260903-beta), Vue 3.5.44, lockfile committed.
- Node 24.21.0 (bundled undici 7.29.1), Linux x64.
- Nuxt `main` has the same `useAsyncData` code as of 2026-10-26.

## Cause

Retention path, read from a heap snapshot of the real app:

1. Server `useFetch` calls `useAsyncData`. `execute()` creates `mergedSignal = AbortSignal.any([...])` and adds its abort listener with `{ once: true, signal: cleanupController.signal }`. That listener closes over the request scope (`nuxtApp`).
2. Nitro 3 sends the internal fetch through a real `Request` (h3 `createSubRequest` / `toRequest`: `new Request(url, { signal: mergedSignal })`). undici's `Request` constructor adds its own abort listener to `mergedSignal`. It also registers `requestFinalizer.register(ac, { signal, abort })`: the held value keeps `mergedSignal` strongly until the Request's `AbortController` has been collected *and* the cleanup callback has run.
3. When Nuxt's `finally` aborts `cleanupController`, Node removes Nuxt's listener. But the `{ signal }` option registered a weak handler, and Node keeps it in a WeakMap keyed by `mergedSignal` (`weakListeners().map.set(mergedSignal, () => this.removeEventListener(type, listener, options))`). So while `mergedSignal` lives, Nuxt's removed listener and `nuxtApp` stay reachable.
4. Because undici's listener is still attached, Node also keeps the composite signal in its strong `gcPersistentSignals` Set.

So each finished request survives until a GC collects the `Request`, a separate task runs the finalizer, and a second GC runs. Under load the backlog is everything since the last major GC. Nuxt 4 (Nitro 2) answers internal fetches without an undici `Request`, so step 2 never happens.

`node-only.mjs` shows the same thing without Nuxt (`node --expose-gc node-only.mjs 20 request|norequest|fixed`): 159 MB kept after GC with the `Request`, 4 MB without, 7 MB with the fix.

## Fix control

`nuxt-asyncdata-request-signal-fix` is the same app with `patches/nuxt-nightly@5.0.0-2610251741-2aa3d76.patch`. The patch removes the abort listener explicitly instead of through the `{ signal }` option, so `mergedSignal` keeps no path to the request once it is done:

```js
const onAbort = () => { /* reject(...) as before */ }
mergedSignal.addEventListener('abort', onAbort, { once: true })
cleanupController.signal.addEventListener('abort', () => mergedSignal.removeEventListener('abort', onAbort), { once: true })
```

In the original dashboard app the same change brings heap after GC from 87–706 MB to 34–35 MB over 480 requests.

## Why each part is here

- `server/api/report.get.ts` returns 20,000 items. With 500 items only 8 of 50 apps survive, because short-lived requests get collected and finalized between requests.
- `useFetch` of an internal route is the trigger. `useAsyncData` with a handler that does not fetch keeps 0 apps.
- One concurrent burst, not sequential requests. Gaps between requests let the finalizer run, which hides most of the effect.
- `app/plugins/track-apps.server.ts` and `probe.mjs` are only measurement.
