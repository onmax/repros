# Agent instructions

This repository stores durable bug reproductions. Each top-level fixture should let a maintainer observe one reported failure without access to the original application.

## Reproduction work

Use [`$repro`](https://github.com/onmax/skills/tree/main/skills/repro) for every new or revised repro. The skill owns minimization, verification, before-and-after fixtures, StackBlitz setup, deployment, and the README handoff.

Put new fixtures in this repository unless the user names another location. Use `<library>-<issue>` for the failing state and `<library>-<issue>-fix` for a requested fixed control. Keep the same verification command in both directories.

Source checkouts for maintained Nuxt libraries usually live under `~/nuxt`. Read the target repository's instructions before copying code or creating patches.

Commit only the fixture directories named by the task. Other top-level directories may contain unfinished work from another session.

## Nuxt data-fetching fixtures

Use generic names such as `report`, `criteria`, `item`, `record`, and `/api/report` unless the issue requires an exact domain shape.

Treat these behaviors as separate variables:

- `lazy` controls whether navigation waits.
- `immediate: false` disables initial execution.
- `watch: false` disables reactive option and key execution.
- Preview mode and `refreshNuxtData()` control global refresh behavior.

For parent and child route refresh bugs, keep the parent fetch owner mounted with `v-show` and a child `<NuxtPage>`. State that the fixture tests registered async data rather than unmounted data.

Run custom Nuxt ports with `pnpm exec nuxt dev --host 127.0.0.1 --port <port>`. Passing the port through `pnpm dev -- --port` can make Nuxt treat it as the project root.
