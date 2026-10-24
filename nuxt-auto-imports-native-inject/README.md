# Nuxt: auto-imports through Rolldown's native `transform.inject`

`nuxt:imports-transform` adds Nuxt's auto-imports with unimport, in JS. Rolldown calls it for every module, because unplugin checks the plugin's `transformInclude` inside the JS handler, and unimport parses each module again with `parseSync` from `rolldown/utils`. Rolldown can do the same rewrite natively: `transform.inject` maps a free identifier to an import, with the API of `@rollup/plugin-inject`, and runs inside Rolldown's own Oxc transform. Vite 8 passes `build.rolldownOptions.transform` through per environment. On a generated 12-layer app, a build-time study measured 36.6 s with the JS plugin and 31.7 s with inject, averaged over interleaved runs.

This branch compares the two on one app with one verifier. The swap breaks a Nuxt plugin that assumes the JS rewrite has already happened. `nuxt:compiler:keyed-functions` only adds keys to `useState`, `useAsyncData` and `useFetch` calls whose callee is imported. With inject, an auto-imported callee is still a free identifier when that plugin runs, so the keys go missing. `useState()` and `useAsyncData()` without a key throw, and the page returns 500. That is this fixture.

`nuxt-auto-imports-native-inject-fix/` adds the study's workaround. It hands keyed-functions the imports unimport would have added and strips them afterwards. Then both builds key the same calls, render the same page and contain the same code.

I found no upstream issue or PR about this in nuxt/nuxt or unjs/unimport on 2026-10-24.

## Run

```sh
git clone --depth 1 --branch repro/nuxt-auto-imports-native-inject https://github.com/onmax/repros.git
cd repros/nuxt-auto-imports-native-inject
pnpm install --frozen-lockfile && pnpm verify
cd ../nuxt-auto-imports-native-inject-fix
pnpm install --frozen-lockfile && pnpm verify
```

`pnpm verify` generates layers into `lab/`, then builds the app with `REPRO_IMPORTS=unimport` and `REPRO_IMPORTS=inject` in alternating rounds, and copies each `.output` and build log to `out/`. Then it:

- prints each build's time, with the client, SSR and nitro times Vite reports;
- compares the first two unimport builds with each other, as a control for the normalizing, then the unimport build with the inject build;
- lists the key keyed-functions added to each call in `app/pages/index.vue`, and counts keys in all of `.output`;
- starts each build's server on port 3917 and requests `/`.

It exits 1 when the inject build differs from the unimport build: missing keys, a page that doesn't render, or files with different code. It exits 2 when a build or a control fails. These variables change the run:

- `REPRO_LAB=small|big3|none` picks the generated layers. `small` is the default. `big3` is the study's app, file for file.
- `REPRO_RUNS=2` sets the number of rounds. Use 3 or more for timing.
- `REPRO_NUXT_DEFAULTS=1` drops the tree-shake keys from `nuxt.config.ts`, see below.

## Results

`pnpm verify` in this directory, on the small lab, with two rounds:

