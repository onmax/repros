# Nuxt 5: `ssr: false` builds bundle every page and component into `.output/server`

Not reported upstream yet.

With `ssr: false`, the server only sends the SPA shell. Nuxt 5 builds Nitro as a Vite environment by default (`experimental.nitroViteEnvironment`), and that build still bundles the whole app into `.output/server`:

```
$ pnpm verify
nuxt-nightly 5.0.0-2610221052-8c52432; @nuxt/vite-builder-nightly 5.0.0-2610221052-8c52432 calls ServerEntryPlugin(nuxt, entry)
ssr environment: 189 modules transformed; .output/server: 24 .mjs files, 728.2 kB

client-only code: expected in .output/public, absent from .output/server
  FAIL marker-alpha-card (app/components/AlphaCard.vue): 1 public file(s); server: _ssr/pages-DNgiJa3m.mjs
  FAIL marker-beta-card (app/components/BetaCard.vue): 1 public file(s); server: _ssr/about-GHdxYI1-.mjs
  FAIL marker-page-about (app/pages/about.vue): 1 public file(s); server: _ssr/about-GHdxYI1-.mjs
  FAIL marker-page-index (app/pages/index.vue): 1 public file(s); server: _ssr/pages-DNgiJa3m.mjs

node .output/server/index.mjs on 127.0.0.1:4517
  ok   GET /: 200 text/html;charset=utf-8, 988 bytes, SPA shell
  ok   GET /about: 200 text/html;charset=utf-8, 988 bytes, SPA shell
  ...
4 of 8 checks failed.
```

Expected: the server bundle carries Nuxt's SPA stub `entry-spa` (`export default () => {}`) and no app code, as it does with `experimental.nitroViteEnvironment: false`.

The cost grows with the app. A generated 12-layer app, outside this fixture, was built once with each builder. The patch below takes its SSR environment from 5,332 modules in 12.0 s to 104 modules in 0.3 s, and its whole build from 30.6 s to 15.1 s. `.output/server` drops from 1,446 `.mjs` files (23.6 MB) to 280 (8.2 MB), with no page or component chunk left. Its 1,931 files in `.output/public` stay the same.

## Run

```sh
git clone --depth 1 --branch repro/nuxt-spa-full-server-bundle https://github.com/onmax/repros.git
cd repros/nuxt-spa-full-server-bundle
pnpm install && pnpm verify
cd ../nuxt-spa-full-server-bundle-fix
pnpm install && pnpm verify
cd ../nuxt-spa-full-server-bundle-fix-islands
pnpm install && pnpm verify
```

`pnpm verify` runs `verify.mjs`, the same file in every fixture. It runs `nuxt build`, then:

- finds the `marker-*` string in each page and component. It must be in `.output/public` and absent from `.output/server`. A marker in a `*.server.vue` file must be in `.output/server` instead.
- starts `node .output/server/index.mjs` on `127.0.0.1:4517` and fetches `/` and `/about`. Both must return the same SPA shell: an empty `<div id="__nuxt">` and `data-ssr="false"`. Each server component's island must render.
- stops the server. `ss -ltn 'sport = :4517'` must list nothing, and the port must refuse connections.
- prints hashes of the shell HTML and of `.output/public`, with build timestamps zeroed, to compare fixtures.

It exits 1 when a check fails. The full build log goes to `build.log` and the server's output to `server.log`.

## Results

| fixture | builder calls | SSR environment | `.output/server` | verify |
|---|---|---|---|---|
| `nuxt-spa-full-server-bundle/` | `ServerEntryPlugin(nuxt, entry)` | 189 modules | 24 `.mjs`, 728.2 kB, all four markers | 4 of 8 checks fail |
| `nuxt-spa-full-server-bundle-fix/` | `ServerEntryPlugin(nuxt, serverEntry)` | 104 modules | 19 `.mjs`, 573.1 kB, no marker | 8 checks pass |
| `nuxt-spa-full-server-bundle-fix-islands/` | `ServerEntryPlugin(nuxt, serverEntry)` | 199 modules | 25 `.mjs`, 759.7 kB, the server component only | 10 checks pass |

The bug and fix fixtures serve the same shell HTML (sha256 `7f8e1e988ef1b2df`) and build the same `.output/public` (`4d45c44dc2e37ce4`). The fix drops `vue-router`, both page chunks and Nuxt's error pages from `.output/server`.

## Fixtures

- `nuxt-spa-full-server-bundle/`: two pages, each rendering one component, with `ssr: false`. Each file holds one marker.
- `nuxt-spa-full-server-bundle-fix/`: the same app with a committed `pnpm patch` of `@nuxt/vite-builder-nightly@5.0.0-2610221052-8c52432`. It changes one line of `dist/index.mjs`:

  ```diff
  -			ServerEntryPlugin(nuxt, entry),
  +			ServerEntryPlugin(nuxt, serverEntry),
  ```

  The patch is registered in `pnpm-workspace.yaml`, because pnpm 11 ignores `pnpm.patchedDependencies` in `package.json`.
