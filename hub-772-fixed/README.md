# NuxtHub #772 - DevTools Database Panel Bug (FIXED)

## Problem
When `NITRO_PRESET=cloudflare-pages` is set, launching Drizzle Studio from DevTools fails with:
> Failed to launch Drizzle Studio: Cannot use 'in' operator to search for 'driver' in undefined

## Fix Applied
This version includes a pnpm patch to `@nuxthub/core` that sets `connection` for D1 driver:

```diff
if (hub.hosting.includes("cloudflare")) {
  config.driver = "d1";
+  config.connection = defu(config.connection, { url: `file:${join(hub.dir, "db/sqlite.db")}` });
+  await mkdir(join(hub.dir, "db"), { recursive: true });
  break;
}
```

## Verify Fix
```bash
pnpm i
pnpm dev
# Open http://localhost:3000/__nuxt_devtools__/
# Navigate to "Database" tab → Click "Launch"
# Expected: Drizzle Studio launches successfully
```

## Root Cause
In `@nuxthub/core/src/db/setup.ts`, when Cloudflare hosting is detected, the D1 driver is selected but `connection` is never set. The fix adds a local SQLite file URL to `connection` for use by Drizzle Studio (D1 runtime ignores `connection` and uses bindings directly).
