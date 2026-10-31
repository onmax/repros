# `isPackageExists(name, { paths })` stats the same paths over and over for a missing package

Given `local-pkg` 1.2.1 (latest) with `mlly` 1.8.2 on Node 24, `isPackageExists(name, { paths })` for a package that is not installed makes `fs.statSync` calls that grow linearly with `paths.length`, and almost all of them stat a path it has already statted. With 23 paths in this fixture it makes 13,518 calls on 150 distinct paths, 90 calls per path.

Nuxt modules such as `@nuxt/icon` and `@vueuse/nuxt` check optional packages this way and pass one path per layer root, so the cost grows with the number of layers. In a production app with 22 layers, these checks made about 335,000 `statSync` calls and cost about 7.8 s of CPU in `nuxt build` start-up, about half of it. That figure comes from profiling that app, not from this fixture.

## Run

From the branch root, with Node 24 and pnpm:

```sh
node verify.mjs local-pkg-is-package-exists-paths
```

The verifier installs the fixture from `pnpm-lock.yaml` if `node_modules` is missing. Then it runs `check.mjs` in a fresh process for 1, 2, 4, 8, 16 and 23 paths. `check.mjs` wraps `fs.statSync` and `fs.existsSync`, calls `syncBuiltinESMExports()` so the named imports in local-pkg and mlly see the wrappers, imports local-pkg, and calls `isPackageExists('@iconify/json', { paths })` once. The paths are this directory followed by `layers/layer-0`, `layers/layer-1`, and so on, which it creates inside it.

The verdict uses call counts only, because times vary on a shared machine. It exits 1 when 23 paths make at least half of 23 times the calls of 1 path and each distinct path is statted at least 10 times (the bug). It exits 0 when neither holds, 3 when an `isPackageExists` answer differs from stock local-pkg 1.2.1, and 2 when setup fails. This fixture exits 1. The fixed control in [`../local-pkg-is-package-exists-paths-fix`](../local-pkg-is-package-exists-paths-fix) runs the same verifier and exits 0.

## Expected and actual

Expected: each path on disk is probed about once, so an extra layer root adds a few calls. Actual: each extra path adds 594 `statSync` calls, and 23 paths stat each distinct path 90 times. Output on Slimbook, a shared 16-core machine, on 2026-10-31:

```text
local-pkg-is-package-exists-paths: Node v24.21.0, local-pkg 1.2.1, mlly 1.8.2
paths: the fixture dir, 6 levels below /, then layers/layer-0, layers/layer-1, ... inside it

isPackageExists answers (stock local-pkg 1.2.1 in brackets when different):
  installed (mlly), 1 path                                                 true
  installed (mlly), 23 paths                                               true
  builtin (fs), 1 path                                                     true
  builtin (fs), 23 paths                                                   true
  self (local-pkg-is-package-exists-paths), 1 path                         true
  self (local-pkg-is-package-exists-paths), 23 paths                       true
  non-exported subpath (mlly/package.json), 1 path                         false
  non-exported subpath (mlly/package.json), 23 paths                       false
  missing (@iconify/json), 1 path                                          false
  missing (@iconify/json), 23 paths                                        false
  extension variant (ext-variant, only ext-variant.js installed), 1 path   true

isPackageExists('@iconify/json', { paths }), not installed, one fresh process per row:
  paths   statSync  existsSync   distinct paths   calls per distinct path   time (information only)
      1        450           0               35                      12.9       12.5 ms
      2       1044           0               45                      23.2       19.9 ms
      4       2232           0               55                      40.6       38.6 ms
      8       4608           0               75                      61.4       64.5 ms
     16       9360           0              115                      81.4      128.6 ms
     23      13518           0              150                      90.1      181.0 ms

23 paths make 30.0x the calls of 1 path (23x if every path cost the same); each extra path adds 594.0 calls; each distinct path is probed 90.1 times

expected: each path on disk is probed about once, so an extra layer root adds a few calls
actual:   23 paths make 13518 calls on 150 distinct paths, 90 calls per distinct path (calls grow linearly, mostly repeats)
```

The counts depend on how deep the checkout is, so a clone elsewhere prints different numbers with the same verdict. The rough script this fixture replaces sat 11 levels deeper in the tree and measured 1,242 calls for 1 path and 31,734 for 23 (556 ms on an idle 4-core VPS).

## Why it happens

In `dist/index.mjs`, `resolvePackage` calls `_resolve`, which calls mlly's `resolvePathSync` with `url: paths`, twice: first for `${name}/package.json`, then for `name`. Both throw for a missing package.

mlly's `_resolve` adds three URLs for every path: `./` relative to it (its parent), `<path>/_index.js`, and `node_modules` relative to it. For each of the 4 URLs it tries the specifier as given and with `''` or `/index` followed by `.mjs`, `.cjs`, `.js` or `.json`: 9 specifiers. Each attempt runs `packageResolve`, which walks every ancestor of the URL and calls `tryStatSync` on `node_modules/<package>` before throwing `ERR_MODULE_NOT_FOUND`. Nothing is shared between attempts.

A path `d` levels below `/` therefore costs 2 × 9 × (4d + 1) calls. This fixture sits 6 levels deep, so 1 path costs 18 × 25 = 450 calls. Each layer sits 8 levels deep and adds 18 × 33 = 594. Both match the output above. Every layer adds one new directory, but the walks visit the same ancestors again for every URL, every specifier and every path.

## Why each piece is here

- `layers/layer-<i>`: Nuxt passes one root per layer, and distinct roots are what a real app has. The fixture directory comes first, like the app root.
- `mlly` in `dependencies`: it pins the version local-pkg imports (the lockfile resolves local-pkg's `^1.7.4` to the same 1.8.2) and gives the answer check an installed package in `node_modules`.
- `exports` in `package.json`: mlly resolves a package by its own name only when its `package.json` has `exports`, so the self-reference answer needs it.
- `pnpm-workspace.yaml`: makes this directory the pnpm root even if a parent folder has a workspace.
- The answer check: these are the stock answers the fixed control must keep. `ext-variant` resolves because mlly also tries `ext-variant.js`, which here is an installed package.

Source: `local-pkg` 1.2.1 `dist/index.mjs` (`resolvePackage`, `_resolve`) and `mlly` 1.8.2 `dist/index.mjs` (`_resolve`, `packageResolve`, `tryStatSync`), as installed from npm.

Written by an AI agent, Claude Code, on 2026-10-31. A human has not reviewed it yet.
