# nuxthub-825-fix

Issue: https://github.com/nuxt-modules/better-auth/issues/167

Upstream PR: https://github.com/nuxt-hub/core/pull/825

## Problem

Nuxt Better Auth generates legacy Drizzle relations while NuxtHub's published database client does not consume Drizzle relations v2.

## Verify

```bash
pnpm install && pnpm verify
```

Or clone only this repro into a temporary directory:

```bash
repro_dir=$(mktemp -d /tmp/nuxthub-825-fix.XXXXXX)

git clone \
  --depth 1 \
  --filter=blob:none \
  --sparse \
  https://github.com/onmax/repros.git \
  "$repro_dir"

cd "$repro_dir"
git sparse-checkout set nuxthub-825-fix
cd nuxthub-825-fix

pnpm install
pnpm verify
```

## Expected

All three generated relations-v2 integration checks pass.

## Actual

All three checks pass with the two preview packages.

## Fix

The repro uses commit-keyed `pkg.pr.new` builds for both packages:

- [`@nuxtjs/better-auth@5660dae`](https://github.com/onmax/better-auth-2/commit/5660dae75f228e2125be25f1e65cd7aaceb35e1c)
- [`@nuxthub/core@2dda6db`](https://github.com/onmax/core/commit/2dda6db41a65cc56177e7ad3b90656019ed0a89e)
