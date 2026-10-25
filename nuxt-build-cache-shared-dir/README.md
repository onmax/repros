# Nuxt build cache ships a stale client after a `shared/` edit

Given `nuxt-nightly@5.0.0-2610241346-9f02a3d` (nuxt/nuxt main at `9f02a3d`, with the same `packages/nuxt/src/core/cache.ts` as main at `bf4220d6e`) with Nitro 3.0.260903-beta, Vite 8.3.5 and Vue 3.5.44, on Node 24 with `experimental.buildCache: true`: editing a file in `shared/` and building again should rebuild the client. Instead the second build logs `Restored Vue client and server builds from cache`. The client bundle still has the old value and the server bundle has the new one, so the server renders `shared-v2` and the client hydrates with `shared-v1`.

Fixed by [nuxt/nuxt#36704](https://github.com/nuxt/nuxt/pull/36704). No issue was filed.

## Run it

From the branch root, with Node 24 and pnpm:

```sh
node verify.mjs
```

`verify.mjs` installs the fixture from its lockfile when `node_modules` is missing and clears `.nuxt` and the build cache in `node_modules/.cache/nuxt`. It sets `shared/utils/message.ts` to `'shared-v1'` and runs `nuxt build`, then sets it to `'shared-v2'` and runs `nuxt build` again. After each build it lists which markers appear in `.output/public/_nuxt` (client) and `.output/server` (server), and after the second build it fetches `/` from the built server. It puts `message.ts` back at the end. It exits 1 while the bug is present and 2 when a check is inconclusive.

Output on 2026-10-24 with Node 24.21.0 and pnpm 11.28.5, exit code 1:

```text
nuxt-build-cache-shared-dir
  Nuxt 5.0.0-2610241346-9f02a3d (with Nitro 3.0.260903-beta, Vite 8.3.5 and Vue 3.5.44)
  build 1, shared/utils/message.ts = 'shared-v1': client shared-v1; server shared-v1
  build 2, shared/utils/message.ts = 'shared-v2': cache hit; client shared-v1; server shared-v2; SSR HTML shared-v2
  FAIL: the client bundle ships shared-v1 instead of shared-v2
```

Expected: the second build misses the cache and both bundles ship `shared-v2`.

## What each part is for

- `shared/utils/message.ts` is the edited file. `shared/utils` is auto-imported in both the app and the server.
- `app/app.vue` renders the value. It has to be in `app/`. The cache key hashes each layer's `srcDir`, and with `app/` present `srcDir` is `app/`, so `shared/` at the root is outside it. With `app.vue` at the root instead, `srcDir` is the root, `shared/` is hashed, and the second build misses the cache as it should.
- `nuxt.config.ts` turns on `experimental.buildCache`, the variable. A config file also matters: without one, Nuxt adds a fallback layer whose `srcDir` is the root.
- `pnpm-workspace.yaml` lets pnpm install the nightly packages. pnpm 11 refuses packages younger than a day by default, and they were less than a day old when this was written.

## Cause

`getVueHash` in `packages/nuxt/src/core/cache.ts` hashes each local layer's `srcDir` and a fixed list of root files such as `package.json` and the lockfiles. `shared/` is resolved from the layer root (`dir.shared`), so with an `app/` directory it is in neither. A cache hit then skips the client build and restores the old client, while Nitro and the ssr environment still build from the edited source.
