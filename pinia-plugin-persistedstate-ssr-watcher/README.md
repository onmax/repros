# pinia-plugin-persistedstate: the persist watcher keeps every SSR app alive

On the server, `pinia-plugin-persistedstate` subscribes to each persisted store with a deep, detached watcher and never stops it. When a store's state points at a module-level object, that object's dependency list holds the watcher, and the watcher holds pinia, the Vue app and the whole `NuxtApp` of the request. Every request adds one.

```sh
git clone --branch repro/pinia-plugin-persistedstate-ssr-watcher https://github.com/onmax/repros.git
cd repros/pinia-plugin-persistedstate-ssr-watcher
pnpm install && pnpm verify
```

`pnpm verify` builds the app and starts `node --expose-gc .output/server/index.mjs` on `127.0.0.1:47391` once per run. It renders 20 warm-up requests, then 300 more, forces GC, and counts `NuxtApp`s still alive through a `FinalizationRegistry`. It does this 5 times per variant and prints the medians. It also checks that changing state during SSR still writes the persisted cookie.

| variant | state | `persist` |
|---|---|---|
| `fresh-plain` | new object per request | off |
| `fresh-persist` | new object per request | on |
| `shared-plain` | module-level object | off |
| `shared-persist` | module-level object | on |

Expected: no variant keeps apps alive. Actual on 4.7.1:

| variant | NuxtApps retained after GC | heap growth |
|---|---|---|
| fresh-plain | 0 | 0.7 MiB |
| fresh-persist | 0 | 0.8 MiB |
| shared-plain | 0 | 0.7 MiB |
| shared-persist | 300 | 11.3 MiB |

Neither the plugin alone nor the shared object alone retains anything. The plugin's watcher is what links the shared object to each request.

`../pinia-plugin-persistedstate-ssr-watcher-fix` is the same app with a `pnpm patch` that stops the subscription on `app:rendered`. It retains 0 apps in every variant and still writes the cookie.

Why the remaining pieces are there:

- The store is used in a Nuxt plugin. Inside component setup, Vue skips non-immediate watchers during SSR, so the leak needs a store first used outside a component (plugins, route middleware, server-side helpers).
- `experimental.asyncContext` lets the watcher reach `useCookie` during SSR. Without it, 4.7.1 can't write the cookie from the watcher either, so the cookie check would compare nothing.

nuxt 4.6.3, @pinia/nuxt 0.11.3, pinia 3.0.4, vue 3.5.44, pinia-plugin-persistedstate 4.7.1, Node 24.21.0, Linux.
