# Unstorage long memory TTL

In published `unstorage@2.0.0-alpha.10`, a 30-day memory TTL becomes a native Node timer delay of 2,592,000,000 ms. Node converts delays above 2,147,483,647 ms to 1 ms. Normal and raw entries therefore disappear almost immediately.

This branch contains the failing fixture and its patched sibling. Both use the identical verifier and published package. The sibling applies one committed pnpm patch to the memory driver.

Clone this branch and run the unattended comparison from its root:

```sh
git clone --branch repro/unstorage-long-ttl https://github.com/onmax/repros.git
cd repros
node compare.mjs
```

Install pnpm 11.28.3 first if it is unavailable. Each fixture pins that package manager and downloads Node 24.21.0 through `devEngines.runtime` during installation. `compare.mjs` performs frozen installs, runs each fixture's `pnpm verify`, and checks the expected failure signature before accepting the fixed result.

To run this failing fixture alone:

```sh
cd unstorage-long-ttl
pnpm install --frozen-lockfile && pnpm verify
```

Expected behavior is retention after 30 ms. Actual behavior is six `TimeoutOverflowWarning` warnings and `null` for all normal/raw monthly writes over three trials. The fixture exits 1 at its retention assertion. Short TTL expiry and no-TTL retention controls pass. The comparison exits 0 only when that exact failure and the fixed sibling's passing results occur.

The sibling's supplementary virtual clock checks drive actual driver callbacks through the first capped timer and the full deadline. They verify normal/raw proactive expiry, cancellation before and after rearming on overwrite/remove/clear/dispose, and unref of every chunk. Native timers establish the bug; virtual time avoids a 30-day wait.

The memory-driver source matches upstream [d1debd9](https://github.com/unjs/unstorage/blob/d1debd9addfabc16b1186f369a1cfbf840f20e02/src/drivers/memory.ts). [#759](https://github.com/unjs/unstorage/pull/759) introduced proactive cleanup. [Node's timer contract](https://nodejs.org/docs/latest-v24.x/api/timers.html#settimeoutcallback-delay-args) defines the overflow behavior. npm tarball integrity is pinned in both lockfiles. Executed output is in [verification.log](../verification.log), with local paths shortened.

This proves the alpha release on Node 24.21.0. Stable v1, Nitro releases, browsers, edge runtimes, and nonfinite TTL behavior are outside this claim.