- `nuxt-spa-full-server-bundle-fix-islands/`: the fix, plus `experimental.componentIslands: true` and a server component, `ServerNote.server.vue`, on `/about`. Islands need the full app entry on the server, and the fix keeps it: the island renders. Built without the patch, its `.output` differs from the patched build only where two clean builds of this fixture also differ: build timestamps and the hashed names of the `precomputed` and `styles` chunks.

`buildId: 'repro'` is fixed so the verifier's hashes can be compared across fixtures. It does not affect the bug: `ssr: false` and any page or component reproduce it.

## Environment

- `nuxt-nightly` 5.0.0-2610221052-8c52432, which brings Nitro 3.0.260903-beta, Vite 8.3.5, Rolldown 1.2.15, `@vitejs/plugin-vue` 6.0.10 and Vue 3.5.44
- vue-router 5.4.0, `@nuxt/cli-nightly` 4.0.1-2610152140-ad8153a
- Node 24.21.0, pnpm 11.28.5, Linux x64

The lockfile is the tree the build-performance session resolved on 2026-10-23, with `httpxy` at 0.5.5 instead of 0.5.6: pnpm 11's default one-day `minimumReleaseAge` rejected 0.5.6 on 2026-10-24. `httpxy` comes in through `env-runner`, and none of it reaches `.output`. `nuxt-nightly` depends on `@nuxt/cli-nightly@latest`, so editing a `package.json` lets pnpm re-resolve the CLI.

## Why it happens

Source paths are in nuxt/nuxt at `2a81d4a62` (main, 2026-10-23). `dist` lines are in the pinned nightly packages.

1. `packages/vite/src/vite.ts:88` picks `serverEntry`: the app entry when `ssr` is on, `entry-spa` when it is off (`@nuxt/vite-builder-nightly` `dist/index.mjs:3307`). It is the SSR environment's input (`vite.ts:158`, `dist/index.mjs:3348`).
2. `vite.ts:217` passes the app `entry` to `ServerEntryPlugin` instead (`dist/index.mjs:3391`).
3. When Nitro runs as a Vite environment, `packages/vite/src/plugins/server-entry.ts:14-19` sets the `serverEntry` build output to `export { default } from "<app entry>"` (`dist/index.mjs:2807-2812`).
4. In the SSR environment, `@nuxt/nitro-server`'s `nuxt:build-outputs` plugin resolves `nuxt/internal/entry` to that output (`packages/nitro-server/src/vite.ts:331`, `@nuxt/nitro-server-nightly` `dist/index.mjs:432`).
5. The renderer loads it lazily: `getServerEntry = () => import('nuxt/internal/entry')` (`packages/nuxt/src/runtime/server/renderer/build-files.ts:20`, `nuxt-nightly` `dist/runtime/server/renderer/build-files.js:10`). Rolldown follows the import, so the app entry, every page and vue-router end up in `.output/server`. With `ssr: false`, `getRenderer` (`build-files.ts:121`) sends every request to `getSPARenderer()`, which never calls it.

With `experimental.nitroViteEnvironment: false`, step 3 points at `dist/server/server.mjs` instead, which the SSR environment built from `serverEntry`, so only `entry-spa` reaches the server. The Vite-environment branch came in with [nuxt/nuxt#35604](https://github.com/nuxt/nuxt/pull/35604) (`d3a4e025e`, 2026-07-20) and used `entry`, although `serverEntry` already existed. [nuxt/nuxt#36223](https://github.com/nuxt/nuxt/pull/36223) (`fa276ee32`) last touched the file.

## Component islands

With `experimental.componentIslands` set to anything but `'auto'`, the fix keeps the full entry. While Nuxt initializes its server builder, `@nuxt/nitro-server` sets `nuxt.options.ssr = true` and adds a `'/**': { ssr: false }` route rule (`packages/nitro-server/src/index.ts:182-185`, `dist/index.mjs:2461-2465`). That happens before the Vite builder picks `serverEntry`, so `serverEntry` is the app entry. `-fix-islands` shows this.

The default, `'auto'`, leaves `ssr` off. Nuxt warns that a server component with `ssr: false` is unsupported under `'auto'` (`NUXT_B3002`); `NUXT_B4008` covers server pages but did not print in these builds. Today the Vite-environment build renders such islands anyway, because it ships the whole app. The fix takes that away:

| `'auto'`, `ssr: false`, with `ServerNote.server.vue` | page code in `.output/server` | island request |
|---|---|---|
| unpatched, default `nitroViteEnvironment` | yes | 200, renders |
| patched | no | 500 |
| unpatched, `nitroViteEnvironment: false` | no | 500 |

A server page, `report.server.vue`, gives the same three results. The 500 is `TypeError: Cannot read properties of undefined (reading '_component')`: `entry-spa` returns no app to render. The patched build matches the separate-build path, but an app that ignored the warning would lose its islands. Keeping the app entry whenever islands are active would avoid that. `@nuxt/nitro-server` already computes that condition for its island handler (`packages/nitro-server/src/index.ts:173`).

None of these `'auto'` runs is a fixture on this branch. The server-component rows come from this verifier on copies of `-fix-islands` without `componentIslands: true`, and the server-page results from a throwaway script. To see the patched row, delete the `experimental` block from `-fix-islands/nuxt.config.ts` and run `pnpm verify`.
