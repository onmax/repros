# Nuxt Content navigation sibling scan fixed

This is the patched control. The one-line patch skips the sibling search for ordinary root pages. Given `@nuxt/content@3.16.0` and 1,000 ordinary root pages, navigation generation should not compare sibling paths when it does not use the result. The published code performs 499,500 such comparisons. Output stays identical when the search runs only for index pages.

## Run

Use Node 24.19.0 and pnpm 10.33.0:

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm verify
```

The script imports the actual installed runtime generator. A small query builder supplies already loaded rows, matching the upstream unit-test boundary. It starts no server, uses no database, and makes no network requests after installation. Ignored install scripts are unrelated to this pure tree-building path.

`pnpm verify --expect-fixed` asserts the desired behavior. It passes here with zero unused sibling comparisons. Both sibling fixtures contain the same verifier.

## Results

Measured on Linux x64, Node 24.19.0. Timings are medians of seven measured calls after one warmup. Input cloning and comparison instrumentation are excluded from timings. Exact work counts determine pass/fail.

| Root pages | Published comparisons | Patched comparisons | Published time | Patched time |
| --- | ---: | ---: | ---: | ---: |
| 100 | 4,950 | 0 | 0.334 ms | 0.220 ms |
| 1,000 | 499,500 | 0 | 8.888 ms | 1.542 ms |
| 5,000 | 12,497,500 | 0 | 203.305 ms | 7.153 ms |

The verifier checks 184 output comparisons against the published algorithm, including default and explicit order, root and nested index pages, index-before-child and child-before-index, duplicate paths, hidden directories, and navigation metadata. The fixed control changes only the condition before the root sibling lookup. Its oracle removes that condition in memory; it does not replace the installed module under test.

## Provenance and past behavior

- Package: [`@nuxt/content@3.16.0`](https://www.npmjs.com/package/@nuxt/content/v/3.16.0), with full dependency lockfile.
- Current source checked at [`656a5ce`](https://github.com/nuxt/content/blob/656a5ce1a8cb6af0b37dd577bf4e1522e03e3c11/src/runtime/internal/navigation.ts#L98), 4 September 2026. It retains this scan.
- The public [server navigation API](https://github.com/nuxt/content/blob/656a5ce1a8cb6af0b37dd577bf4e1522e03e3c11/src/runtime/server.ts#L23), client API and surrounding-page generator use this runtime helper.
- [PR #2959](https://github.com/nuxt/content/pull/2959) added duplicate index merging. Index pages still use the original search and merge.
- [PR #2974](https://github.com/nuxt/content/pull/2974) preserves caller order. The patch does not sort or reorder results.
- [Navigation file history](https://github.com/nuxt/content/commits/main/src/runtime/internal/navigation.ts) shows the last source change in June 2025. Issue/PR searches for `navigation performance`, `navigation slow` and `navigation` found no matching open fix on 4 September 2026. [PR #2675](https://github.com/nuxt/content/pull/2675) addresses an older development cache path and does not fix this generator.

ViteHub declares `@nuxt/content` in its docs package and uses Docus. That establishes a relevant dependency, not an observed ViteHub slowdown. This fixture demonstrates the library behavior using a larger flat collection.

## Limits

The gain applies to ordinary pages directly under `/`. Nested sibling and parent scans remain. SQL, Nuxt rendering, caching and end-to-end page speed are not measured. Timings vary by machine. Skipping the search preserves behavior for normal database rows; Proxy getter side effects are outside the supported row contract.

The patch was created with `pnpm patch @nuxt/content@3.16.0` and `pnpm patch-commit`. It is applied from `patches/` during installation. No upstream source repository was changed.

## Hosted fixtures

[Published behavior](https://github.com/onmax/repros/tree/repro/nuxt-content-navigation-scan/nuxt-content-navigation-scan) and [pnpm patch control](https://github.com/onmax/repros/tree/repro/nuxt-content-navigation-scan/nuxt-content-navigation-scan-fix) live on the same reproduction branch.
