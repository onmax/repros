# Nuxt Content nested navigation scans control

`@nuxt/content@3.16.0` scans earlier siblings when adding pages under `/guide`, even when all sibling paths differ. The experiment uses a per-call index of placeholder nodes to avoid repeating that scan.

| Nested pages | Before comparisons | After comparisons |
| --- | ---: | ---: |
| 100 | 5,049 | 99 |
| 1,000 | 500,499 | 999 |
| 5,000 | 12,502,499 | 4,999 |

The remaining comparisons locate the root parent. The fixture checks the exact child order and parent shape.

```diff
 append a nested page
- scan previous siblings for a matching placeholder
+ index newly appended siblings, look up the placeholder
```

**Experimental control, held from upstream submission.** [Nuxt Content #3845](https://github.com/nuxt/content/pull/3845) already removes a separate unused scan for root pages. [#3592](https://github.com/nuxt/content/pull/3592) changes this helper for abort signals. This experiment changes nested placeholder indexing and needs broader review before it should extend either patch.

[Before](https://github.com/onmax/repros/tree/repro/nuxt-content-nested-navigation/nuxt-content-nested-navigation) · [After](https://github.com/onmax/repros/tree/repro/nuxt-content-nested-navigation/nuxt-content-nested-navigation-fix)

## Run

Use Node **24.19.0** with Corepack and **pnpm 10.33.0**. Direct dependencies and the full dependency graph are pinned in `package.json` and `pnpm-lock.yaml`. The control applies a committed `pnpm patch` to the same package version.

Copy and run from a directory without `nuxt-content-nested-navigation-repro`:

```sh
git clone --depth 1 --filter=blob:none --sparse --branch repro/nuxt-content-nested-navigation https://github.com/onmax/repros.git nuxt-content-nested-navigation-repro
cd nuxt-content-nested-navigation-repro
git sparse-checkout set nuxt-content-nested-navigation nuxt-content-nested-navigation-fix
cd nuxt-content-nested-navigation-fix
corepack pnpm install --frozen-lockfile --ignore-scripts && corepack pnpm verify
```

Then run the other state:

```sh
cd ../nuxt-content-nested-navigation
corepack pnpm install --frozen-lockfile --ignore-scripts && corepack pnpm verify
```

`verify` asserts the documented result for the selected fixture and exits nonzero if that claim is false. To assert the desired improvement directly, run `corepack pnpm verify --expect-fixed`. That command must fail before the patch and pass after it. All checks stop on their own. There is no development server.

Both fixtures were checked after deleting their installed dependencies and installing from the frozen lockfile. The linked repository is the local Node fallback; no browser execution or StackBlitz result is claimed.

## Scope and provenance

The fixture imports the navigation generator from the installed package. A query-builder stub returns cloned rows in caller order. No Nuxt application or SQL database is involved. This preserves the tree-building boundary but does not measure an end-to-end page load or database performance.

The comparison probe temporarily wraps `Array.prototype.find` predicates while one generator call runs and restores it in `finally`. It counts comparisons, not wall time or memory. Controls check both parent-index insertion orders, duplicate paths, hidden directories, and empty collections.

The index is local to one generator call and retains references to placeholders. It checks newly appended entries and refreshes a cached entry if a merge turns it into a real page. Arbitrary navigation metadata, all duplicate-placeholder histories, and memory tradeoffs are not covered. This is evidence for further work, not a production-ready patch.

History: [#2959](https://github.com/nuxt/content/pull/2959) changes index-page merging and [#2974](https://github.com/nuxt/content/pull/2974) preserves caller ordering. Both guide the fixture's controls. All thirteen open Content PRs were checked on 2026-09-05. No new upstream PR was opened.
