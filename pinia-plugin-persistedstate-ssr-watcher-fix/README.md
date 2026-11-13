# pinia-plugin-persistedstate: the persist watcher keeps every SSR app alive (fixed)

Same app as `../pinia-plugin-persistedstate-ssr-watcher`, with `patches/pinia-plugin-persistedstate@4.7.1.patch`: `createPersistence` returns its unsubscribe function and the Nuxt runtime plugin calls it on `app:rendered`.

```sh
git clone --branch repro/pinia-plugin-persistedstate-ssr-watcher https://github.com/onmax/repros.git
cd repros/pinia-plugin-persistedstate-ssr-watcher-fix
pnpm install && pnpm verify
```

`pnpm verify` runs the same verifier with `--expect fixed`: every variant must retain no apps, and the cookie must still be written during SSR.

| variant | NuxtApps retained after GC | heap growth |
|---|---|---|
| fresh-plain | 0 | 0.7 MiB |
| fresh-persist | 0 | 0.8 MiB |
| shared-plain | 0 | 0.7 MiB |
| shared-persist | 0 | 0.7 MiB |

300 requests per run, median of 5 runs. Node 24.21.0, Linux.
