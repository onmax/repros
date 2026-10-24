# Nuxt: auto-imported `definePageMeta` survives production tree-shaking

Nuxt's defaults list `definePageMeta` in `optimization.treeShake.composables` for the client and the server. In a production build, `nuxt:tree-shake-composables` should rewrite each call to `false && /*@__PURE__*/ definePageMeta({...})` so the bundler drops it. Nuxt has already copied the meta into the route table at build time, so the call in the page is dead code.

For an auto-imported call that rewrite never happens. Each page chunk in `.output` keeps the call and its import:

```
.output/public/_nuxt/Cy6QxQUY.js
    import { t as definePageMeta } from "./BT-URSiP.js";
    definePageMeta({ reproLabel: "index" });
.output/server/_ssr/pages-DJG1VeCL.mjs
    import { definePageMeta } from "./pages-le7QEBkZ.mjs";
    definePageMeta({ reproLabel: "index" });
```

A search of nuxt/nuxt issues, PRs and discussions on 2026-10-24 found no report of it. It turned up while measuring build time on a generated 12-layer Nuxt app.

## Run

```sh
git clone --depth 1 --branch repro/nuxt-definepagemeta-treeshake https://github.com/onmax/repros.git
cd repros/nuxt-definepagemeta-treeshake
pnpm install --frozen-lockfile && pnpm verify
cd ../nuxt-definepagemeta-treeshake-fix
pnpm install --frozen-lockfile && pnpm verify
```

`pnpm verify` runs `nuxt build`, reads every chunk in `.output/public/_nuxt` and `.output/server`, and prints one row per page:

```
nuxt-nightly@5.0.0-2610221052-8c52432, nuxt build, client chunks unminified

page                  call            written as                client   server
index.vue             definePageMeta  auto-import               kept     kept
second.vue            definePageMeta  auto-import               kept     kept
from-imports.vue      definePageMeta  import from '#imports'    kept     kept
prehydrate-auto.vue   onPrehydrate    auto-import               kept     -
prehydrate-app.vue    onPrehydrate    import from '#app'        removed  -   (control)

Expected: "removed" in every listed cell. "-" means the defaults don't list the composable there.
Route table: all 3 definePageMeta pages keep their meta, client and server.
```

Then it prints each kept call next to the import of the same name in that chunk. It exits 1 while a listed call survives. It exits 2 if the build fails, a page is missing, a page's meta is missing from the route table, or the control is kept. In `nuxt-definepagemeta-treeshake-fix/` the same command prints `removed` in every listed cell and exits 0.

## What each page tests

- `index.vue` and `second.vue` call auto-imported `definePageMeta`. This is the claim.
- `from-imports.vue` imports it from `#imports` and fails the same way.
- `prehydrate-auto.vue` and `prehydrate-app.vue` call `onPrehydrate`, which the client defaults also list under `#app`. The auto-imported call stays. The call imported from `#app` goes, which shows that the plugin runs and that its lookup works when the import path equals the key.

There is no page with `import { definePageMeta } from '#app'`. `#app` doesn't export `definePageMeta`, so that page fails the build:

```
[MISSING_EXPORT] "definePageMeta" is not exported by "node_modules/.pnpm/nuxt-nightly@5.0.0-2610221052-8c52432_…/node_modules/nuxt-nightly/dist/app/index.js".
```

The default `'#app': [..., 'definePageMeta']` therefore can't match any import that builds.

## Why it happens

`nuxt:imports-transform` and `nuxt:tree-shake-composables:transform` are both `enforce: 'post'`. Nuxt registers the imports transform while it sets up its imports module and the tree-shake plugin later, in a `modules:done` hook, so the imports transform runs first. When the tree-shake plugin parses the page, unimport has already added this line:

```js
import { definePageMeta } from '#app/composables/pages';
```

The plugin finds that import for the callee and looks the composable up by import path:

```js
const isFromAllowedPath = importPath === '#imports'
  ? allComposableNames.has(importedName)
  : options.composables[importPath]?.includes(importedName)
```

The defaults only have the keys `vue` and `#app`. `options.composables['#app/composables/pages']` is `undefined`, and the plugin leaves the call alone. The `#imports` branch never runs in a real build either, because unimport rewrites `import ... from '#imports'` into the same `#app/composables/pages` import before the plugin sees it. The plugin's unit tests in `packages/nuxt/test/tree-shake.test.ts` pass `vue` and `#imports` imports to it directly, so they pass.

The `vue` entries work because unimport writes `from 'vue'` for them. All four `#app` entries miss:

| composable | listed for | auto-imported from |
|---|---|---|
| `definePageMeta` | client, server | `#app/composables/pages` |
| `onPrehydrate` | client | `#app/composables/ssr` |
| `definePayloadReducer` | client | `#app/composables/payload` |
| `definePayloadReviver` | server | `#app/composables/payload` |

The payload pair misses the same lookup. They usually live in a plugin, though, and a plugin lands in the entry chunk next to `payload.js`, where Rolldown removes the empty call on its own. The output looks right, so the fixture leaves them out.

Pinned build, `nuxt-nightly@5.0.0-2610221052-8c52432`:

