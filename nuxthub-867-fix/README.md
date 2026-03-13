# nuxthub-867-fix

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

## Fix
The patch disables build-time migrations for Cloudflare Hyperdrive-only PostgreSQL and MySQL configs when there is no direct build-time connection URL. Runtime database access still uses the generated Hyperdrive binding.

For PostgreSQL, the shortcut stays limited to the default `postgres-js` Hyperdrive path. Explicit drivers like `neon-http` still require a direct URL and are not silently rewritten into a Hyperdrive config.
