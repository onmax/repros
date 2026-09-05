# nuxthub-754

Issue: https://github.com/nuxt-hub/core/issues/754

## Problem

With `@nuxthub/core` + `@nuxt/content` + `prerender.crawlLinks: true`, the `sql_dump.txt` routes fail to prerender because the handler needs cloudflare `ASSETS` binding unavailable at build time.

## Verify

```bash
pnpm i && NITRO_PRESET=cloudflare-pages pnpm build
```

## Expected

Build succeeds, pages are prerendered.

## Actual

Build fails with prerender error for `/__nuxt_content/content/sql_dump.txt`.

## Note

Verification requires x64 system or StackBlitz (better-sqlite3 native bindings don't compile on arm64 WSL2).

StackBlitz repro: https://stackblitz.com/edit/github-n1pcahgr
