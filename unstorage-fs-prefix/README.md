# Unstorage filesystem prefix listing

Given unstorage 1.17.5 or 2.0.0-alpha.10, 80 tenant directories and 3,200 cached files, `storage.getKeys('tenant-000')` returns 40 keys. Both filesystem drivers read 881 directories, including the other 79 tenants. A prefix-aware traversal needs 12 reads and returns the same keys.

## Run

Use Node **24.19.0** on Linux and pnpm **10.32.1**. No browser, server, account, or network is used after install.

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm verify
```

The default command asserts the state documented by this fixture. To demand the optimized behavior:

```sh
pnpm verify --expect-fixed
```

The demand fails in the baseline with `881 !== 12` and passes in the fixed sibling. Both directories use the same `verify.mjs`; `expectation.json` declares the fixture state. Package versions and transitive integrity hashes are locked. The verifier removes its temporary files and restores its filesystem probe in `finally`.

## Controls

Seven samples call the real public storage API and real filesystem drivers on files created by the verifier. The gate counts `fs.promises.readdir` calls. Times are printed but never used as a pass/fail threshold. Both drivers and both versions run 122 semantic cases for each import/require path (976 checks total): empty/missing base, prefix boundaries, slash/colon forms, root-relative `maxDepth`, ignored paths, unusual key names, empty directories, symlinks, alpha temporary-write file exclusion, and nested mount masking. The semantic oracle lists the root with the same options and applies the public base filter. Full listing remains 881 reads and returns 3,200 keys.

A missing tenant costs 881 reads before and one after. The dataset models per-tenant cache or document namespaces sharing a filesystem driver. This proves a library-level cost, not a measured ViteHub production slowdown. Real gains depend on namespace count and filesystem latency.

## Patch and history

The fix passes the base into the existing walker, skips directories outside that base, and leaves the root, key assembly, ignore rules, and depth decrement unchanged. It uses core key normalization so colon, slash, repeated separator, and query cases preserve existing behavior. The sibling `-fix` fixture contains the ESM and CJS pnpm patches created with `pnpm patch` and `pnpm patch-commit`. Stable publishes separate CJS files, which are patched and tested too. Alpha publishes only ESM; Node 24 require resolves that same output.

[Current upstream source](https://github.com/unjs/unstorage/blob/7f773be19216ee28790f00ae51c74ba06169c2ec/src/drivers/fs.ts) still ignores the base. [The fs-lite source](https://github.com/unjs/unstorage/blob/7f773be19216ee28790f00ae51c74ba06169c2ec/src/drivers/fs-lite.ts) has the same path. Source was checked on 2026-09-04.

[Closed PR #546](https://github.com/unjs/unstorage/pull/546) noticed this in 2024. Starting traversal directly at the base broke full-key tests. The maintainer welcomed a focused filesystem follow-up. This repro adds measured evidence and a patch that preserves the root. It does not claim the missed optimization was never discussed.

[PR #622](https://github.com/unjs/unstorage/pull/622) changed ignored-file path handling; [PR #751](https://github.com/unjs/unstorage/pull/751) addressed dot-prefixed paths; [PR #798](https://github.com/unjs/unstorage/pull/798) added atomic writes and hidden temporary files. These paths stay unchanged. [Open PR #807](https://github.com/unjs/unstorage/pull/807) changes `clear(base)` and core mount selection; this patch changes neither. GitHub issue/PR searches for `getKeys fs`, `prefix`, and `getKeys performance` found no open patch for filesystem prefix traversal.

Limits: verified on Linux only; timings include probe overhead and warm local filesystem caches. The pruning skips errors and ignore-callback calls in unrelated directories by design; callback side effects are not preserved. Alpha atomic file exclusion is checked, but concurrent writes are not stress-tested. Full listing still visits every directory and receives no work-count improvement. The patch skips prefix normalization when no base is requested.

This fixture is **unpatched**.

## Hosted fixtures

[Published behavior](https://github.com/onmax/repros/tree/repro/unstorage-fs-prefix/unstorage-fs-prefix) and [pnpm patch control](https://github.com/onmax/repros/tree/repro/unstorage-fs-prefix/unstorage-fs-prefix-fix) live on the same reproduction branch.
