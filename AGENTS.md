# Agent instructions

This repository stores durable bug reproductions. Each branch owns one reported failure and its controls.

## Repository workflow

Keep `main` limited to this file and a short README explaining the branches without links. Never merge reproduction branches into `main`.

Use `$repro` from `onmax/skills` for new or revised reproductions. It owns minimization, verification, controls, StackBlitz setup, deployment, and fixture documentation.

Start a new reproduction from updated `origin/main` on `repro/<library>-<issue-or-slug>`. Revise an existing reproduction on its existing branch. Use a separate worktree when other work has local changes.

Put the failing fixture in `<library>-<issue-or-slug>/` and a requested fixed control in `<library>-<issue-or-slug>-fix/` on the same branch. Preserve published directory names. Use the same verification command for both states.

Commit only the branch's fixtures and supporting files. Keep installed dependencies, build output, local state, tool caches, and dependency backups out of Git. Add ignore rules on each reproduction branch, and inspect tracked paths before publishing. Preserve inputs needed to trigger the bug.

Use reproduction-branch URLs in fixture documentation and upstream PR bodies. Clone instructions must select that branch. After an authorized push, verify the remote branch and linked paths before updating upstream links. Honor publishing and upstream-edit authorization already given in the task.

Source checkouts for maintained Nuxt libraries usually live under `~/nuxt`. Read the target repository's instructions before copying code or creating patches.

## Nuxt data-fetching fixtures

Use generic names such as `report`, `criteria`, `item`, `record`, and `/api/report` unless the issue requires an exact domain shape.

Treat these behaviors as separate variables:

- `lazy` controls whether navigation waits.
- `immediate: false` disables initial execution.
- `watch: false` disables reactive option and key execution.
- Preview mode and `refreshNuxtData()` control global refresh behavior.

For parent and child route refresh bugs, keep the parent fetch owner mounted with `v-show` and a child `<NuxtPage>`. State that the fixture tests registered async data rather than unmounted data.

Run custom Nuxt ports with `pnpm exec nuxt dev --host 127.0.0.1 --port <port>`. Passing the port through `pnpm dev -- --port` can make Nuxt treat it as the project root.
