# nuxthub-826

Issue: https://github.com/nuxt-hub/core/issues/826

## Problem

In pnpm workspaces, launching Drizzle Studio from devtools fails with `Cannot find module '@nuxthub/db'`. The generated `@nuxthub/db` package lives in `apps/web/node_modules/` but the alias-based import resolves from the pnpm store path.

## Verify

```bash
pnpm i && pnpm --filter web dev
```

1. Open http://localhost:3000/__nuxt_devtools__/
2. Go to Database tab → Click "Launch"
3. See `Cannot find module '@nuxthub/db'` error in terminal

## Expected

Drizzle Studio launches successfully.

## Actual

`Cannot find module '@nuxthub/db'` error because Node resolves from pnpm store instead of project rootDir.
