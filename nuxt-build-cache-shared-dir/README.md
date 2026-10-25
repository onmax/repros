# Nuxt build cache ships a stale client after a `shared/` edit

With `experimental.buildCache: true`, editing a file in `shared/` doesn't rebuild the client. The second build logs `Restored Vue client and server builds from cache`. The client bundle keeps the old value, but the server bundle gets the new one. So the server renders `shared-v2`, and the client hydrates with `shared-v1`.

Fixed by [nuxt/nuxt#36704](https://github.com/nuxt/nuxt/pull/36704). There is no issue for it.

The fixture uses `nuxt-nightly@5.0.0-2610241346-9f02a3d`, built from nuxt/nuxt main at `9f02a3d`. Its `packages/nuxt/src/core/cache.ts` matches main at `bf4220d6e`. The rest of the stack is Nitro 3.0.260903-beta, Vite 8.3.5 and Vue 3.5.44 on Node 24.

## Run it

From the branch root, with Node 24 and pnpm:

```sh
node verify.mjs
```

The script:

1. Installs the fixture from its lockfile if `node_modules` is missing.
2. Clears `.nuxt` and the build cache in `node_modules/.cache/nuxt`.
3. Sets `shared/utils/message.ts` to `'shared-v1'` and runs `nuxt build`.
4. Sets it to `'shared-v2'` and runs `nuxt build` again.
5. After each build, lists the markers it finds in the client bundle, `.output/public/_nuxt`, and in the server bundle, `.output/server`. After the second build, it also fetches `/` from the built server.
6. Puts `message.ts` back to `'shared-v1'`.

It exits 1 while the bug is present and 2 when a check is inconclusive.

Output on 2026-10-24 with Node 24.21.0 and pnpm 11.28.5, exit code 1:

```text
nuxt-build-cache-shared-dir
  Nuxt 5.0.0-2610241346-9f02a3d (with Nitro 3.0.260903-beta, Vite 8.3.5 and Vue 3.5.44)
  build 1, shared/utils/message.ts = 'shared-v1': client shared-v1; server shared-v1
  build 2, shared/utils/message.ts = 'shared-v2': cache hit; client shared-v1; server shared-v2; SSR HTML shared-v2
  FAIL: the client bundle ships shared-v1 instead of shared-v2
```

The second build should miss the cache and ship `shared-v2` in both bundles.

## Why each file is here

- `shared/utils/message.ts` is the file the script edits. Nuxt auto-imports `shared/utils` in both the app and the server.
- `app/app.vue` renders the value, and it has to live in `app/`. The cache key hashes each layer's `srcDir`. When `app/` exists, `srcDir` is `app/`, so the root `shared/` falls outside it. Move `app.vue` to the root and `srcDir` becomes the root. Then `shared/` gets hashed, and the second build misses the cache as it should.
- `nuxt.config.ts` turns on `experimental.buildCache`, the one setting under test. The file itself matters too. Without a config file, Nuxt adds a fallback layer whose `srcDir` is the root, and that hides the bug.
- `pnpm-workspace.yaml` lets pnpm install the nightly packages. pnpm 11 refuses packages younger than a day by default, and these were that new on 2026-10-24.

## Cause

`getVueHash` in `packages/nuxt/src/core/cache.ts` builds the cache key from each local layer's `srcDir` and a fixed list of root files, such as `package.json` and the lockfiles. Nuxt resolves `shared/` from the layer root through `dir.shared`. With an `app/` directory, that puts it in neither. On a cache hit, Nuxt skips the client build and restores the old client. Nitro and the ssr environment still build from the edited source.
