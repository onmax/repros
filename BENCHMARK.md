# Navigation timing

Compares the exact base and head of [Nuxt Content #3845](https://github.com/nuxt/content/pull/3845). Commit IDs are pinned in [bench.mjs](bench.mjs).

Use Node 24.19.0 and Corepack:

```sh
git clone --depth 1 --branch repro/nuxt-content-nested-navigation https://github.com/onmax/repros.git navigation-bench
cd navigation-bench
(cd nuxt-content-nested-navigation && corepack pnpm install --frozen-lockfile --ignore-scripts)
node --expose-gc bench.mjs > bench-results.json
```

The script downloads the original TypeScript files from both commits, strips types with Node, and uses the same locked `scule` dependency. It asserts equal trees for every input. Each case uses five warmups and 25 timed samples per version, with alternating execution order. Input cloning and forced garbage collection occur before timing. SQL, downloads, imports, and page loading are excluded. Garbage collection during a timed call is included.

These are local microbenchmarks on a shared Linux machine. Timings vary with hardware and load. [Raw samples and environment](bench-results.json).

Recorded on Node v24.19.0, linux, AMD EPYC 7452 32-Core Processor. Values are medians; brackets show the middle 50% of samples.

| Layout | Pages | Before, ms | After, ms |
| --- | ---: | ---: | ---: |
| root | 100 | 0.46 [0.41, 0.49] | 0.28 [0.26, 0.32] |
| root | 1,000 | 18.95 [13.68, 25.34] | 4.47 [2.90, 6.37] |
| root | 5,000 | 456.95 [360.74, 635.49] | 25.51 [22.16, 30.94] |
| root | 10,000 | 4040.94 [2951.60, 5117.98] | 89.90 [69.11, 101.19] |
| nested | 100 | 0.60 [0.45, 1.19] | 0.49 [0.43, 0.66] |
| nested | 1,000 | 31.81 [23.18, 37.03] | 10.78 [7.56, 14.50] |
| nested | 5,000 | 540.71 [457.49, 634.19] | 40.55 [33.68, 47.00] |
| nested | 10,000 | 2314.71 [1862.19, 2772.73] | 60.13 [49.13, 83.15] |
