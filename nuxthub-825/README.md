# nuxthub-825

Issue: https://github.com/nuxt-modules/better-auth/issues/167

Upstream PR: https://github.com/nuxt-hub/core/pull/825

## Problem

Nuxt Better Auth generates legacy Drizzle relations while NuxtHub's published database client does not consume Drizzle relations v2.

## Verify

```bash
pnpm install && pnpm verify
```

## Expected

The generated auth schema uses `defineRelationsPart`, and the generated NuxtHub database client consumes those relations.

## Actual

All three checks fail with the published packages.
