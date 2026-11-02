# Nuxt: `experimental.buildCache` restores the SSR build, then builds it again

On a cache hit, Nuxt restores the build dir, including the SSR output in `vite/services/ssr/`, and logs "Restored Vue client and server builds from cache". It then skips the client build, but the SSR environment builds again.

## Environment

- `nuxt-nightly` 5.0.0-2611010234-c709ec8 (Nuxt main), vite 8.3.5, rolldown 1.2.16, nitro 3.0.261029-rc
- Node 24, Linux, pnpm 12

## Verify

```sh
git clone --branch repro/nuxt-build-cache-ssr-rebuild https://github.com/onmax/repros.git
cd repros/nuxt-build-cache-ssr-rebuild
pnpm install
pnpm verify
```

`verify.mjs` deletes `.nuxt`, `.output` and `node_modules/.cache`, runs `nuxt prepare`, then runs `nuxt build` twice. Build 2 is a cache hit. It exits 1 when SSR builds again after the restore.

```
build 1 (cache miss): cache restored: false
  client build started
  ssr build started, SSR output already on disk: false
build 2 (cache hit): cache restored: true
  ssr build started, SSR output already on disk: true
FAIL: the cache hit restored the SSR output, then built SSR again
```

Expected: build 2 skips both the client and the SSR build. Actual: it skips only the client.

## Why each part is here

- `experimental.buildCache` in `nuxt.config.ts` turns on the cache.
- The `log-builds` plugin in `nuxt.config.ts` only writes one line to `builds.log` in `buildStart` of the client and SSR environments. For SSR, it also records whether `index.mjs` is already in the SSR output dir at that moment. It changes no code.
- `nuxt prepare` creates `.nuxt`, as `pnpm install` does in a real project. With `.nuxt` present, `nuxt build` writes to `node_modules/.cache/nuxt/.nuxt`. Without it, build 1 would use `.nuxt` and build 2 the other dir.

## Cause

In `packages/nuxt/src/core/cache.ts`, the `buildApp` hook of `nuxt:build-cache:client` sets `isBuilt` only on the client environment. The code comment says this is on purpose.

In this hello-world app the extra SSR build is short. In a production app it takes about 4.4 s of a 16.4 s build.

nuxt/nuxt#36810 lets a cache hit reuse the restored SSR output.
