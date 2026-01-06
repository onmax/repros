# nuxthub-754-fixed

Issue: https://github.com/nuxt-hub/core/issues/754
PR: https://github.com/nuxt/content/pull/3668

## Problem

With `@nuxthub/core` + `@nuxt/content` + `prerender.crawlLinks: true`, the `sql_dump.txt` routes fail to prerender with 404 because handlers aren't registered when database is not enabled.

## Fix

Patched `@nuxt/content` nuxthub preset to remove early return when database not enabled. This allows cloudflare/node preset `setup()` to always run, registering the `sql_dump.txt` handlers.

## Verify

```bash
pnpm i && NITRO_PRESET=cloudflare-pages pnpm build
```

## Expected

Build succeeds, `sql_dump.txt` route is prerendered successfully.

## Note

Verification requires x64 system or StackBlitz (better-sqlite3 native bindings don't compile on arm64 WSL2).
