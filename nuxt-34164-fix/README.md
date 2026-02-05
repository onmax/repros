# nuxt-34164-fix

Issue: https://github.com/nuxt/nuxt/issues/34164

## Problem
`#build/route-rules.mjs` not generated to disk in pnpm monorepo setups. Regression in 3.21 / 4.3.

## Fix
Add `write: true` to the `route-rules.mjs` template in `@nuxt/nitro-server`, ensuring the file is written to `.nuxt/` on disk (like `app.config.mjs`).

Uses [pnpm patch](https://pnpm.io/cli/patch) to apply the fix locally.

## Verify
```bash
pnpm i && cd apps/web && pnpm prepare
ls .nuxt/route-rules.mjs  # now exists
```
