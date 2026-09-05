# Unchanged state notifications

`devframe@0.9.12`: 1,000 same-value writes emit **1,000 notifications before, 0 after**, with Immer patches enabled or disabled. The control skips notification when the state object stays the same.

Upstream: [Devframe](https://github.com/devframes/devframe). The fixture counts utility events and checks the first RPC snapshot, replay suppression, and later replacements. It does not measure network traffic.

[Before](https://github.com/onmax/repros/tree/repro/devframe-unchanged-state/devframe-unchanged-state) · [After](https://github.com/onmax/repros/tree/repro/devframe-unchanged-state/devframe-unchanged-state-fix)

Use Node **24.19.0** and Corepack. Each fixture pins **pnpm 10.33.0**; the control patches the same package version.

```sh
git clone --depth 1 --filter=blob:none --sparse --branch repro/devframe-unchanged-state https://github.com/onmax/repros.git state-repro
cd state-repro
git sparse-checkout set devframe-unchanged-state devframe-unchanged-state-fix
(cd devframe-unchanged-state && corepack pnpm install --frozen-lockfile --ignore-scripts && corepack pnpm verify)
(cd devframe-unchanged-state-fix && corepack pnpm install --frozen-lockfile --ignore-scripts && corepack pnpm verify)
```

`verify` checks the stated result. Add `--expect-fixed` to make the baseline fail and the control pass.
