# nuxthub-825-fix

Issue: https://github.com/nuxt-modules/better-auth/issues/167

Upstream PR: https://github.com/nuxt-hub/core/pull/825

## Problem

Nuxt Better Auth generates legacy Drizzle relations while NuxtHub's published database client does not consume Drizzle relations v2.

## Verify

```bash
pnpm install && pnpm verify
```

## Expected

All three generated relations-v2 integration checks pass.

## Actual

All three checks pass with the two pnpm patches.

## Fix

The `@nuxtjs/better-auth` patch asks Better Auth's relations-v2 adapter to generate the auth schema. The `@nuxthub/core` patch collects generated relation parts and passes them to Drizzle's client.
