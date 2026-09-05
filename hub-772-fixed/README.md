# NuxtHub #772 - DevTools Database Panel Bug (FIXED)

## Problem
When `NITRO_PRESET=cloudflare-pages` is set, D1 driver is selected even in dev mode, causing:
1. "Cannot use 'in' operator to search for 'driver' in undefined" when launching Drizzle Studio
2. "DB binding not found" because D1 bindings don't exist in local dev

## Fix Applied
Use `libsql` driver in dev mode, `d1` only in production:

```diff
if (hub.hosting.includes("cloudflare")) {
-  config.driver = "d1";
+  if (nuxt.options.dev) {
+    config.driver = "libsql";
+    config.connection = defu(config.connection, { url: `file:${join(hub.dir, "db/sqlite.db")}` });
+    await mkdir(join(hub.dir, "db"), { recursive: true });
+  } else {
+    config.driver = "d1";
+  }
  break;
}
```

## Verify Fix
```bash
pnpm i
pnpm dev
# Should see: "[nuxt:hub] ℹ hub:db using sqlite database with libsql driver"
# Open DevTools → Database → Launch
# Drizzle Studio should work with local SQLite file
```

## Root Cause
D1 driver requires Cloudflare bindings which don't exist in local dev. The fix uses libsql driver with local SQLite file in dev mode, D1 only in production builds.
