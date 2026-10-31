# `@nuxt/icon` checks for `@iconify/json` once per collection

Given Nuxt 4.6.3 and `@nuxt/icon` 2.6.2 on Node 24, with three `@iconify-json/*` collections installed and `@iconify/json` not installed, `nuxt build` asks local-pkg whether `@iconify/json` is installed 4 times with the default options and 7 times with `icon.serverBundle.externalizeIconsJson: true`. The answer can't change during a build, so one check is enough. Each check is a failed module resolution that costs about 600 `statSync` calls per resolve path, and @nuxt/icon passes one path per layer. With 20 layers the repeated checks make 98,406 `statSync` calls, against 14,058 for one check in [`../nuxt-icon-full-collection-check-fix`](../nuxt-icon-full-collection-check-fix).

In `dist/shared/icon.sP0tVXUq.mjs`:

```js
function hasFullCollection(resolvePaths) {
  return isPackageExists("@iconify/json", { paths: resolvePaths });
}
function getCollectionPath(collection, resolvePaths) {
  return hasFullCollection(resolvePaths) ? `@iconify/json/json/${collection}.json` : `@iconify-json/${collection}/icons.json`;
}
```

`resolvePaths` comes from `getResolvePaths(nuxt)` in `dist/module.mjs`: `rootDir`, `workspaceDir` and every layer root. `hasFullCollection` runs from three places, each with the same `resolvePaths`:

