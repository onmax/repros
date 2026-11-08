# vite-hub/vitehub#3712 fixed control

The same app as `../vitehub-3712`, with `vite-hub` and `@vite-hub/database` from the fix branch build (pkg.pr.new at vite-hub/vitehub `f902387`, branch `fix/nuxt-prepare-build-checks`). Only the two package URLs differ.

```sh
git clone --branch repro/vitehub-3712 https://github.com/onmax/repros.git
cd repros/vitehub-3712-fix
pnpm install
pnpm verify
```

Expected: `nuxt prepare` exits 0 for both cases, `nuxt build` still fails with each check, and `pnpm verify` exits 0.
