# micromark 4.0.3: block quotes, nested lists and setext headings parse in quadratic time

Upstream: [micromark/micromark#246](https://github.com/micromark/micromark/issues/246), fix in [micromark/micromark#249](https://github.com/micromark/micromark/pull/249).

## Claim

Given the inputs from #246, `micromark(value)` on 4.0.3 takes 10 to 60 times as long as on 4.0.2 at 32 KB, and the time grows quadratically. Removing the two lines that #249 removes from `micromark-util-edit-map` brings 4.0.3 back to 4.0.2 times, with the same HTML.

The setext heading part of the regression lives in `micromark-core-commonmark` 2.0.4, not in `micromark` itself. `micromark@4.0.2` accepts `micromark-core-commonmark@^2.0.0`, so a fresh install of 4.0.2 today gets 2.0.4 and is as slow as 4.0.3 on setext headings. Pinning `micromark` to 4.0.2 alone does not avoid that part.

## Variants

Each variant is its own pnpm project with a lockfile, so the versions cannot drift.

| Directory | micromark | micromark-core-commonmark | micromark-util-edit-map |
| --- | --- | --- | --- |
| `variants/micromark-4.0.2` | 4.0.2 | 2.0.3 | none |
| `variants/micromark-4.0.2-core-2.0.4` | 4.0.2 | 2.0.4 | 1.0.0 |
| `variants/micromark-4.0.3` | 4.0.3 | 2.0.4 | 1.0.0 |
| `../micromark-4-0-3-slowdown-fix` | 4.0.3 | 2.0.4 | 1.0.0 with the #249 change as a `pnpm patch` |

## Run

```sh
git clone --branch repro/micromark-4-0-3-slowdown https://github.com/onmax/repros
cd repros/micromark-4-0-3-slowdown
node verify.mjs
```

Needs Node 24 and pnpm 12. `verify.mjs` runs `pnpm install --frozen-lockfile` in each variant, then `bench.mjs` once per variant in its own process (one warm-up, median of 5 runs, `RUNS=<n>` to change). It exits 1 unless 4.0.3 is at least 3 times slower than 4.0.2 on every 32 KB input and the patched 4.0.3 is within 1.5 times of 4.0.2 with the same HTML.

## Result

Node 24.21.0, Linux x86-64, shared machine, median of 5 runs, ms:

| Input | Size | 4.0.2 | 4.0.2 + core 2.0.4 | 4.0.3 | 4.0.3 + #249 |
| --- | ---: | ---: | ---: | ---: | ---: |
| `'> a\n\n'` repeated | 8 KB | 80 | 69 | 210 | 109 |
| | 16 KB | 115 | 113 | 1156 | 131 |
| | 32 KB | 232 | 223 | 5809 | 269 |
| `'- a\n  - b\n'` repeated | 8 KB | 57 | 56 | 116 | 76 |
| | 16 KB | 119 | 111 | 732 | 141 |
| | 32 KB | 213 | 289 | 2556 | 257 |
| `'a\n=\n'` repeated | 8 KB | 53 | 539 | 550 | 72 |
| | 16 KB | 103 | 3339 | 2649 | 113 |
| | 32 KB | 195 | 11154 | 11365 | 235 |
| Mixed sections from #246 | 32 KB | 18 | 20 | 22 | 21 |
| | 256 KB | 153 | 164 | 589 | 168 |

```text
Reproduced: 4.0.3 is at least 3x slower than 4.0.2 on every 32 KB input, and the #249 change restores 4.0.2 times with the same HTML.
```

No micromark release after 4.0.3 and no commit on `main` after it, as of 2026-11-17.
