# NuxtHub #791 Reproduction

Demonstrates "DB binding not found" error when using cloudflare preset in dev mode.

## Steps
1. `pnpm install`
2. `pnpm dev` → Error during prepare: "DB binding not found"

## Expected
Local libsql in dev, D1 in production.

## Fix
PR: https://github.com/nuxt-hub/core/pull/798
