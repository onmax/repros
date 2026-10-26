# Nuxt 5: server `useFetch` keeps finished requests alive past GC

On Nuxt 5, a server `useFetch` of an internal route keeps each finished request's `nuxtApp` alive through a forced GC. It is freed only after a later event-loop turn.

```sh
node verify.mjs
```

This builds both fixtures, sends 100 concurrent requests to `/`, forces GC in the server and counts the `nuxtApp`s still alive.

| fixture | alive after GC | after one `setTimeout(0)` + GC |
|---|---|---|
| `nuxt-asyncdata-request-signal` | 100 of 100, 233 MB | 0, 11 MB |
| `nuxt-asyncdata-request-signal-fix` | 0, 11 MB | 0, 11 MB |

Same result in 5 of 5 runs. Expected is 0, as on Nuxt 4.6.2.

The server runs with `--initial-old-space-size=1024`. Without it, V8 may run a full GC during the burst, the finalizer runs, and part of the backlog is freed early. Runs then kept anywhere from 3 to 48 apps.

Pinned: `nuxt-nightly@5.0.0-2610251741-2aa3d76`, Node 24.21.0 with undici 7.29.1.

## Cause

`useAsyncData` adds its abort listener to `mergedSignal` with `{ signal: cleanupController.signal }`, and the listener closes over `nuxtApp`. Nitro 3 passes `mergedSignal` to a real undici `Request`, which keeps the signal alive until its finalizer runs. Node keeps a listener added with `{ signal }` reachable from the signal even after it is removed, so `nuxtApp` stays too. Nitro 2 creates no `Request` for internal fetches, which is why Nuxt 4 is fine.

`node-only.mjs` shows the same thing without Nuxt: `node --expose-gc node-only.mjs 20 request|norequest|fixed`.

## Fix

The `-fix` fixture adds `patches/nuxt-nightly@5.0.0-2610251741-2aa3d76.patch`, which removes the listener with `removeEventListener` instead of `{ signal }`.