- `nuxt-nightly/dist/index.mjs:7765` is the lookup in `TreeShakeComposablesPlugin`, which starts at line 7731.
- `nuxt-nightly/dist/index.mjs:5958` is `nuxt:imports-transform`, registered at line 6061. The tree-shake plugins are registered at lines 9400 and 9401, inside the `modules:done` hook at line 9387.
- `nuxt-nightly/dist/index.mjs:1821-1823` is the `definePageMeta` preset, from `#app/composables/pages`.
- `@nuxt/schema-nightly/dist/index.mjs:338` and `346` are the `#app` defaults for server and client.

`nuxt/nuxt` main at `2a81d4a`, 2026-10-23:

- `packages/nuxt/src/core/plugins/tree-shake.ts:78-80` is the lookup. Line 102 has `// TODO: validate function name against actual auto-imports registry`.
- `packages/schema/src/config/build.ts:112` and `122` are the defaults.
- `packages/nuxt/src/pages/module.ts:38` and `packages/nuxt/src/imports/presets.ts:70` and `86` are the auto-import paths.
- `packages/nuxt/src/imports/module.ts:130` and `packages/nuxt/src/core/nuxt.ts:501-525` set the order.

The latest nightly, `nuxt-nightly@5.0.0-2610231503-2a81d4a`, is built from that main commit. Its tarball has the same code at the same lines. That was read from the tarball. The verifier ran on the pinned build only.

From the git history, not run: nuxt/nuxt#33128, first released in v4.1.1, replaced a regex that matched `definePageMeta(` regardless of imports with this import-path lookup. The auto-import paths never matched `#app`. `onPrehydrate` and the payload pair already came from `#app/composables/*`, and `definePageMeta` came from an absolute path until nuxt/nuxt#33453 moved it to `#app/composables/pages`.

## Why two pages

With one page the call disappears anyway and the fixture passes. Rolldown 1.2.15 removes a call to an empty function in its per-chunk `dce-only` pass, the one Vite runs when minification is off and for SSR, but only when the function's body sits in the same chunk. With one caller, the module that declares `definePageMeta` lands in the page's chunk. With two, it moves to a shared chunk and both calls stay.

Rolldown's link stage can mark such calls pure across chunks. It does that for `export const f = () => {}`, but not for `const f = () => {}` exported later with `export { f }`, which is how Nuxt's dist declares `definePageMeta`. Real apps have more than one page, so they hit the bug.

## Why `minify: false`

It keeps names in client chunks, so the check can find `definePageMeta(`. The tree-shake plugin works the same either way. In the default minified build the client column reads `removed`, but the calls are still there under mangled names, for example ``r({reproLabel:`index`})``. Server chunks are unminified by default.

## The fix control

`nuxt-definepagemeta-treeshake-fix/` has the same app, config and verifier. It adds one `pnpm patch`, `patches/@nuxt__schema-nightly@5.0.0-2610221052-8c52432.patch`, which adds the paths unimport writes to the defaults in `@nuxt/schema-nightly/dist/index.mjs`:

```js
// server
'#app/composables/pages': ['definePageMeta'],
'#app/composables/payload': ['definePayloadReviver'],
// client
'#app/composables/pages': ['definePageMeta'],
'#app/composables/payload': ['definePayloadReducer'],
'#app/composables/ssr': ['onPrehydrate'],
```

The `'#app'` keys stay, for explicit imports from the `#app` barrel. With the patch every listed cell reads `removed`, the route table keeps each page's meta, and the verifier exits 0.

The plugin's exact lookup is intended. In harlan-zw/nuxt-schema-org#175 (2026-10-08), danielroe wrote "we now require keys to match the injected import sources", so it's the defaults that are out of date. The same change against nuxt/nuxt main is on the `fix/tree-shake-app-subpaths` branch of `onmax/nuxt`. It changes `packages/schema/src/config/build.ts` and `docs/4.api/6.nuxt-config.md`. Its test in `packages/nuxt/test/tree-shake.test.ts` runs Nuxt's own presets through unimport, then the plugin with the schema defaults.

## Workaround

Until a fix ships, an app can add the same keys to its own config. Nuxt merges them with its defaults:

```ts
optimization: {
  treeShake: {
    composables: {
      client: { '#app/composables/pages': ['definePageMeta'], '#app/composables/ssr': ['onPrehydrate'] },
      server: { '#app/composables/pages': ['definePageMeta'] },
    },
  },
},
```

This config was the `-fix` control in commit `3f78c19`, and it passed the same verifier.

## Environment

- `nuxt` is `npm:nuxt-nightly@5.0.0-2610221052-8c52432`, with Nitro 3.0.260903-beta, Vite 8.3.5, Rolldown 1.2.15, `@vitejs/plugin-vue` 6.0.10, Vue 3.5.44 and unimport 7.0.2.
- `pnpm-workspace.yaml` pins `@nuxt/cli` to `@nuxt/cli-nightly@4.0.1-2610152140-ad8153a`, because `nuxt-nightly` asks for `@latest`.
- Node 24.21.0, pnpm 11.28.5.
- `pnpm-lock.yaml` is the lockfile from the build-time study, with exact versions for the direct dependencies.
