# Knip: vite-plus tasks spread from an imported object are not read

Knip's `vite-plus` plugin reads `run.tasks` from `vite.config.ts` by walking the AST. Tasks that come from a spread of an imported object (`...sharedTasks`) are skipped, so the files those tasks run are reported as unused.

Pinned: knip 6.45.1, vite-plus 1.6.0, pnpm 12.21.0, Node 24.

```sh
git clone --branch repro/knip-vite-plus-imported-tasks https://github.com/onmax/repros
cd repros/knip-vite-plus-imported-tasks
pnpm install
pnpm verify
```

Expected: no unused files. `inline.mjs` and `shared.mjs` both run from a task.

Actual: `shared.mjs` is reported under "Unused files". `inline.mjs`, written inline in `vite.config.ts`, is found.

- `tasks.ts` holds the task object that `vite.config.ts` spreads in.
- `knip.json` limits the project to the fixture files.
