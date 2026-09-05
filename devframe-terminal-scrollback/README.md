# Terminal scrollback

`@devframes/hub@0.9.12`: 10,000 chunks produce **9,000 discarded splice results before, 0 after**. The patch uses `shift()` for one-entry eviction and retains the same final 1,000 chunks. Upstream: [#361](https://github.com/devframes/devframe/pull/361).

[Before](https://github.com/onmax/repros/tree/repro/devframe-terminal-scrollback/devframe-terminal-scrollback) · [After](https://github.com/onmax/repros/tree/repro/devframe-terminal-scrollback/devframe-terminal-scrollback-fix)

Use Node **24.19.0** and Corepack. Each fixture pins **pnpm 10.33.0**; the control patches the same package version.

```sh
git clone --depth 1 --filter=blob:none --sparse --branch repro/devframe-terminal-scrollback https://github.com/onmax/repros.git terminal-repro
cd terminal-repro
git sparse-checkout set devframe-terminal-scrollback devframe-terminal-scrollback-fix
(cd devframe-terminal-scrollback && corepack pnpm install --frozen-lockfile --ignore-scripts && corepack pnpm verify)
(cd devframe-terminal-scrollback-fix && corepack pnpm install --frozen-lockfile --ignore-scripts && corepack pnpm verify)
```

`verify` checks the stated result. Add `--expect-fixed` to make the baseline fail and the control pass.

Uses the real stream pump with a recording RPC sink, without spawning a PTY. Timing varies; Node 24 showed no consistent speedup.
