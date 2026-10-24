# Nuxt 4.3 and later put the absolute module path into auto-generated keys

Given `nuxt@4.6.2` with Nitro 2.13.5, Vite 8.3.5 and Vue 3.5.44 on Node 24, building the same app from two directories should inject the same key into each keyless `useAsyncData`, `useFetch` and `useState` call, so both builds produce the same client output. Instead, every key differs. `nuxt:compiler:keyed-functions` hashes the absolute module id, so moving the checkout renames each page chunk that contains a key, and the entry chunk that imports them.

That breaks reproducible builds and build caches shared across machines or checkouts. Two CI runners with different workspace paths build different `_nuxt/*.js` files from the same commit. Deploying from one and then the other makes browsers download chunks whose code didn't change.

The bug turned up in a build comparison on the `repro/nuxt-server-auto-imports-twice` branch of this repository, where `useFetch('/api/hello')` got `$-lJGjnHvGJ` in one directory and `$TkrLcPuxQX` in the other. A search of nuxt/nuxt issues on 2026-10-24 found no report of it.

## Run it

With Node 24 and pnpm 11:

```sh
git clone --branch repro/nuxt-keyed-functions-absolute-path https://github.com/onmax/repros.git
cd repros
node verify.mjs
```

For each fixture, `verify.mjs` copies the fixture and `layer/` into two checkouts, `.repro/checkouts/<fixture>/a/` and `.repro/checkouts/<fixture>/second-checkout/`. It installs each copy from the fixture's lockfile and runs `nuxt build`. Then it compares the key injected for each call, checks that no key repeats within a build, and compares every file in `.output/public`. It exits 1 while keys or client files differ, and 2 when a check is inconclusive. `node verify.mjs nuxt-keyed-functions-absolute-path-fix` checks only the fixed control and exits 0.

The unpatched keys depend on where the branch is checked out, so yours will differ from the ones below. The patched keys are the same on every machine.

Output on 2026-10-24 with Node 24.21.0 and pnpm 11.28.5, exit code 1:

```text
nuxt-keyed-functions-absolute-path
  Nuxt 4.6.2 (with Nitro 2.13.5, Vite 8.3.5 and Vue 3.5.44)
  A: .repro/checkouts/nuxt-keyed-functions-absolute-path/a/nuxt-keyed-functions-absolute-path
  B: .repro/checkouts/nuxt-keyed-functions-absolute-path/second-checkout/nuxt-keyed-functions-absolute-path
  expected: the same key for each call in A and B, distinct keys, the same .output/public
  injected keys:
    ../layer/app/pages/item.vue #1  A $OH42cXv0av  B $mOrbyaPeHk  DIFFERENT
    app/pages/index.vue #1          A $LcRr6CGYyl  B $LGkeZJI169  DIFFERENT
    app/pages/record.vue #1         A $XjC26aSITx  B $53aqAF4qce  DIFFERENT
    app/pages/record.vue #2         A $hGmkxfIYQi  B $LY1LVPYEJT  DIFFERENT
  actual: 4 of 4 keys differ between A and B; keys are distinct within each build
  .output/public: 13 files in A, 13 in B; 4 only in A, 4 only in B, 0 changed
    _nuxt/DoXx2mKj.js only in A
    _nuxt/coRqXB16.js only in A
    _nuxt/l6kPjuZm.js only in A
    _nuxt/lKcv2xFF.js only in A
    _nuxt/Bdz_R6fE.js only in B
    _nuxt/CXMC6fY9.js only in B
    _nuxt/DJX6aVHE.js only in B
    _nuxt/Dr_M8Ra4.js only in B
  FAIL: 4 of 4 keys differ between A and B; .output/public differs

nuxt-keyed-functions-absolute-path-fix
  Nuxt 4.6.2 (with Nitro 2.13.5, Vite 8.3.5 and Vue 3.5.44)
  A: .repro/checkouts/nuxt-keyed-functions-absolute-path-fix/a/nuxt-keyed-functions-absolute-path-fix
  B: .repro/checkouts/nuxt-keyed-functions-absolute-path-fix/second-checkout/nuxt-keyed-functions-absolute-path-fix
  expected: the same key for each call in A and B, distinct keys, the same .output/public
  injected keys:
    ../layer/app/pages/item.vue #1  A $Vkf5N64NdN  B $Vkf5N64NdN  same
    app/pages/index.vue #1          A $QD8d9NkvSp  B $QD8d9NkvSp  same
    app/pages/record.vue #1         A $y035APBOJm  B $y035APBOJm  same
    app/pages/record.vue #2         A $SK_kjdQRjc  B $SK_kjdQRjc  same
  actual: 0 of 4 keys differ between A and B; keys are distinct within each build
  .output/public: 13 files in A, 13 in B; 0 only in A, 0 only in B, 0 changed
  PASS
```

Four files get a different name in each checkout: the three page chunks, and the entry chunk, which imports the pages by file name.

## What each part is for

