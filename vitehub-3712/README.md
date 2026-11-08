# vite-hub/vitehub#3712: `nuxt prepare` runs production build checks

On the Cloudflare preset, `nuxt prepare` fails with errors that only a production build needs. Most apps run `nuxt prepare` in `postinstall`, so `pnpm install` fails before the app has D1 ids or a Logs source.

Given a Nuxt 5 app with `vite-hub/nuxt` on `preset: "cloudflare"`, when `nuxt prepare` runs, it should exit 0 and write types, but it exits 1 with:

- `database: true` and a Definition without `cloudflare` options: `DATABASE_MISSING_D1_RESOURCE` (Cloudflare D1 output needs `cloudflare.databaseName` ...)
- `logs: true`: `[vitehub] Production Logs needs an existing source.`

`nuxt build` must keep both checks. The verifier checks both commands.

## Run

```sh
git clone --branch repro/vitehub-3712 https://github.com/onmax/repros.git
cd repros/vitehub-3712
pnpm install
pnpm verify
```

`pnpm verify` exits 1 while the bug is present and 0 when it is fixed. `REPRO_CASE` in `nuxt.config.ts` switches between the Database case and the Logs case.

## Observed (vite-hub main 9cff002)

```
[database] nuxt prepare  expected: exit 0      actual: exit 1, "database_missing_d1_resource"
[database] nuxt build    expected: "database_missing_d1_resource"  actual: exit 1, "database_missing_d1_resource"
[logs] nuxt prepare  expected: exit 0      actual: exit 1, "Production Logs needs an existing source"
[logs] nuxt build    expected: "Production Logs needs an existing source"  actual: exit 1, "Production Logs needs an existing source"
FAIL: nuxt prepare runs production build checks (vite-hub/vitehub#3712)
```

The fixed control in `../vitehub-3712-fix` is the same app on the fix branch build.

## Environment

- `vite-hub` and `@vite-hub/database` from pkg.pr.new at vite-hub/vitehub `9cff002` (main on 2026-11-08). The released 0.1.0 predates the D1 check from #3638.
- `nuxt` = `nuxt-nightly@5.0.0-2611071848-2d8337c` (Nitro 3.0.261103-rc, Vite 8.3.6)
- Node 24.21.0, pnpm 10.33.2, Linux

`drizzle-orm`, `@libsql/client` and `evlog` are optional peers of `vite-hub` that the Database and Logs features load.