```
nuxt-nightly@5.0.0-2610221052-8c52432, nuxt build, REPRO_LAB=small {"layers":4,"components":103,"pages":12,"composables":40,"utils":24,"api":8}
round  auto-imports  total    client   ssr      nitro
1      unimport      4.93s    1.23s    1.08s    0.55s
1      inject        4.64s    0.86s    0.91s    0.86s
2      unimport      4.77s    1.05s    1.09s    0.55s
2      inject        4.44s    1.01s    0.96s    0.52s
mean   unimport      4.85s    1.14s    1.08s    0.55s
mean   inject        4.54s    0.93s    0.94s    0.69s
Output after normalizing, source maps left out:
unimport #1 vs unimport #2: 305 files, 305 identical, 0 with the same code in other chunks, 0 different
unimport vs inject: 305 files, 221 identical, 65 with the same code in other chunks, 19 different
  server/index.mjs: differs
    unimport: "eDashboardState9.#.css\"\n\"path\": \"../public/manifest.json\"\n\"size\": 101048\n\"size\": 1121\n\"size\": 11496\n\"size\": 11611\n\"size\": 11650\n\"size\": 1214"
    inject: "eDashboardState9.#.css\"\n\"path\": \"../public/manifest.json\"\n\"size\": 101018\n\"size\": 1121\n\"size\": 11481\n\"size\": 11611\n\"size\": 11650\n\"size\": 1214"
  public/_nuxt/AlarmsWidget1-#.js: differs
    unimport: "() => useFetch(\"/api/alarms/alarms-r2\", { query: { id: props.title } }, \"$tmsA6P6gJc\")), __temp = await __temp, __restore(), __temp);\n\t\twatc"
    inject: "() => useFetch(\"/api/alarms/alarms-r2\", { query: { id: props.title } })), __temp = await __temp, __restore(), __temp);\n\t\twatch(() => props.h"
  public/_nuxt/AlarmsWidget16-#.js: differs
    unimport: "() => useFetch(\"/api/alarms/alarms-r0\", { query: { id: props.title } }, \"$RcUWElJ0Pf\")), __temp = await __temp, __restore(), __temp);\n\t\twatc"
    inject: "() => useFetch(\"/api/alarms/alarms-r0\", { query: { id: props.title } })), __temp = await __temp, __restore(), __temp);\n\t\twatch(() => props.h"
  public/_nuxt/AlarmsWidget38-#.js: differs
    unimport: "() => useFetch(\"/api/alarms/alarms-r2\", { query: { id: props.title } }, \"$gkQoa3yFTG\")), __temp = await __temp, __restore(), __temp);\n\t\twatc"
    inject: "() => useFetch(\"/api/alarms/alarms-r2\", { query: { id: props.title } })), __temp = await __temp, __restore(), __temp);\n\t\twatch(() => props.h"
  public/_nuxt/AlarmsWidget9-#.js: differs
    unimport: "() => useFetch(\"/api/alarms/alarms-r2\", { query: { id: props.title } }, \"$PJTnFnE8pq\")), __temp = await __temp, __restore(), __temp);\n\t\twatc"
    inject: "() => useFetch(\"/api/alarms/alarms-r2\", { query: { id: props.title } })), __temp = await __temp, __restore(), __temp);\n\t\twatch(() => props.h"
  public/_nuxt/DashboardWidget1-#.js: differs
    unimport: "useFetch(\"/api/dashboard/dashboard-r0\", { query: { id: props.title } }, \"$Big8bpxlap\")), __temp = await __temp, __restore(), __temp);\n\t\twatc"
    inject: "useFetch(\"/api/dashboard/dashboard-r0\", { query: { id: props.title } })), __temp = await __temp, __restore(), __temp);\n\t\twatch(() => props.h"
  … and 13 more
Keys from nuxt:compiler:keyed-functions on the calls in pages/index.vue (server chunk):
call                                                  unimport        inject
useState(() => 'repro-state')                         "$5BvWDiacUv"   no key
useAsyncData(() => Promise.resolve('repro-async'))    "$0Opc1AFWc_"   no key
useFetch('/api/repro')                                "$Djl0FQ0y1o"   no key
Keys in all of .output: unimport 12 client, 12 server; inject 0 client, 0 server
definePageMeta( calls in .output: unimport 0, inject 0
GET / from each build's server, port 3917:
unimport  200  rendered: state, async, fetch, route
inject    500  rendered: nothing
          [NUXT_E7009]
FAIL: the inject build differs from the unimport build: 24 compiler keys missing, / returned 500, 19 files differ.
```

The same command in `nuxt-auto-imports-native-inject-fix/` ends like this:

```
unimport #1 vs unimport #2: 305 files, 305 identical, 0 with the same code in other chunks, 0 different
unimport vs inject: 305 files, 221 identical, 84 with the same code in other chunks, 0 different
Keys from nuxt:compiler:keyed-functions on the calls in pages/index.vue (server chunk):
call                                                  unimport        inject
useState(() => 'repro-state')                         "$XMUWB7QBVy"   "$XMUWB7QBVy"
useAsyncData(() => Promise.resolve('repro-async'))    "$XKMDSL-QA-"   "$XKMDSL-QA-"
useFetch('/api/repro')                                "$R0OrGXIO57"   "$R0OrGXIO57"
Keys in all of .output: unimport 12 client, 12 server; inject 12 client, 12 server
definePageMeta( calls in .output: unimport 0, inject 0
GET / from each build's server, port 3917:
unimport  200  rendered: state, async, fetch, route
inject    200  rendered: state, async, fetch, route
PASS: same keys and the same page, and every file has the same code after normalizing (84 of them laid out in other chunks).
```

