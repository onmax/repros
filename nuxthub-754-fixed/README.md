# nuxthub-754-fixed

Issue: https://github.com/nuxt-hub/core/issues/754

## Problem

With `@nuxthub/core` + `@nuxt/content` + `prerender.crawlLinks: true`, the `sql_dump.txt` routes fail to prerender because the handler needs cloudflare `ASSETS` binding unavailable at build time.

## Fix

Patched `@nuxt/content` to add `prerender.ignore` for `/__nuxt_content/*/sql_dump.txt` routes in cloudflare and node presets.

## Verify

```bash
pnpm i && NITRO_PRESET=cloudflare-pages pnpm build
```

## Expected

Build succeeds, pages are prerendered without sql_dump.txt errors.

## Note

Verification requires x64 system or StackBlitz (better-sqlite3 native bindings don't compile on arm64 WSL2).
