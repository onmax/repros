# Nested navigation scans

`@nuxt/content@3.16.0`: 5,000 pages under `/guide` require **12,502,499 comparisons before, 4,999 after**. The control indexes placeholders instead of scanning earlier siblings. Output order stays the same in the fixture.

Experimental. Duplicate-placeholder and metadata cases need broader coverage. Related work: [#3845](https://github.com/nuxt/content/pull/3845) and [#3592](https://github.com/nuxt/content/pull/3592). Uses the package's tree generator with a query stub; SQL and page-load performance are outside this check.

[Before](https://github.com/onmax/repros/tree/repro/nuxt-content-nested-navigation/nuxt-content-nested-navigation) · [After](https://github.com/onmax/repros/tree/repro/nuxt-content-nested-navigation/nuxt-content-nested-navigation-fix)

Use Node **24.19.0** and Corepack. Each fixture pins **pnpm 10.33.0**; the control patches the same package version.

```sh
git clone --depth 1 --filter=blob:none --sparse --branch repro/nuxt-content-nested-navigation https://github.com/onmax/repros.git navigation-repro
cd navigation-repro
git sparse-checkout set nuxt-content-nested-navigation nuxt-content-nested-navigation-fix
(cd nuxt-content-nested-navigation && corepack pnpm install --frozen-lockfile --ignore-scripts && corepack pnpm verify)
(cd nuxt-content-nested-navigation-fix && corepack pnpm install --frozen-lockfile --ignore-scripts && corepack pnpm verify)
```

`verify` checks the stated result. Add `--expect-fixed` to make the baseline fail and the control pass.
