# Nuxt build cache hit links a stylesheet for page CSS that is already inlined

Given `nuxt-nightly@5.0.0-2610231503-2a81d4a` (nuxt/nuxt main at `2a81d4a`) with Nitro 3.0.260903-beta, Vite 8.3.5, Rolldown 1.2.15 and Vue 3.5.44, on Node 24 with `experimental.buildCache: true`, a build that hits the cache should render the same HTML as the cold build it restores. The cold build inlines the page's scoped style and links no stylesheet. On a cache hit, the HTML still inlines the style but also links `pages.<hash>.css`, which holds the same CSS.

Fixed by [nuxt/nuxt#36692](https://github.com/nuxt/nuxt/pull/36692). No issue was filed.

## Run it

From the branch root, with Node 24 and pnpm:

```sh
node verify.mjs
```

For each fixture, `verify.mjs` installs it from its lockfile when `node_modules` is missing and clears `.nuxt` and the build cache in `node_modules/.cache/nuxt`. It runs `nuxt build` with no cache, deletes `.output`, and runs `nuxt build` again, which must log `Restored Vue client and server builds from cache`. After each build, it starts `.output/server/index.mjs` and fetches `/`. It exits 1 while the bug is present and 2 when a check is inconclusive, for example when the second build misses the cache. `node verify.mjs nuxt-build-cache-inlined-css` checks only this fixture.

Output on 2026-10-24 with Node 24.21.0 and pnpm 11.28.5, exit code 1:

```text
nuxt-build-cache-inlined-css
  Nuxt 5.0.0-2610231503-2a81d4a (with Nitro 3.0.260903-beta, Vite 8.3.5 and Vue 3.5.44)
  cold build:      inline style yes; stylesheet links: none
  cache-hit build: inline style yes; stylesheet links: <link rel="stylesheet" href="/_nuxt/pages.BdpR6gaj.css" crossorigin>
  FAIL: the cache-hit HTML differs from the cold HTML, only by its stylesheet links

nuxt-build-cache-inlined-css-fix
  Nuxt 5.0.0-0 (with Nitro 3.0.260903-beta, Vite 8.3.5 and Vue 3.5.44)
  cold build:      inline style yes; stylesheet links: none
  cache-hit build: inline style yes; stylesheet links: none
  PASS
```

## What each part is for

- `app/pages/index.vue` has the scoped style. It has to be in a page. A page's CSS is not part of the entry, so the server decides on each request whether to drop the page's stylesheet link because the page inlined its styles. With the same style in `app.vue` and no pages, the cache-hit HTML matches the cold build.
- `app/app.vue` renders the page.
- `experimental.buildCache: true` is the variable. The bug is only on a cache hit.

## Cause

A cache hit skips the client build. The ssr build still reads state the client build leaves in memory: the maps in the `ssr-styles` plugin, the entry file name in `stable-entry`, and the raw client manifest that `build:manifest` finalises. On main, the cache replays only the final `clientManifest`, `clientPrecomputed` and `entryChunkName` strings, in `packages/nuxt/src/core/cache.ts`. The ssr build sees empty `ssr-styles` maps and emits no `inlinedCSS` conditions, so the renderer keeps the page's stylesheet link.

## Fixed control

`nuxt-build-cache-inlined-css-fix/` is the same app with `nuxt` from pkg.pr.new at `c560a27`, the head of nuxt/nuxt#36692. The PR branches from `2a81d4a`, the commit this fixture's nightly was built from. The PR's `nuxt` package loads `@nuxt/kit`, `@nuxt/schema`, `@nuxt/vite-builder`, `@nuxt/vite-server` and `@nuxt/nitro-server` from pkg.pr.new at the same commit. pnpm 11 refuses URL dependencies inside dependencies by default, so that fixture's `pnpm-workspace.yaml` sets `blockExoticSubdeps: false`. Its lockfile started from this fixture's lockfile, and Vite, Rolldown, Nitro, Vue, unhead and vue-bundle-renderer resolve to the same versions in both.
