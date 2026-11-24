# NuxtHub: `@nuxthub/core/db` without the build helpers (fixed control)

Same app and verifier as [`../nuxthub-db-runtime-tsdown`](../nuxthub-db-runtime-tsdown), with `patches/@nuxthub__core@0.10.12.patch` applied to `@nuxthub/core` 0.10.12.

The patch is the upstream fix, applied to the published `dist`:

- `dist/db/lib/index.mjs` (`@nuxthub/core/db`) no longer re-exports `./build.mjs`, so server code that imports it never reaches `tsdown`.
- `package.json` exports the build helpers as `@nuxthub/core/db/build`.
- `dist/module.mjs` and the `db generate` and `db squash` CLI commands import them from there.

## Verify

```sh
git clone --branch repro/nuxthub-db-runtime-tsdown https://github.com/onmax/repros.git
cd repros/nuxthub-db-runtime-tsdown-fix
pnpm install
pnpm verify
```

```
expected: nuxt build succeeds
actual:   nuxt build exited with 0
PASS: the server bundle builds
```

The built server starts and the plugin logs `function` for `applyDatabaseMigrations`. `.output/server` is 3.5 MB and has no `node_modules`.