The keys differ between the two directories because keyed-functions hashes the module's absolute path.

Build time on the study's app, `REPRO_LAB=big3 REPRO_RUNS=3 pnpm verify` in `nuxt-auto-imports-native-inject-fix/`, on a 16-core machine shared with other jobs:

```
round  auto-imports  total    client   ssr      nitro
1      unimport      36.64s   10.84s   15.89s   6.96s
1      inject        30.85s   8.67s    12.51s   6.95s
2      unimport      35.30s   11.03s   14.95s   6.69s
2      inject        30.64s   8.24s    12.61s   7.19s
3      unimport      35.73s   11.11s   15.12s   6.80s
3      inject        31.39s   8.35s    12.42s   7.93s
mean   unimport      35.89s   10.99s   15.32s   6.82s
mean   inject        30.96s   8.42s    12.51s   7.36s
```

Inject was faster in every round, by 4.3 to 5.8 s. On average the client build took 2.6 s less, the SSR build 2.8 s less, and the whole build 4.9 s less. The nitro build doesn't change. The same run reported 5,554 files, 4,070 identical and 1,484 with the same code in other chunks, 283 keys on each side, and the same page. The study measured 36.6 s and 31.7 s on the same layers, with its server auto-imports fix in both builds. On the small lab the builds take about 5 s and the difference is a few tenths of a second.

## How the swap works

`native-inject/index.ts` is a local Nuxt module, loaded only with `REPRO_IMPORTS=inject`.

1. It builds the inject map from unimport's import list, `ctx.getImports()` from the `imports:context` hook, skipping type and disabled imports. On big3 the study's map had 1,126 names.
2. Its `configEnvironment` hook sets `build.rolldownOptions.transform.inject` for the `client` and `ssr` environments. Vite 8 spreads that object into Rolldown's options in `resolveRolldownOptions`, `vite/dist/node/chunks/node.js:34708` and `34738` in Vite 8.3.5. The nitro environment keeps Nitro's own auto-imports.
3. It wraps `nuxt:imports-transform` so that, in those two environments, it returns early for code that doesn't mention `#imports`.

In the `-fix` copy, it also wraps `nuxt:compiler:keyed-functions`. For each keyed composable that the code calls as a free identifier, it prepends `import { useState } from '#app/composables/state'` and the like, runs the plugin, and strips the prefix from its result. That is the only difference between the two fixtures, apart from the package name.

## Why the keys go missing

`nuxt:compiler:keyed-functions` looks the callee up in the module's scope. `isKeyedFunctionImport` only accepts an import. A free identifier has no declaration, so the plugin skips the call:

- pinned build: `nuxt-nightly/dist/index.mjs:6848` and `6854`
- `nuxt/nuxt` main at `2a81d4a`: `packages/nuxt/src/compiler/plugins/keyed-functions.ts:246` and `260`

The latest nightly, `5.0.0-2610231503-2a81d4a`, is built from that commit and has the same code at the same lines. I read that from its tarball. The verifier ran on the pinned build only.

## Other differences

**Import order.** Oxc's inject writes the imports in the order of the inject map, where `useAsyncData` comes before `useState`. unimport writes them in the order the code first uses them. A module that calls `useState` first then imports the two modules in the other order. Those modules run in another order, and Rolldown lays out shared chunks differently. It names a chunk `pages-*.js` where the unimport build has `fetch-*.js`, and it assigns other export letters. The verifier compares such files again without chunk names, without `as` aliases in import and export lists, and with top-level statements sorted, and counts them as "with the same code in other chunks". The study reported identical output on big3 apart from the `definePageMeta` calls. Here the inject build lays out 84 files differently on the small lab and 1,484 on big3, with the same code and the same rendered page. Code with side effects at import time could notice the order.

**Tree-shaking.** `nuxt:tree-shake-composables` runs after the imports transform. With unimport it sees `import { definePageMeta } from '#app/composables/pages'`, looks up `options.composables['#app/composables/pages']`, finds nothing, and keeps the call. With inject the name is still free, and the plugin removes the call as configured. That is repro/nuxt-definepagemeta-treeshake. This fixture's `nuxt.config.ts` adds that branch's workaround keys, so unimport removes the calls too and the comparison isolates inject. `REPRO_NUXT_DEFAULTS=1` drops the keys. The inject build then has no `definePageMeta(` calls, and the unimport build has one per page in each of the client and server output, 26 on the small lab. The verifier reports those files without failing on them.

