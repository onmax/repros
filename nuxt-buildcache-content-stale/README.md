# Nuxt build cache serves stale `@nuxt/content` after a Markdown edit

With `experimental.buildCache: true` and `@nuxt/content`, editing a Markdown file doesn't
invalidate the cache. The second build logs `Restored Vue client and server builds from cache` and
ships the previous content. Deployed to an empty folder, its server renders the old text, its
content query API (what client-side navigation reads) returns the old text, and the client bundle
keeps the old content checksum. The same tree built without the cache is correct.

There is no issue for it yet. A related bug, [nuxt/nuxt#36704](https://github.com/nuxt/nuxt/pull/36704)
(`shared/` outside the cache hash), is fixed. Content's files have the same problem and are still
outside the hash.

The fixture uses `nuxt-nightly@5.0.0-2610291341-744179a` and `@nuxt/content@3.16.2`. The rest of
the stack, from the lockfile, is Nitro 3.0.260903-beta, Vite 8.3.5, Rolldown 1.2.16 and Vue 3.5.44,
on Node 24. The cache code it exercises (`packages/nuxt/src/core/cache.ts`) is the same on nuxt/nuxt
`main` and `4.x` as of 2026-11-01.

## Run it

From the branch root, with Node 24 and pnpm:

```sh
node verify.mjs
```

The script:

1. Installs the fixture from its lockfile if `node_modules` is missing.
2. Clears `.nuxt`, `.data` and the build cache in `node_modules/.cache/nuxt`.
3. Sets `content/index.md` to `report-v1` and runs `nuxt build`.
4. Sets it to `report-v2` and runs `nuxt build` again.
5. As a control, builds the same edited tree without the cache (`NO_BUILD_CACHE=1`).
6. After each build, reads the content checksum in the client bundle (`.output/public/_nuxt`),
   copies `.output` to an empty folder, starts the server, fetches `/`, and posts the query the
   client sends for `/` to `/__nuxt_content/content/query`.
7. Puts `content/index.md` back to `report-v1`.

It exits 1 while the bug is present and 2 when a check is inconclusive, including when the control
build doesn't ship `report-v2`.

Output on 2026-11-01 from a fresh clone, Node 24.21.0 and pnpm 12.16.1, exit code 1:

```text
nuxt-buildcache-content-stale
  Nuxt 5.0.0-2610291341-744179a (with Nitro 3.0.260903-beta, Vite 8.3.5 and Vue 3.5.44)
  build 1, content/index.md = 'report-v1': cache miss; client checksum v3.5.0--h3f3GMge5uqy9WEqNutnUe2HFOkPelpW3yu2Mrn3Aqg; deployed SSR HTML report-v1; deployed content API report-v1
  build 2, content/index.md = 'report-v2': cache hit; client checksum v3.5.0--h3f3GMge5uqy9WEqNutnUe2HFOkPelpW3yu2Mrn3Aqg; deployed SSR HTML report-v1; deployed content API report-v1
  control, same tree, NO_BUILD_CACHE=1: cache miss; client checksum v3.5.0--3NiQhFFfb9qjz2TsSt1cp_gZzFRUot5Ai6lKUq3_DrM; deployed SSR HTML report-v2; deployed content API report-v2
  FAIL: the deployed content API answers report-v1 instead of report-v2; the client bundle keeps the checksum of build 1
```

The second build should miss the cache, or at least ship `report-v2` and the new checksum like the
control.

## Why each file is here

- `content/index.md` is the file the script edits.
- `app/app.vue` queries the page and renders it with `ContentRenderer`, and it has to live in
  `app/`. The cache key hashes each layer's `srcDir`. When `app/` exists, `srcDir` is `app/`, so the
  root `content/` falls outside it. Moving `app.vue` to the root makes `srcDir` the root: `content/`
  is hashed and the second build misses the cache as it should (the script prints `PASS`). The query
  is also what puts the content checksum into the client bundle.
- `nuxt.config.ts` adds `@nuxt/content` and turns on `experimental.buildCache`, the setting under
  test. `NO_BUILD_CACHE` exists only for the control. `sqliteConnector: 'native'` uses Node's
  built-in SQLite. Without it, Content requires the native `better-sqlite3` package and the build
  stops.

## Cause

`getVueHash` in `packages/nuxt/src/core/cache.ts` builds the cache key from each local layer's raw
config, its `srcDir` and `shared/` files, and a fixed list of root files. Content reads `content/`
and `content.config.*`, which are in none of these. The key is computed at `modules:before`, before
any module adds templates, so the templates Content generates from those files can't be part of it
either.

On a hit, `restoreCacheFromFile(buildDir, …)` writes the cached `.nuxt` over the templates this
build just generated. It skips only files with the same size and a newer mtime. Content's
`content/manifest.ts` (checksums) and `content/database.compressed.mjs` (the SQL dump Nitro bundles)
go back to the previous build's versions, and the client is restored from the cache.
