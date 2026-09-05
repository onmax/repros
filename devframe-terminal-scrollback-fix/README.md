# Devframe terminal scrollback control

`@devframes/hub@0.9.12` discards a `splice` result for every chunk after its 1,000-entry terminal scrollback buffer fills. The control uses `shift()` when exactly one entry must be removed. Larger overflows still use `splice()`.

For 10,000 chunks, the baseline produces **9,000 discarded splice results**. The control produces **0**. Both retain the same final 1,000 chunks in the original buffer and forward all chunks in order.

```diff
 scrollback exceeds 1,000 entries by one
-  splice(0, 1), discard the returned array
+  shift()
 larger overflow
   keep splice()
```

This extends the same concern in [Devframe PR #361](https://github.com/devframes/devframe/pull/361). The package patch changes only the scrollback buffer. The PR also covers the separate RPC replay buffer.

[Before](https://github.com/onmax/repros/tree/repro/devframe-terminal-scrollback/devframe-terminal-scrollback) · [After](https://github.com/onmax/repros/tree/repro/devframe-terminal-scrollback/devframe-terminal-scrollback-fix)

## Run

Use Node **24.19.0** with Corepack and **pnpm 10.33.0**. Direct dependencies and the full dependency graph are pinned in `package.json` and `pnpm-lock.yaml`. The control applies a committed `pnpm patch` to the same package version.

Copy and run from a directory without `devframe-terminal-scrollback-repro`:

```sh
git clone --depth 1 --filter=blob:none --sparse --branch repro/devframe-terminal-scrollback https://github.com/onmax/repros.git devframe-terminal-scrollback-repro
cd devframe-terminal-scrollback-repro
git sparse-checkout set devframe-terminal-scrollback devframe-terminal-scrollback-fix
cd devframe-terminal-scrollback-fix
corepack pnpm install --frozen-lockfile --ignore-scripts && corepack pnpm verify
```

Then run the other state:

```sh
cd ../devframe-terminal-scrollback
corepack pnpm install --frozen-lockfile --ignore-scripts && corepack pnpm verify
```

`verify` asserts the documented result for the selected fixture and exits nonzero if that claim is false. To assert the desired improvement directly, run `corepack pnpm verify --expect-fixed`. That command must fail before the patch and pass after it. All checks stop on their own. There is no development server.

Both fixtures were checked after deleting their installed dependencies and installing from the frozen lockfile. The linked repository is the local Node fallback; no browser execution or StackBlitz result is claimed.

## Scope and provenance

The fixture imports the published `DevframeTerminalsHost` and feeds its real stream pump with a `ReadableStream`. A small RPC sink records forwarded chunks. It does not start a PTY process or connect a browser. Importing the hub preserves its Node package boundary.

Checks cover buffer identity, order, the 1,000-entry boundary, oversized supplied buffers, stream close, stream failure, and cancellation. The splice probe applies only to the session buffer. Timing runs disable that probe, take seven samples, discard two warmups, and report the median of five. Timing includes fixture assertions and depends on runtime and machine load. Samples varied across runs; the clean-install Node 24 comparison did not show a speedup. Node 22 and Node 26 samples were faster with the control. This does not establish a fixed speedup across runtimes. The deterministic result is the operation count, not a heap allocation measurement or a constant-time claim.

History: [#79](https://github.com/devframes/devframe/pull/79) introduced the scrollback bound. [#321](https://github.com/devframes/devframe/pull/321) exposed PTY session results. The control retains those behaviors. All six open Devframe PRs were checked on 2026-09-05; none except #361 addresses this eviction code.