## What upstream would need

- **keyed-functions and tree-shaking that know the registry.** Both plugins would look a free identifier up in unimport's registry, `ctx.getImports()`, and treat it as the import unimport would add. Nuxt already passes the registry to another compiler plugin, `KeyedFunctionFactoriesPlugin`, through `getAutoImports` in `packages/nuxt/src/compiler/module.ts:35-38`. The tree-shake plugin has a TODO for the same check at `packages/nuxt/src/core/plugins/tree-shake.ts:102`.
- **Scope.** `transform.inject` is a `Record<string, string | [string, string]>` for the whole build, with no include or exclude. It rewrites free identifiers in `node_modules` too. In a standalone Rolldown 1.2.15 check, a dependency that reads a global `useState` got `import { useState } from '#app/composables/state'`. Nuxt's JS plugin leaves `node_modules` alone unless the file imports `#imports`. Inject would need an include and exclude option in Rolldown, or a map that leaves out names that libraries use as globals.
- **Templates and directives.** unimport's `vueTemplate` and `vueDirectives` addons rewrite compiled template code, such as `_ctx.formatThing` and `resolveDirective('focus')`, not free identifiers. Inject can't do that. A util used only in a template compiles to `_ctx.formatThing(1)`, inject leaves it, and the page returns 500. With unimport it renders. I checked that in a scratch copy of this fixture, outside the repro. The JS plugin would have to keep handling `.vue` template code.
- **`#imports`.** Inject doesn't rewrite `import { useRoute } from '#imports'`. The JS plugin has to keep running for such code, as it does here for `app/components/FromImports.vue`. A native `code` filter such as `/#imports/` on that hook would also save the call into JS for every other module, which `transformInclude` can't.
- **Import order.** Oxc's inject orders imports by map position. Matching unimport would need first-use order in Oxc, or Nuxt would accept the difference.

Dev mode wasn't checked. These runs are production builds only.

## Why each element is there

- `lab/` comes from `scripts/gen-layers.mjs`, the study's `exp/lab/gen.mjs` without its root app. The layers give the build enough modules to time. `REPRO_LAB=big3` passes `--seed 3` and the study's sizes, and reproduces its 12 layers byte for byte.
- `typescript@6.0.3`, because `@vue/compiler-sfc` needs TypeScript to resolve the imported prop types in the generated components. The study installed it by hand. TypeScript 7 has no JS API.
- `buildId: 'repro'` and `buildDir: '.nuxt'` make two builds comparable byte for byte. Without the fixed `buildDir`, a production build moves to `node_modules/.cache/nuxt/.nuxt` once `.nuxt` exists, in `@nuxt/kit`'s `loadNuxtConfig`, and that path appears in the output.
- `vite.build.minify: false` and the `repro:client-chunk-names` plugin keep the output readable and let the verifier pair client chunks by name. Both builds use them.
- `native-inject/` is a folder of its own because of `@nuxt/nitro-server`. Its Nitro v2 compatibility check reads and parses every JS and TS file under each installed module's directory, skipping only `node_modules`. With the module file at the fixture root, that was the whole fixture, `.nuxt`, `.output`, `lab/` and `out/` included, and it added 4 to 20 s to each inject build.
- `experimental.asyncContext: true` matches the study's config.
- `app/pages/index.vue` has the keyed calls without keys. `app/components/FromImports.vue` imports from `#imports`. `server/api/repro.ts` answers `useFetch` and is a plain function, because Nitro 3 no longer auto-imports h3's `defineEventHandler`. The generated API routes still call it, but nothing requests them.
- The study's numbers also included its server auto-imports fix in both runs, see repro/nuxt-server-auto-imports-twice. This fixture doesn't.

## Environment

- `nuxt` is `npm:nuxt-nightly@5.0.0-2610221052-8c52432`, with Nitro 3.0.260903-beta, Vite 8.3.5, Rolldown 1.2.15, `@vitejs/plugin-vue` 6.0.10, Vue 3.5.44 and unimport 7.0.2. `typescript` 6.0.3.
- `pnpm-workspace.yaml` pins `@nuxt/cli` to `@nuxt/cli-nightly@4.0.1-2610152140-ad8153a`, because `nuxt-nightly` asks for `@latest`.
- Node 24.21.0, pnpm 11.28.5.
