# pnpm: adding a dependency to one project changes peer bindings in another

With pnpm 12.21.0, adding `is-number` (no dependencies, no peers) to one project of a 53-project workspace changes about 280 lockfile lines in other projects. The root project's `oxlint` loses its optional peer binding `oxlint-tsgolint@7.0.2001`, and the peer suffixes of `nuxt-nightly`, `nuxt-og-image`, `nuxt-schema-org` and others change in about 20 importers. Removing `is-number` again restores them.

## Verify

```sh
git clone --branch repro/pnpm-peer-binding-flips https://github.com/onmax/repros.git
cd repros/pnpm-peer-binding-flips
node verify.mjs
```

The script fetches the public workspace `vite-hub/vitehub` at commit `22199a7613d3a73784953f39ece7dfe2aafad8ba` into `workspace/`, then runs with `pnpm@12.21.0` (through `npx`):

1. `pnpm install --lockfile-only --ignore-scripts` to get the lockfile pnpm 12.21.0 writes for this commit.
2. `pnpm --filter @vite-hub/env add is-number@7.0.0 --lockfile-only --ignore-scripts`.

It compares the root project's `oxlint` entry in `pnpm-lock.yaml` before and after step 2, and exits 1 when they differ.

## Expected

Only the lines for `is-number` change (about 8 lines). The root project's peer bindings stay the same.

## Actual

```
root oxlint before: 1.86.0(oxlint-tsgolint@7.0.2001)(vite-plus@0.3.3(...))
root oxlint after:  1.86.0(vite-plus@0.3.3(...))
pnpm-lock.yaml added/removed lines: 146	141
```

Same result on 2 of 2 runs, Node 24.21.0, Linux. pnpm 12.16.1 shows the same churn (about 380 lines) on this workspace.

## Notes

- `npm_config_manage_package_manager_versions=false` keeps pnpm 12.21.0 from switching to the workspace's `packageManager` pin (12.16.1).
- `oxlint@1.86.0` declares `oxlint-tsgolint >=7.0.2003` as an optional peer. No project in the workspace depends on `oxlint-tsgolint`; `vite-plus@0.3.3` depends on `oxlint-tsgolint@7.0.2001`.
- A small workspace with only `oxlint` and `vite-plus` at the root does not show the change, so the full workspace stays.
