# Agent instructions

This repository stores durable bug reproductions. Each reproduction branch should let a maintainer observe one reported failure and compare it with a patched control without access to the original application.

## Reproduction work

Use [`$repro`](https://github.com/onmax/skills/tree/main/skills/repro) for every new or revised repro. The skill owns minimization, verification, before-and-after fixtures, StackBlitz setup, deployment, and the README handoff.

Treat the commit that adds this policy as the final direct change to `main`. After that commit, start each task from updated `main` on its own `repro/<library>-<issue-or-slug>` branch. A branch owns one reproduction only. Existing fixtures and their URLs on `main` are historical and stay unchanged unless the user requests a named migration.

Put the failing fixture in `<library>-<issue-or-slug>` and its fixed control in `<library>-<issue-or-slug>-fix` on the same branch. Build the fixed control with a [`pnpm patch`](https://pnpm.io/cli/patch) against the same pinned dependency version. Keep application code and the verification command identical where the bug permits it, so the patch is the tested variable.

Commit only the branch's failing fixture, fixed fixture, patch file, and task-specific documentation. Keep generated output and unrelated main fixtures out of the diff. Push the reproduction branch only when requested. Create GitHub issues or pull requests only when the user explicitly requests them.

Each fixture README must name the affected package and version, link to the upstream project, give a clean install and verification command, and state the expected and observed result. New fixture links must use the reproduction branch rather than `main`. Leave historical `main` links unchanged.

Before handoff, install from a clean dependency state. Prove that the failing fixture exposes the bug and that the fixed fixture passes the same check. Record stable output or measurements in the README, then inspect the branch diff against `main` to confirm it contains one task.

Source checkouts for maintained Nuxt libraries usually live under `~/nuxt`. Read the target repository's instructions before copying code or creating patches.

Other top-level directories may contain historical or unfinished work from another session. Treat them as read-only context.

## Nuxt data-fetching fixtures

Use generic names such as `report`, `criteria`, `item`, `record`, and `/api/report` unless the issue requires an exact domain shape.

Treat these behaviors as separate variables:

- `lazy` controls whether navigation waits.
- `immediate: false` disables initial execution.
- `watch: false` disables reactive option and key execution.
- Preview mode and `refreshNuxtData()` control global refresh behavior.

For parent and child route refresh bugs, keep the parent fetch owner mounted with `v-show` and a child `<NuxtPage>`. State that the fixture tests registered async data rather than unmounted data.

Run custom Nuxt ports with `pnpm exec nuxt dev --host 127.0.0.1 --port <port>`. Passing the port through `pnpm dev -- --port` can make Nuxt treat it as the project root.
