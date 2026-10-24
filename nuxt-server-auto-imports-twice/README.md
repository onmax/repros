# Nuxt 5 runs `nuxt:server-auto-imports` twice in the nitro environment

Given `nuxt-nightly@5.0.0-2610221052-8c52432` with Nitro 3.0.260903-beta, Vite 8.3.5, Rolldown 1.2.15 and unplugin 3.4.0, on Node 24 with the default `experimental.nitroViteEnvironment`, `nuxt build` should run `nuxt:server-auto-imports` once in the nitro environment. That copy should also leave the SSR service chunks in `.nuxt/vite/services/` alone, because the `ssr` environment already ran them through the app's auto-imports. Instead, two copies are active. Rolldown calls both for each of the 153 modules in the nitro build, and both run `injectImports` on the 16 service chunks it loads. Only the first copy changes any code.

No upstream issue exists yet. A build-performance study of a generated 12-layer app found it. Rolldown's `PLUGIN_TIMINGS` for that app's nitro build listed `nuxt:server-auto-imports transform` twice, at 1.5 s and 4,497 calls each, in a 7.0 s build. Dropping one copy and skipping the service chunks took the step to 3.4 s, and all 8,262 files in `.output` stayed the same after normalizing.

## Run it

From the branch root, with Node 24 and pnpm:

```sh
node verify.mjs
```

`verify.mjs` installs each fixture from its lockfile when `node_modules` is missing, runs `nuxt build`, reads the report that `inspect-server-auto-imports.ts` writes, and compares the two `.output` trees. It exits 1 while the bug is present and 2 when a check is inconclusive. `node verify.mjs nuxt-server-auto-imports-twice-fix` checks only the fixed control and exits 0.

Output on 2026-10-24 with Node 24.21.0 and pnpm 11.28.5, exit code 1:

```text
nuxt-server-auto-imports-twice
  Nuxt 5.0.0-2610221052-8c52432 (with Nitro 3.0.260903-beta, Vite 8.3.5 and Vue 3.5.44); nitro build: 153 modules
  expected: 1 active nuxt:server-auto-imports in the nitro environment, transforming no id under .nuxt/vite/services/
  actual:   2 active
    #1 position 39, from build.rolldownOptions.plugins: 153 transform calls, 22 ids transformed, 16 of them under .nuxt/vite/services/; changed: server/api/hello.ts
    #2 position 55, from config.plugins: 153 transform calls, 22 ids transformed, 16 of them under .nuxt/vite/services/; changed: nothing
  FAIL: 2 active instances; 2 transform .nuxt/vite/services/ ids

nuxt-server-auto-imports-twice-fix
  Nuxt 5.0.0-2610221052-8c52432 (with Nitro 3.0.260903-beta, Vite 8.3.5 and Vue 3.5.44); nitro build: 153 modules
  expected: 1 active nuxt:server-auto-imports in the nitro environment, transforming no id under .nuxt/vite/services/
  actual:   1 active
    #1 position 39, from build.rolldownOptions.plugins: 153 transform calls, 6 ids transformed, 0 of them under .nuxt/vite/services/; changed: server/api/hello.ts
  PASS

.output of nuxt-server-auto-imports-twice vs nuxt-server-auto-imports-twice-fix, after normalizing
files 63 | normalized-equal 63 | different 0
```

## What each part is for

- `app/pages/index.vue` and `server/api/hello.ts` are the one page and the one server route. The route calls `greeting()` from `server/utils/greeting.ts` without importing it. The verifier requires a copy to inject that import, which proves it watches the plugin that does the work. The symptom doesn't need the page.
- `inspect-server-auto-imports.ts` only observes. Before Nitro builds any environment, it wraps the transform hook of each `nuxt:server-auto-imports` in the nitro environment. It records the ids each copy accepts with its own `transformInclude`, and the ids it changes.
- `buildDir: '.nuxt'` pins the layout of a fresh checkout. Once `.nuxt` exists, `nuxt build` moves to `node_modules/.cache/nuxt/.nuxt`, and the plugin's own `node_modules` exclude then skips the service chunks. Both copies stay active in that layout, and Rolldown still calls both for every module.
- `buildId: 'repro'` is there only so `compare-output.mjs` can compare the two `.output` trees.
- `pnpm-lock.yaml` comes from the study's build, minus two dev dependencies, so every version matches what it measured. pnpm 11 refuses packages younger than a day by default, and `httpxy@0.5.6` was less than a day old when this was written, so `pnpm-workspace.yaml` allows it.

## Cause

- `@nuxt/nitro-server-nightly` registers the plugin twice. `dist/index.mjs:2851` pushes `ServerAutoImportsPlugin.rollup()` into `nitroConfig.rollupConfig.plugins`, and `dist/index.mjs:2852-2855` adds `ServerAutoImportsPlugin.vite()` to `vite.plugins` with `applyToEnvironment: env => env.name === 'nitro'`. The plugin's comment says it is registered on both "as either may build the server bundle depending on `experimental.nitroViteEnvironment`". On nuxt/nuxt main at `2a81d4a`, the same code is in `packages/nitro-server/src/index.ts:743-752`.
- Nitro hands `rollupConfig` to the nitro environment as well. `getBundlerConfig` in `nitro/dist/vite.mjs:33-42` merges it into the Rolldown options with defu, and `createNitroEnvironment` in `nitro/dist/_build/vite.env.mjs:35` sets those as `build.rolldownOptions`. Vite 8 turns an environment's `build.rolldownOptions.plugins` into active plugins through `vite:rollup-options-plugins`, in `vite/dist/node/chunks/node.js:34675`. Nitro main at `6bccaad1` does the same in `src/build/vite/bundler.ts:54` and `src/build/vite/env.ts:23`.
- The include regex `/\.[cm]?[jt]sx?$/` matches the service chunks. The plugin excludes only `node_modules` and `.git`, in `dist/index.mjs:1136-1137`.

## Fixed control

`nuxt-server-auto-imports-twice-fix/` is the same app with a `pnpm patch` of `@nuxt/nitro-server-nightly@5.0.0-2610221052-8c52432`. The patch registers only the Rollup copy and excludes `<buildDir>/vite/services/` from the plugin.

The patch keeps the Rollup copy because Nitro also builds prerendered routes, in a separate Rolldown build from the same `rollupConfig`. Removing the Rollup copy breaks that build. With `nitro.prerender.routes: ['/api/hello']`, it fails with `ReferenceError: greeting is not defined`. I checked that once by hand, and it isn't part of the fixtures.

`compare-output.mjs` adapts the study's comparison, which normalizes timestamps, public-asset order and the hashed names that follow from them. Three more normalizations cover what differs because the fixtures sit in different directories, or because one package is patched:

- pnpm store directory names in module comments,
- Nitro's handler import names, which hash the handler's absolute path,
- source-map columns that point into Nitro's virtual modules, which import by absolute path.

Built from a second directory, the unpatched app shows the same handler-name and map-column differences, so none of them comes from the patch.

## Also checked

- On 2026-10-24, `nuxt-nightly@5.0.0-2610231503-2a81d4a`, which is nuxt/nuxt main, still runs both copies with `nitro` overridden to `nitro-nightly@3.0.1-20261024-005652-6bccaad1`, which is nitrojs/nitro main. They sit at positions 40 and 58, and each transforms 16 service chunks.
- Nuxt registers its server import protection the same way, in `packages/nitro-server/src/index.ts:656-667` on main. The nitro environment lists both `impound` and `nuxt:server-import-protection:impound`. I didn't measure what that costs.