- `app/pages/index.vue` is the trigger, one page with one `useAsyncData` call and no key. An app with only this page already builds different client chunks in the two directories.
- `app/pages/record.vue` repeats the same call and adds a keyless `useState`, which the verifier lists as `#1` and `#2`. `../layer/app/pages/item.vue` repeats the call from a layer outside `rootDir`. These pages let the verifier check what a fix has to keep. Each call and each file needs its own key, and a layer file needs a key that doesn't change between checkouts.
- `record-injected-keys.ts` only observes. It runs after `nuxt:compiler:keyed-functions` and writes each key that plugin injected to `.repro/injected-keys.json`, per Vite environment and module. The verifier also requires each client key to appear in `.output/public`, and the client and ssr keys of a call to match. The verifier prints module ids without their `?vue&type=script&setup=true&lang.ts` query.
- `buildId: 'repro'` replaces Nuxt's random build id, which names `_nuxt/builds/meta/<id>.json`. Without it, no two builds have the same client output.
- `allowBuilds` in `pnpm-workspace.yaml` declines esbuild's install script. Without it, pnpm 11 exits 1 because it skipped an unapproved script. esbuild's binary comes from its platform package.

## Cause

Each key is ``'$' + hash(`${id}-${n}`).slice(0, 10)``, with `hash` from `ohash`. `id` is the absolute id of the module Vite transforms, and `n` counts the keyless calls in that module. For `app/pages/index.vue` in checkout A, `id` is `<checkout A>/app/pages/index.vue?vue&type=script&setup=true&lang.ts`. Hashing the ids of both checkouts this way gives all eight unpatched keys in the output above.

- On tag `v4.6.2`, `packages/nuxt/src/compiler/plugins/keyed-functions.ts:434` hashes `_id`, the absolute id. In the published `nuxt@4.6.2`, it is `dist/index.mjs:6948`. `packages/nuxt/src/compiler/module.ts:58-66` registers the plugin without `rootDir`.
- On nuxt/nuxt main at `2a81d4a`, the same code is at `packages/nuxt/src/compiler/plugins/keyed-functions.ts:395`, and `packages/nuxt/src/compiler/module.ts:58-64` registers it. `nuxt-nightly@5.0.0-2610231503-2a81d4a`, built from that commit, has it at `dist/index.mjs:6913`.

Up to 4.2.2, `nuxt:composable-keys` hashed the id relative to `rootDir`. Tag `v4.2.2` computes `relativeID = isAbsolute(id) ? relative(options.rootDir, id) : id` at `packages/nuxt/src/core/plugins/composable-keys.ts:54` and hashes it at `:114`, and `packages/nuxt/src/core/nuxt.ts:326` passes `rootDir: nuxt.options.rootDir`. Commit `d5a793d0f`, "refactor(nuxt): use AST-aware function key injection (#33446)" from 2025-12-23, replaced that plugin with `keyed-functions.ts` and dropped `relativeID`. Tag `v4.3.0` is the first release with it and hashes `_id` at `packages/nuxt/src/core/plugins/keyed-functions.ts:387`. The 3.x line changed in 3.21.0. Tag `v3.20.2` still hashes the relative id, while `v3.21.0` and `v3.21.11`, the latest 3.x release, hash `_id`.

## Fixed control

`nuxt-keyed-functions-absolute-path-fix/` is the same app with a `pnpm patch` of `nuxt@4.6.2`. The patch changes three lines in `dist/index.mjs`. It passes `rootDir: nuxt.options.rootDir` to the plugin and hashes `isAbsolute(_id) ? relative(options.rootDir, _id) : _id` again, as 4.2.2 did.

With the patch, each call gets the same key in both checkouts and the keys stay distinct. `.output/public` matches byte for byte, except the `timestamp` in `_nuxt/builds/latest.json` and `_nuxt/builds/meta/repro.json`, which also changes between two builds in one directory. The layer page hashes as `../layer/app/pages/item.vue?...`, so its key holds as long as the layer keeps its place relative to the app. A layer outside the repository, at a different relative path on each machine, would still get a different key. The four patched keys are the ones Nuxt 4.2.2 injects for this app.

## Also checked

- `nuxt-nightly@5.0.0-2610231503-2a81d4a`, with Nitro 3.0.260903-beta, Vite 8.3.5 and Vue 3.5.44, fails the same way. All four keys differ, the same four client files get new names, and `manifest.json` changes with them. With the same three-line patch to its `dist/index.mjs`, it passes with the same four keys as the fixed control. To rerun it, set the `nuxt` dependency to `npm:nuxt-nightly@5.0.0-2610231503-2a81d4a`. pnpm 11 refuses packages younger than a day, so on 2026-10-24 the install also needed exact `minimumReleaseAgeExclude` entries for that version of `nuxt-nightly` and its five `@nuxt/*-nightly` packages.
- `nuxt@4.2.2` and `nuxt@4.3.0`, both with Nitro 2.13.5 and Vite 7.3.7, built from two directories. `record-injected-keys.ts` looks for the `/* nuxt-injected */` marker, which 4.2.2 doesn't emit, so a throwaway script read the keys from the client chunks and diffed `.output/public` instead. 4.2.2 gives the same four keys in both directories, and the same client output. 4.3.0 gives four different keys and seven renamed chunks per build.
- Two clean builds of the unpatched app in one directory give the same keys and the same `.output/public`. The difference comes from the path.
- With the patch, `.output/server` still differs between the two directories, and none of it reaches `.output/public`. Nitro names handler imports after a hash of the handler's absolute path, `_lazy_<hash>` in `chunks/nitro/nitro.mjs` on 4.6.2 and in `index.mjs` on the nightly. On the nightly, source-map columns that point into Nitro's virtual modules move with the path as well. The rest also changes between two builds in one directory: public-asset mtimes, the etags of the two timestamped `builds/` files, and the order of public assets, of the SSR styles map and of the nightly's `precomputed` map.

Written by an AI agent, Claude Code, on 2026-10-24. A human has not reviewed it yet.
