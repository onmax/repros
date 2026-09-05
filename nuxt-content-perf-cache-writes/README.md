# Bounded development-cache transactions

Written by an AI agent for onmax. Not reviewed by a human. Reproduction and local fix comparison; no upstream submission.

Given Content 3.16.0 on persistent SQLite with cache ordering repaired, when a Markdown configuration change invalidates 300 documents, the baseline executes 600 parser-cache DELETE/INSERT statements outside explicit transactions. The fixed control commits those writes in 12 batches, using the existing groups of at most 25 parsed documents. **The current bounded fix reduces native database time, but has not established a reliable overall startup improvement.**

This is the ordering-only baseline, paired with [the bounded fix](../nuxt-content-perf-cache-writes-fix/README.md).

The SQLite change is:

```diff
 each group of up to 25 documents
   parse documents concurrently
-  write each cache row during parsing
+  queue the new serialized cache values
+  after parsing: BEGIN → write queued rows → COMMIT
+  on write/commit failure: ROLLBACK → rethrow original error
```

Parsing never runs inside the cache transaction. Empty queues open no transaction. Atomicity covers one chunk; earlier successful chunks remain cached if a later chunk fails. D1 keeps its existing unawaited single-write caller inside the parser tasks, with no added transaction or change to its completion/error policy. This fixture measures the default native better-sqlite3 path, not D1 performance.

## Ordering prerequisite and provenance

Untouched Content 3.16.0 has a separate cache-loss defect: its unawaited DELETE can execute after INSERT through the asynchronous db0 connector, erasing the newly cached document. Both comparison siblings apply `ordering.patch`, which waits for DELETE before INSERT. Only the fixed sibling applies its separate `fix.patch`. The untouched package remains runnable with `verify:original`; no cache rows are fabricated. Content's actual parser populates the caches used by the comparison.

Pins are Node 24.19.0, pnpm 11.22.0, Nuxt 4.5.2, @nuxt/content 3.16.0, better-sqlite3 12.11.1 and lockfile-resolved db0 0.4.1. The default tested artifact is the npm Content tarball pinned by lockfile integrity. SQLite settings are unchanged by the fixture; recorded runs used `journal_mode=delete` and `synchronous=2`.

