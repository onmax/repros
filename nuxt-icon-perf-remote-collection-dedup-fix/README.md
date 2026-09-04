# Nuxt Icon remote collection downloads: pnpm patch


Given Node 24.19.0, Nuxt 4.5.2 and `@nuxt/icon` 2.5.1 in a production Node server, twenty concurrent requests for different icons in one cold remote collection should share one collection download. The published package downloads it twenty times. The sibling fix shares the in-flight promise, replaces it with resolved data, and clears it if fetching or JSON parsing rejects.

## Run

From either directory, run the same command:

```sh
npx --yes --package=node@24.19.0 --package=pnpm@11.15.1 --call 'pnpm install --frozen-lockfile && pnpm verify'
```

An existing npx launcher and registry access are required. This prepares Node 24.19.0 and pnpm 11.15.1. The frozen lockfile pins dependencies, including Nitro 2.13.4, Vite 8.2.2 and Vue 3.5.42. `pnpm-workspace.yaml` permits the esbuild installation script. Verification builds the actual installed Nuxt module, starts its own production server and collection origin on available loopback ports, and stops both. No deployment, external API, credentials or manual browser steps are involved.

Both fixtures have identical verifier, app and Nuxt configuration. Their package metadata selects the expected result: baseline 20 cold downloads, fixed 1. Both exit zero only when their exact expected result and all controls pass. Neither silently accepts any positive request count.

## Before and after

| Measurement | Baseline | Patched |
| --- | ---: | ---: |
| Concurrent API consumers | 20 | 20 |
| Cold full-collection downloads | 20 | 1 |
| Collection JSON bytes per download | 49,940 | 49,940 |
| Cold origin body bytes | 998,800 | 49,940 |
| Additional downloads for 20 new icon names | 0 | 0 |
| Deliberate JSON failure status | 500 | 500 |
| Origin requests for that failure | 1 | 1 |
| Origin requests for subsequent recovery | 1 | 1 |
| Further downloads after recovery | 0 | 0 |
| First null-collection result | HTTP 404 | HTTP 404 |
| Further fetch to recover from null | 1 | 1 |

The patch saves 19 requests and 948,860 uncompressed body bytes in this workload, a 95% reduction. All returned icon bodies are checked. The cold workload uses distinct icon names to prevent Nitro's outer response cache from hiding collection-level duplication. The warm control also uses new names.

A separate remote collection returns HTTP 200 with invalid JSON once, making `Response.json()` reject. The verifier confirms one failing origin request and API status 500, then successfully repeats the same API key with exactly one new origin fetch. A further new key uses the recovered cache. Native fetch is used on both sides; there is no ofetch retry wrapper. Exact origin counts rule out hidden retries, and repeating the failed API key checks Nitro does not hide recovery behind its outer cache.

A third collection returns JSON `null` once. Both fixtures must return the existing 404 and fetch again for a different icon key. A new key avoids Nitro's independent caching of the returned 404 error object. This preserves the original truthiness-based cache semantics; storing a fulfilled promise forever would incorrectly retain the null result.

Origin responses are held until cold requests overlap. Elapsed time includes this synchronization and is not a latency benchmark. Byte counts exclude transport headers and compression. The origin contains 1,000 synthetic icons to retain a whole-collection payload while each consumer requests only one. Counts do not depend on individual icon complexity.

## Scope and provenance

This tests multiple API consumers after a cold start, not one browser rendering twenty icons. Iconify can batch one browser's icons. Local collections, client-bundled icons and warm collections avoid this path. Portal uses Nuxt UI and installed icon collections; this does not establish that Portal uses remote collections. The local origin substitutes a CDN through the supported `fetchEndpoint` option. No maintained upstream repository was edited.

- [Published 2.5.1 tarball](https://registry.npmjs.org/@nuxt/icon/-/icon-2.5.1.tgz), SHA-1 `97d9315deefbde05ea9d688ab664a34f06eda1f1`. Full integrity is in each pnpm lockfile.
- [Generator at current main SHA b878f5b22f56c9f9c609c874aee7506e86e7f7c7](https://github.com/nuxt/icon/blob/b878f5b22f56c9f9c609c874aee7506e86e7f7c7/src/bundle-server.ts#L90). Published code is `dist/module.mjs`; this is the sole patched package file.
- [Production API handler](https://github.com/nuxt/icon/blob/b878f5b22f56c9f9c609c874aee7506e86e7f7c7/src/runtime/server/api.ts#L23) and [remote-mode documentation](https://github.com/nuxt/icon#server-bundle-mode-remote).

## Existing work check

Rechecked live on 2026-09-04: current release remains 2.5.1 and main remains the SHA above. Read all five open PRs and all 198 closed issue titles, plus targeted all-state searches for remote cache, concurrency and duplication. No same-problem open PR or closed issue was found.

The nearest closed report, [#151](https://github.com/nuxt/icon/issues/151), concerns legacy component `state.value[iconKey] = await loadIcon(...)` calls repeated for the same icon. This fixture exercises the current server `createRemoteCollection` for distinct API keys without rendering an icon component. It is a different cache and call path. [#273](https://github.com/nuxt/icon/issues/273) is explicitly a duplicate of [#271](https://github.com/nuxt/icon/issues/271), false timeout warnings despite successful loading. [#233](https://github.com/nuxt/icon/issues/233) concerns visible client icon delay and client bundling; [#332](https://github.com/nuxt/icon/issues/332) concerns customization CSS reuse. These do not report this server collection-download amplification.

No upstream issue or pull request was opened. Freshness is point-in-time and should be checked again before proposing a PR.

## Patch artifact

[`patches/@nuxt__icon@2.5.1.patch`](patches/@nuxt__icon@2.5.1.patch) was generated using actual pnpm commands:

```sh
pnpm patch @nuxt/icon@2.5.1 --edit-dir /tmp/nuxt-upstream-prs-20260904/icon-package-falsy
# Edit dist/module.mjs in that directory.
pnpm patch-commit /tmp/nuxt-upstream-prs-20260904/icon-package-falsy
```

The generated `patchedDependencies` entry and patch hash in the lockfile make `pnpm install --frozen-lockfile` apply it. The patch replaces the resolved-value-only cache with a shared promise and replaces it with the resolved data, and resets it on rejection. No distributed cache or new dependency is introduced. [Unmodified baseline](../nuxt-icon-perf-remote-collection-dedup/README.md).
