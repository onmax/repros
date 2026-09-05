# nuxthub-791-fixed

Issue: https://github.com/nuxt-hub/core/issues/791

## Problem
`nitro.preset: 'cloudflare-module'` + `pnpm dev` → "DB binding not found"

## Verify
```bash
pnpm i && pnpm dev
```

## Expected
Local libsql database used in dev mode.

## Actual
Dev server starts successfully with libsql.

## Fix
Added `&& !nuxt.options._prepare` check to skip D1 driver during prepare mode.

Uses [pnpm patch](https://pnpm.io/cli/patch) to apply the fix locally.
