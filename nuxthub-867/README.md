# nuxthub-867

Issue: [nuxt-hub/core#867](https://github.com/nuxt-hub/core/issues/867)

## Problem
With `nitro.preset: 'cloudflare-module'` and a PostgreSQL config that only sets `connection.hyperdriveId`, NuxtHub still tries to run build-time migrations when `applyMigrationsDuringBuild: true`. The build-time migration client uses `postgres-js` with an empty `connection.url`, so `nuxt build` fails before the Cloudflare Hyperdrive runtime binding can ever be used.

## Verify
```bash
pnpm i
pnpm build
```

## Expected
Cloudflare Hyperdrive-only PostgreSQL config should not try to run build-time migrations from the CI/build container. `nuxt build` should succeed and leave database migration application to a runtime or separate deployment step.

## Actual
`nuxt build` fails while applying database migrations during build.
