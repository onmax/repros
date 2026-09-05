# Cache lookup copying

Written by an AI agent for onmax. Not reviewed by a human. Private local reproduction and fix comparison; no upstream submission.

With a valid retained parser cache, real Nuxt module startup indexes all cache rows with a growing object spread. The fixed sibling builds that lookup once with Object.fromEntries.

The untouched current release has an additional correctness defect: its unawaited cache DELETE runs after INSERT on the default db0 0.4 better-sqlite3 connector and erases the new cache row. This fixture keeps that original behavior directly runnable. `ordering.patch` is an explicit, shared prerequisite control for the performance comparison. It awaits DELETE before INSERT. It is applied in both siblings; `fix.patch` is applied only in the fixed sibling. No cache rows are fabricated. Warm caches are populated by the actual Content parser through the ordering control.

This is the ordering-only control, paired with `../nuxt-content-perf-cache-index-fix`. The comparison therefore measures ordering-only versus ordering plus the candidate optimization. It does not claim that an untouched fresh Content 3.16.0 startup naturally retains its cache, or attribute the ordering repair to batching/indexing.

Pinned environment is Node 24.19.0, pnpm 11.22.0, Nuxt 4.5.2, @nuxt/content 3.16.0 and better-sqlite3 12.11.1. The lockfile resolves Content's db0 to 0.4.1. Research source is nuxt/content `656a5ce1a8cb6af0b37dd577bf4e1522e03e3c11`; the actual tested artifact is the npm 3.16.0 tarball pinned by lockfile integrity. There is no custom SQLite journal, synchronous or transaction setting in the application configuration.

From this directory, install and verify unattended:

```sh
corepack pnpm install --frozen-lockfile && corepack pnpm verify
```

Run the untouched-original correctness control with the same installed packages:

```sh
corepack pnpm verify:original
```

That command skips both local patches, starts and restarts a real 30-document Content application and asserts 30 content rows but zero retained document-cache rows after both runs. All 30 files are parsed again on the second startup. SQL traces record INSERT-before-DELETE order. It exits successfully only when that current-release defect is reproduced.

`verify` generates representative Markdown pages, copies the installed Content package to `.instrumented-content`, applies the disclosed control/candidate patches there, then calls Nuxt's actual `loadNuxt` in development mode through Content's normal `modules:done` hook. It does not launch Vite or a browser. `loadNuxtMs` covers full Nuxt module initialization; `processWallMs` also includes process imports, output verification and cleanup. Neither is a full ready-to-serve development-server measurement. Watchers, telemetry, devtools and the unrelated llms integration are disabled equally in all states.

The default command verifies a 300-document warm startup. Expected work is 45,150 existing-property copies in the ordering-only control and zero in the index fix, with all 300 files loaded from the real cache. There is no hard elapsed-time assertion.

For the complete comparison, install both sibling directories, then run either sibling's benchmark command:

```sh
corepack pnpm benchmark
```

The durable runner uses one unreported warmup and five measured runs per sibling, alternating which sibling goes first in each pair. It measures 300 and 1,000-document warm starts. It holds `/tmp/nuxt-perf-benchmark.lock` for the sequence. `verify` acquires that same lock when run on its own. Child processes have timeouts and Nuxt closes its resources. No package store files are edited.

Raw worker JSON, SQL event timings/order, command logs and comparison medians are retained under `artifacts/`. Each worker validates every content row's id/title/path, parses every body, validates stored cache checksums against the exact checksums computed by the real parser path, and validates the database version row. The pair runner compares SHA256 digests of all ordered content-table rows and parsed-cache values, plus the version row. Cache checksum digests naturally differ across sibling roots because collection hashing includes the source directory; each side's exact checksums are independently asserted, not compared after arbitrary normalization. Raw JSON retains the expected per-document checksums.

Index timing includes only building the lookup, excluding the database query. Full module initialization includes parsing, plugins and other startup work; its difference is not attributable to this index patch alone. All filesystem latency is specific to the recorded machine and storage. Results do not establish D1, Bun or alternate connector behavior.

Review `ordering.patch` separately from the fixed sibling's `fix.patch`. `scripts/prepare.mjs` applies them to a local copy before adding identical counters and timers. It mirrors normal pnpm dependency resolution, including hoisted dynamic Markdown plugins such as remark-emoji. The generated Markdown corpus and local SQLite/cache directories are fixture-owned and may be reset by the verifier.

## Recorded comparison

These five-run medians were captured on the recorded shared machine, after one warmup and with alternating pair order. The control includes the disclosed ordering repair.

| Scenario | Affected stage, control / fix | loadNuxt, control / fix |
| --- | ---: | ---: |
| warm, 300 documents | 10.30 / 0.76 ms | 2324.47 / 1787.37 ms |
| warm, 1000 documents | 336.85 / 5.62 ms | 5909.26 / 2498.15 ms |

The actual indexing work became cheaper. Full startup fluctuated much more than the indexing span, so the larger full-startup differences are not attributed to this one-line change. The result remains conditional on a valid retained cache or the separately reviewed ordering repair.

Complete five-run data is in `../nuxt-content-perf-cache-index/artifacts/comparison/summary.json`, with individual SQL traces and correctness digests in both siblings. All four final fixtures also passed the documented command after deleting node_modules and performing a clean frozen reinstall. See `artifacts/clean-install-validation.json`; original package and patch hashes still match the benchmark.

## Current source update

The local source patch targets Content main `656a5ce1a8cb6af0b37dd577bf4e1522e03e3c11`. It changes only the index expression; the ordering repair remains a separate prerequisite for this application's warm-cache control. The shared `ordering.patch` now uses an awaited statement instead of returning its promise, matching the independently prepared source fix. Historical measurements retain their original patch hashes.

```diff
 fetchDevelopmentCache
   rows = SELECT all cache rows
-  for each row: copy all previous entries into a new object
+  build one object from (id, row) entries
```

Both shapes preserve an ordinary object, complete row values, last duplicate wins, and own properties for `__proto__` and `constructor`. Current source unit coverage exercises these through the real `getLocalDatabase` helper and its connector injection seam. See `source-index.patch` for the independently applicable source change.

The native better-sqlite3 persistence boundary requires Node. StackBlitz/WebContainers use a different SQLite connector and do not establish this measured comparison; these fixtures remain verified local repository artifacts without published browser URLs.

Current source acceptance also ran this same application verifier against the freshly built local source package, then against a control reverting only the emitted index expression. Both use the same application root, dependency versions and shared ordering prerequisite. All output and checksum digests match exactly; property copies are 45,150 versus zero for 300 cached documents. `artifacts/current-built-source/` retains raw outputs and build/control provenance. These single acceptance runs under heavy machine load are not new benchmark medians. Refreshed clean-install evidence for the published-package pair is in `artifacts/current-source-update-validation.json`.
