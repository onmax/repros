# nuxthub-826-fix

Issue: https://github.com/nuxt-hub/core/issues/826

## Problem

In pnpm workspaces, launching Drizzle Studio from devtools fails with `Cannot find module '@nuxthub/db'`. The generated `@nuxthub/db` package lives in `apps/web/node_modules/` but the alias-based import resolves from the pnpm store path.

## Fix

Patch replaces alias-based `import(nuxt.options.alias['hub:db'])` with absolute path resolution from `rootDir`:

```ts
const dbEntry = resolve(nuxt.options.rootDir, 'node_modules', '@nuxthub', 'db', 'db.mjs')
if (!existsSync(dbEntry)) {
  throw new Error(`Cannot find @nuxthub/db at ${dbEntry}. Run \`nuxt prepare\` to generate it.`)
}
const { schema } = await import(pathToFileURL(dbEntry).href)
```

## Verify

```bash
pnpm i && pnpm --filter web dev
```

1. Open http://localhost:3000/__nuxt_devtools__/
2. Go to Database tab → Click "Launch"
3. Drizzle Studio launches successfully

## Expected

Drizzle Studio launches without errors.