The matching local source change is `ce1884c69ead198c27eae897f38d6321b6d9f396`, based on Content main at [`656a5ce1a8cb6af0b37dd577bf4e1522e03e3c11`](https://github.com/nuxt/content/tree/656a5ce1a8cb6af0b37dd577bf4e1522e03e3c11). See [source.patch](../nuxt-content-perf-cache-writes-fix/source.patch) and [source-provenance.json](../nuxt-content-perf-cache-writes-fix/source-provenance.json). The source patch requires the separate ordering repair, local commit `f6d4b29b48d9ec3189d4afd1fd20eac0d450c7fc`; it does not include that prerequisite. The source build used its own frozen repository dependencies, including db0 0.4.0 and better-sqlite3 12.10.0.

This targets the current v3 implementation on main. The public [v4 source at `98c47c6`](https://github.com/nuxt/content/tree/98c47c6067c7b027fa0325f547ad075abf2b0557) replaces these paths with `@comark/cms`. No v4 applicability is claimed.

## Run the reproduction

Use native Linux with `flock` and the pinned Node runtime. This CLI is the runnable fallback: StackBlitz has not been verified against the native SQLite durability and failure boundary, so there is no browser reproduction link.

From this directory:

```sh
corepack pnpm install --frozen-lockfile && corepack pnpm verify
```

The same verifier runs in both siblings. It copies the installed Content package to `.instrumented-content`, applies the disclosed patches to that copy, and loads a real Nuxt development application through Content's normal `modules:done` hook. Shared package-store files stay untouched. The default 30-document cold run asserts 60 cache DELETE/INSERT statements outside a transaction in the baseline, or inside two chunk transactions in the fix. The fixed verifier also injects a failure on the fifth real cache INSERT, checks rollback of the preceding four writes in that first chunk, and checks propagation of the original Error object. There is no elapsed-time pass threshold.

Run the untouched-package control with the same installed dependencies:

```sh
corepack pnpm verify:original
```

It starts the actual 30-document application twice and succeeds only when both starts retain 30 content rows but zero document-cache rows, parsing all documents again on restart. SQL traces establish INSERT-before-DELETE ordering.

Install both sibling directories before running the paired benchmark:

```sh
corepack pnpm benchmark
```

The full command covers cold starts with 30 and 300 documents, plus 300 documents invalidated by a real Markdown configuration change. To repeat only the currently recorded bounded comparison:

```sh
BENCHMARK_SCENARIO=invalidated corepack pnpm benchmark
```

The runner uses one unreported warmup per state and five measured pairs, alternating state order. Commands share `/tmp/nuxt-perf-benchmark.lock`, close Nuxt resources and time out child processes. The lock cannot exclude unrelated machine jobs. Watchers, telemetry, devtools and llms integration are disabled equally. The generated Markdown corpus and local database are fixture-owned and may be reset.

`loadNuxtMs` measures complete module initialization, not Vite or server-ready startup. `processWallMs` also includes imports, verification and cleanup. The native-cache subtotal includes actual cache DELETE/INSERT/continuation calls and every cache batch's BEGIN/COMMIT, excluding parsing and queue bookkeeping. Content rows, parsed cache values and version information must match across each pair. Each worker checks its exact parser checksums separately because collection hashes contain sibling-specific source paths.

An optional local-source check can replace the package distribution with a separately built Content `dist` directory:

```sh
CONTENT_SOURCE_DIST=/absolute/path/to/content/dist corepack pnpm verify
```

This bypasses both fixture package patches. Supply an ordering-only source build for the baseline, or an ordering-plus-batching source build for the fixed sibling. The imported distribution path and module hash are recorded. This override is not required for a fresh default install and is not a portable source-build command.

Current revision validation is in [the baseline record](../nuxt-content-perf-cache-writes/artifacts/final-bounded-validation.json) and [the fixed record](../nuxt-content-perf-cache-writes-fix/artifacts/final-bounded-validation.json), including current script and patch hashes. Both frozen installs and final package verifiers completed successfully: the baseline recorded 60 cache statements outside transactions, the fix recorded all 60 inside two batches, and its rollback check passed. The separately [verified source build](../nuxt-content-perf-cache-writes-fix/artifacts/current-source-bounded/provenance.json) also completed successfully and matched the package control's output. These are correctness checks, not additional timing samples.

## Current bounded results

The [recorded bounded comparison](../nuxt-content-perf-cache-writes/artifacts/comparison-bounded/summary.json) contains five measured pairs for 300 invalidated documents:

| Median | Ordering-only baseline | Bounded fix |
| --- | ---: | ---: |
| Native cache database work, including commit | 2,850.709 ms | 131.103 ms |
| Nuxt module initialization | 9,757.875 ms | 10,156.935 ms |
| Explicit cache batches | 0 | 12 |

All paired outputs matched. The fixed version initialized faster in only three of five pairs, and its module-init median was slower. Extreme unrelated machine load limits timing interpretation. The SQL phase improvement is measurable; **no reliable overall startup win is established for this bounded design**.

The older [comparison artifact](../nuxt-content-perf-cache-writes/artifacts/comparison/summary.json) records the earlier whole-startup queue and one transaction. Its invalidated-case module-init result, 5.06 → 3.22 seconds, is historical evidence for that different design. It does not describe the current `fix.patch`, and its old patch hashes and clean-install records do not validate this revision.

## Queue memory control

With both siblings installed, run:

```sh
corepack pnpm verify:memory
```

This uses the fixed sibling for both states, comparing the current chunk flush with an experimental whole-startup flush. It does not compare against the unpatched package. Three counterbalanced pairs process 300 documents, each extended with 100 paragraphs. All six recorded runs passed, with exactly equal output and total serialized cache payload. See [raw memory results](../nuxt-content-perf-cache-writes/artifacts/memory-bounded/summary.json).

| Queue measurement | Whole-startup control | Bounded fix |
| --- | ---: | ---: |
| Peak queued entries | 300 | 25 |
| Peak queued UTF-8 payload bytes | 3,334,440 | 277,925 |
| Total serialized UTF-8 payload bytes | 3,334,440 | 3,334,440 |

These counts describe retained serialized payload, not JavaScript heap allocation. Strings, array entries and object overhead differ from UTF-8 byte counts; existing Content data and generated SQL also remain in memory. A 25-entry bound is not a byte limit for unusually large documents.

Each fresh child records process peak RSS with `process.resourceUsage().maxRSS` and a `process.memoryUsage()` snapshot after initialization. Whole-startup peak RSS ranged from 545,564 to 605,540 KiB; bounded peak RSS ranged from 542,036 to 567,956 KiB. The ranges overlap, and the snapshot is not peak heap usage. These observations do not establish a precise process-memory saving attributable to batching.
