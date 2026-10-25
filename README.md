# Unimport adaptive Vue template lookup

The Vue template addon searches the full import list for each `_ctx` reference. This fixture uses 5,000 imports and 300 references to reproduce the repeated scans. The fixed sibling starts indexing after lookup scans exceed four times the registry size, provided at least 16 references remain. It preserves getter-backed lookups.

Requires Node 24 or newer and pnpm 11.28.6. Recorded measurements used Node 24.21.0 on Linux.

```sh
git clone --branch repro/unimport-vue-template-lookup --single-branch https://github.com/onmax/repros.git
cd repros
pnpm install --frozen-lockfile
pnpm verify
```

The root verifier expects the baseline to exit 42 and the fixed fixture to exit 0. It checks identical generated code and source maps, then runs output comparisons and getter controls. Run `node verify.mjs` inside either sibling to test it alone. The verifier counts only lookup predicate calls on the transform's import array. It allows up to five passes through the registry before an index takes over. Timing runs do not instrument array methods.

Run the benchmark with:

```sh
pnpm bench
```

Median milliseconds per complete `createUnimport().injectImports()` call:

| Fixture | Before | After |
| --- | ---: | ---: |
| 50 imports, 5 references | 0.0268 | 0.0236 |
| 1,000 imports, 60 references | 0.2599 | 0.2863 |
| 5,000 imports, 300 references | 4.1812 | 1.6074 |
| 5,000 imports, 300 references to the first import | 0.4623 | 0.4939 |
| 5,000 imports, 20 references to the first import | 0.0417 | 0.0380 |
| 5,000 imports, 300 references, half missing | 4.8980 | 1.4323 |

Seven full-batch warmups precede eleven alternating before/after repetitions. `recorded-results.json` contains the original samples. A new run writes `benchmark-results.json`. These are synthetic transform fixtures, not full Nuxt build timings. Medium transforms were about 10% slower and 300 repeated early hits were about 7% slower in this run. The index is most useful when lookups scan many imports.

Both states use `unimport@7.0.2`. The addon source comes from [`unjs/unimport@bbd07768`](https://github.com/unjs/unimport/blob/bbd07768ddb4919205bcb5a3cbc06c3a2791981a/src/addons/vue-template.ts). Each fixture passes its source addon through the public addon API. The only adaptation outside the proposed change replaces relative utility and type imports with the package's public exports. Node strips the TypeScript types directly.

The fixed source uses the first matching alias, builds its index within the transform, and falls back to linear lookup for accessor-backed aliases or getters encountered while spreading an import. Getter controls cover read counts, short-circuiting and alias mutations. They do not establish equivalence for arbitrary Proxy traps or replaced built-ins.

The accompanying PR passed its eleven focused Vue-template tests, TypeScript check and file lint. This repro does not run the full upstream build or CI suite.
