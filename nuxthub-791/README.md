# nuxthub-791

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
"DB binding not found" error during prepare phase.
