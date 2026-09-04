# Devframe replay buffer allocates an unused array on every eviction

`devframe@0.9.12` uses `splice(0, 1)` to evict one old stream chunk. The returned array is discarded. The patched control uses `shift()` for this exact case and keeps the original operation for all other overflow values.

This fixture calls the published `devframe/utils/streaming-channel` API. It does not copy the stream implementation. The problem is in stream replay storage, not Markdown rendering.

## Run

Use Node **24.19.0** and pnpm **10.33.0** on Linux:

```sh
corepack pnpm install --frozen-lockfile && corepack pnpm verify
```

The command confirms the published behavior and exits zero. To assert the desired behavior instead, run `corepack pnpm verify --expect-fixed`. That assertion fails here and passes in the fixed sibling.

Expected: retain the last 1,000 chunks in order without allocating a result array for each evicted chunk.

Observed: 10,000 writes create **9,000 discarded arrays**. The fixed control creates **zero**. Both retain the same chunks and sequence numbers.

The verifier also checks buffer identity, synchronous event order, numeric replay-window boundaries, duplicate replay, close, error, cancellation and `WritableStream` piping. All 16 control groups pass in both states. Timing workers run without array-method instrumentation.

## Measurement

Five fresh Node processes per cell, each writing 100,000 identical terminal chunks. These are CPU measurements of the sink, not end-to-end terminal or network latency. Initial measurements on this machine:

| Retained chunks | Published median | Patched median |
| --- | ---: | ---: |
| 256 | 144.93 ms | 21.63 ms |
| 1,000 | 527.67 ms | 24.83 ms |
| 5,000 | 2,214.90 ms | 29.65 ms |

Timing varies with JIT state, Node version and machine load. The verifier reports timings without a speed threshold. Its pass/fail signal is the count of discard-producing `splice()` calls plus equivalent outputs and lifecycle behavior. The counter observes API calls, not physical heap allocations. The speed difference can also include engine optimizations of `shift()`. `shift()` is still engine-dependent; this patch does not claim constant-time eviction or a new ring-buffer API. Replay is disabled by default in the low-level API, so this optimization applies only when callers enable it.

## Provenance and history

Checked 4 September 2026:

- [Published source at v0.9.12](https://github.com/devframes/devframe/blob/v0.9.12/packages/devframe/src/utils/streaming-channel.ts#L150-L155). Dependency and transitive versions are pinned by the lockfile.
- [Current upstream at 6ba7c591](https://github.com/devframes/devframe/blob/6ba7c5911b0dde98e814b71076511b28cd0afd57/packages/devframe/src/utils/streaming-channel.ts#L150-L155) still has the same operation.
- The [hub terminal uses a 1,000-chunk replay window](https://github.com/devframes/devframe/blob/6ba7c5911b0dde98e814b71076511b28cd0afd57/packages/hub/src/node/host-terminals.ts#L31). The [terminal plugin default is 5,000](https://github.com/devframes/devframe/blob/6ba7c5911b0dde98e814b71076511b28cd0afd57/plugins/terminals/src/node/constants.ts#L41). These defaults determine the larger benchmark inputs.
- [PR #1](https://github.com/devframes/devframe/pull/1) imported the stream implementation from the Vite DevTools monorepo. The subsequent file-history change, [PR #333](https://github.com/devframes/devframe/pull/333), concerns linting. Existing [stream tests](https://github.com/devframes/devframe/blob/6ba7c5911b0dde98e814b71076511b28cd0afd57/packages/devframe/src/utils/streaming-channel.test.ts) require ordered replay, monotonic sequence numbers, and lifecycle behavior; the control keeps those contracts.
- Issue searches for `replay` and PR searches for `stream performance` and `ring buffer` found no matching proposal. This is a search result, not proof that no related discussion exists. No upstream issue or PR was opened for this candidate.

## Fixed control

[Patched fixture](https://github.com/onmax/repros/tree/repro/devframe-replay-buffer-eviction/devframe-replay-buffer-eviction-fix) uses the same package version and verifier with a committed `pnpm patch`. The patch changes only the eviction operation. Buffer identity, contents, public API, and fallback eviction behavior stay the same.

For a sparse checkout:

```sh
git clone --depth 1 --filter=blob:none --sparse --branch repro/devframe-replay-buffer-eviction https://github.com/onmax/repros.git
cd repros
git sparse-checkout set devframe-replay-buffer-eviction devframe-replay-buffer-eviction-fix
cd devframe-replay-buffer-eviction
corepack pnpm install --frozen-lockfile && corepack pnpm verify
cd ../devframe-replay-buffer-eviction-fix
corepack pnpm install --frozen-lockfile && corepack pnpm verify
```

No server, browser, account, secret, or deployment is required. Each timing worker has a 30-second timeout and exits on completion.