| where | `dist/` line | when | checks |
|---|---|---|---|
| `discoverInstalledCollections` | `shared/icon.sP0tVXUq.mjs:306` | `serverBundle.collections` not set | 1 |
| `nuxt-icon-server-bundle.mjs` template, `getContents` | `module.mjs:295` (and `:299` through `resolveCollectionFile` when a collection doesn't resolve from `rootDir`) | always, with a local server bundle | 1 per collection |
| `nitro:config` hook | `module.mjs:633` | only with `serverBundle.externalizeIconsJson: true`; the hook returns early otherwise | 1 per collection |

`externalizeIconsJson` is off by default, so the `nitro:config` path runs only when an app turns it on. The production app with 22 layers where this was found sets `serverBundle: { collections: [5 names], externalizeIconsJson: true }`, which skips discovery and makes 5 + 5 = 10 checks. There @nuxt/icon spent 4.2 s of CPU and made 205k `statSync` calls before bundling started, 2.1 s in each of the two places. With one layer it was 0.33 s and 16k calls. The template's share runs synchronously while Nuxt compiles the other templates, so Nuxt also printed 219 "Compiled `#build/...` in ~2100ms" lines for templates that were only waiting. This small app doesn't reach Nuxt's 500 ms threshold for those lines.

Why one check costs so much when the package is missing is a separate bug in local-pkg and mlly: every path is tried with several URL and specifier variants, each walking all `node_modules` ancestors. This repro is about @nuxt/icon asking the same question again for each collection.

## Run

From the branch root, with Node 24 and pnpm:

```sh
node verify.mjs nuxt-icon-full-collection-check
```

The verifier installs `app/` from its lockfile and fails if `@iconify/json` is installed. For 1 and 20 layers it generates empty layers in `layers/`, outside `app/` as in a monorepo, and runs `nuxt build` with the default icon options and with `externalizeIconsJson: true`. `app/modules/stop.ts` stops each build at `build:before`. By then Nuxt has run the `nitro:config` hooks and written the templates, including `nuxt-icon-server-bundle.mjs`, and Vite and Nitro haven't started, so a build takes a few seconds.

`count.mjs` at the branch root is loaded with `node --import`. It wraps local-pkg's `isPackageExists` while the file loads (a `module.registerHooks` load hook; nothing on disk changes) and wraps the `node:fs` sync functions, then calls `syncBuiltinESMExports()` so mlly's named imports see the wrappers. Every `isPackageExists('@iconify/json')` call with @nuxt/icon on the stack counts as one check, with the `statSync` calls made inside it and the @nuxt/icon code that asked. The verifier asserts on these counts, not on time, because Slimbook is shared.

It exits 1 when a build checks more than once, 0 when every build checks once, and 2 when setup or a build fails. On Slimbook every build runs through `heavy`.

## Expected and actual

Expected: one `@iconify/json` check per build. Actual: 1 + one per collection, plus one more per collection with `externalizeIconsJson`. The cost of each check grows with the number of layers. Output on Slimbook on 2026-10-31:

```text
nuxt-icon-full-collection-check: Node v24.21.0, nuxt 4.6.3, @nuxt/icon 2.6.2, local-pkg 1.2.1, mlly 1.8.2, @iconify/json not installed, builds through heavy

@iconify/json checks in one `nuxt build` (to build:before), 3 collections in the server bundle:
  options               layers  paths  discover  nitro:config  template  checks  statSync  per check  .nuxt output
  default                    1      3         1             0         3       4      6984       1746  36 files b1dfbce02adbd294
  externalizeIconsJson       1      3         1             3         3       7     12222       1746  36 files b1dfbce02adbd294
  default                   20     22         1             0         3       4     56232      14058  36 files fb5241f475b21f52
  externalizeIconsJson      20     22         1             3         3       7     98406      14058  36 files fb5241f475b21f52

paths: the resolvePaths of each check, rootDir + workspaceDir + every layer root in a Set (here rootDir is in it twice, with and without the trailing slash of its layer root).
every check answered false. statSync calls in the checks: 6984 (1 layer, default) to 98406 (20 layers, externalizeIconsJson), 14.1x.

expected: one @iconify/json check per build, since the answer cannot change during a build
actual:   4 of 4 builds check more than once: once to discover collections, once per collection in the template, and once more per collection in nitro:config with externalizeIconsJson (7 checks and 98406 statSync calls with 20 layers)
```

`layers` is the number of generated layers the app extends; Nuxt also counts the app itself. One check costs 1,746 `statSync` calls with 3 paths and 14,058 with 22, about 600 per path. `.nuxt output` is a hash of the generated `.nuxt` files after normalizing absolute paths, pnpm store dir names, the random build id and the order of `/// <reference>` lines. It matches the fixed control row for row.

## Why each piece is here

- `@iconify/json` is not installed. That is the common setup, since per-collection `@iconify-json/*` packages are the recommended install, and it is the case where each check walks every path. With `@iconify/json` installed the checks still repeat; this repro doesn't measure what they cost then.
- Three `@iconify-json/*` collections. The template and `nitro:config` checks run once per collection, so with none installed there is only the discovery check and the verifier passes.
- `layers/` sits outside `app/`, with each layer passed in `extends`. Layers don't change the number of checks; they show that each check costs more with every layer.
- `app/pnpm-workspace.yaml` makes `app/` the `workspaceDir`. Without it, Nuxt picks the git root of a fresh clone and the path list grows by one.
- `REPRO_EXTERNALIZE=1` in `app/nuxt.config.ts` turns on `externalizeIconsJson`, the only option that makes the `nitro:config` hook check.

Pinned: `nuxt` 4.6.3 (Nitro 2.13.5, Vite 8.3.5), `@nuxt/icon` 2.6.2 (latest), `local-pkg` 1.2.1, `mlly` 1.8.2, `@iconify-json/heroicons` 1.2.3, `@iconify-json/lucide` 1.2.148, `@iconify-json/ph` 1.2.2, Node 24.21.0, pnpm 12.16.1. Source: the published `@nuxt/icon` 2.6.2 tarball (`dist/`); I didn't check the TypeScript source in nuxt/icon. The production app ran `nuxt-nightly` 5.0.0-2610291341-744179a with `@nuxt/ui` 4.12, which installs the same `@nuxt/icon` 2.6.2 `dist/`. Nuxt 4 stable reproduces it, so this fixture uses that.

Written by an AI agent, Claude Code, on 2026-10-31. A human has not reviewed it yet.
