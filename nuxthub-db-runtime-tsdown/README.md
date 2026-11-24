# NuxtHub: importing `@nuxthub/core/db` in server code breaks the Nitro v3 build

A server plugin that imports `applyDatabaseMigrations` from `@nuxthub/core/db` makes `nuxt build` fail once the app runs on Nitro v3.

`@nuxthub/core/db` re-exports `./build.mjs`, which imports `tsdown` at the top. The server bundle then reaches `tsdown` → `rolldown-plugin-dts` → `ast-kit` → `@babel/parser`. Nuxt aliases `@babel/parser` to a mock in the server build, and rolldown stops because the mock has no `parse` or `parseExpression` export.

## Environment

- `nuxt` 4.7.0, `nitro` 3.0.261103-rc (installing `nitro` opts Nuxt into Nitro v3), vite 8.3.8, rolldown 1.2.19
- `@nuxthub/core` 0.10.12. Upstream `main` (5772ded, from pkg.pr.new) fails the same way.
- Node 24.21, Linux, pnpm 12

## Verify

```sh
git clone --branch repro/nuxthub-db-runtime-tsdown https://github.com/onmax/repros.git
cd repros/nuxthub-db-runtime-tsdown
pnpm install
pnpm verify
```

`verify.mjs` runs `nuxt build` and exits 1 when it fails.

```
expected: nuxt build succeeds
actual:   nuxt build exited with 1
  [MISSING_EXPORT] "parse" is not exported by "node_modules/.pnpm/mocked-exports@0.1.1/node_modules/mocked-exports/lib/proxy.mjs".
  ╭─[ node_modules/.pnpm/ast-kit@2.2.0/node_modules/ast-kit/dist/index.js:2:10 ]
  [MISSING_EXPORT] "parseExpression" is not exported by "node_modules/.pnpm/mocked-exports@0.1.1/node_modules/mocked-exports/lib/proxy.mjs".
  ╭─[ node_modules/.pnpm/ast-kit@2.2.0/node_modules/ast-kit/dist/index.js:2:17 ]
FAIL: importing @nuxthub/core/db in server code breaks the Nitro v3 build
```

## Why each part is here

- `nitro` in `dependencies`: without it Nuxt 4.7 builds with Nitro v2, which passes but copies tsdown, rolldown, `@babel/*` and ast-kit into `.output/server/node_modules` (49 MB server output).
- `server/plugins/migrations.ts`: the one import of `@nuxthub/core/db` from server code. The app needs no database config, schema or driver to fail.
- A lazy `await import('tsdown')` inside `buildDatabaseSchema` still fails: rolldown follows the dynamic import into ast-kit.

## Fixed control

[`../nuxthub-db-runtime-tsdown-fix`](../nuxthub-db-runtime-tsdown-fix) runs the same app and verifier with the upstream fix applied as a `pnpm patch`, and passes.
