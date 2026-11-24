# nuxt-hub/core#958: `@nuxthub/core` triggers Nitro v2 compatibility on Nitro v3

Given Nuxt 4.7.0 running on Nitro v3 (`nitro` installed) with `@nuxthub/core` 0.10.12 and `hub.db: 'sqlite'`, `nuxt build` should not apply the Nitro v2 compatibility layer to the module. It does, and prints:

```
[NUXT_B9003] Nitro v2 compatibility was applied to server code from 1 module ...
  `@nuxthub/core` (imports `nitropack/runtime`)
```

The cause is the db server plugins in `dist/db/runtime/plugins/` (`migrations.dev`, and `request-context` for Hyperdrive). They import from `nitropack/runtime`.

## Fixtures

- `nuxthub-958/`: the failing app, unpatched `@nuxthub/core@0.10.12`.
- `nuxthub-958-fix/`: the same app, with `patches/@nuxthub__core@0.10.12.patch` applied through `pnpm patch`. The patch adds Nitro v3 variants of the two plugins and registers both variants with `addNitroPlugin({ nitro2, nitro3 })`.

## Run

Use Node 24 or 22. On Node 26, `better-sqlite3` fails to build.

```sh
git clone --branch repro/nuxthub-958 https://github.com/onmax/repros.git
cd repros/nuxthub-958        # or ../nuxthub-958-fix
pnpm install
node verify.mjs
```

`verify.mjs` runs `nuxt build` and fails when the NUXT_B9003 block names `@nuxthub/core`. It then starts `nuxt dev` on a random port and expects `GET /api/items` to return `[]`. It deletes `.data` between the build and `nuxt dev`, so the `[]` response shows the dev migrations plugin created the table. As a control, setting `hub.db` to `{ dialect: 'sqlite', applyMigrationsDuringDev: false }` in the fixed fixture makes the request fail and the verifier exit 1. It exits 1 on failure.

## Expected and actual

| Fixture | NUXT_B9003 for `@nuxthub/core` | `GET /api/items` | Exit |
|---|---|---|---|
| `nuxthub-958` | printed | `[]` | 1 |
| `nuxthub-958-fix` | none | `[]` | 0 |

To exercise the Nitro v2 path, remove `nitro` from `nuxthub-958-fix/package.json` and reinstall. It still passes.

## Why each piece is there

- `nitro` in dependencies: this is what opts Nuxt 4.7 into Nitro v3. Without it there is no warning.
- `hub.db: 'sqlite'`, `server/db/schema.ts`, `server/db/migrations/sqlite/0000_init.sql`: the dev migrations plugin is registered only when a database is configured.
- `server/api/items.get.ts`: reads the migrated table to prove the plugin ran under Nitro v3.
- `typescript`: nuxthub builds the schema with tsdown, which needs it.
- `pnpm-workspace.yaml`: `allowBuilds` covers the esbuild and better-sqlite3 install scripts, and `minimumReleaseAgeExclude` lets the pinned Nuxt and Nitro releases install.

The `"storage" option is deprecated` warning from the issue comes from `hub.cache`. This fixture doesn't cover it.
