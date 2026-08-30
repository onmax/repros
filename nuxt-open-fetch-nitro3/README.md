# nuxt-open-fetch on Nuxt 5 / Nitro 3

This fixture uses the exact Nuxt and Nitro versions from Portal PR #886 and a tarball built from `Norbiros/nuxt-open-fetch` main at `616f4c0eb532a555193a1b0321b3c90f35916a3f`.

Two tarballs are retained:

- `nuxt-open-fetch-0.13.10-unpatched.tgz`: current main without an imported fallback
- `nuxt-open-fetch-0.13.10.tgz`: the same tree with the #145-style `ofetch` dependency and fallback

The package currently points to the unpatched tarball. Run:

```sh
corepack pnpm install --force
corepack pnpm build
EXPECT_OPEN_FETCH_STATUS=500 corepack pnpm verify
```

The unpatched run expects `/api/open-fetch` to return 500. To verify the fix, change the `nuxt-open-fetch` file dependency in `package.json` to `nuxt-open-fetch-0.13.10.tgz`, reinstall and rebuild, then run:

```sh
corepack pnpm verify
```

In both variants `/api/runtime` reports `globalThis.$fetch` and `nitroApp.localFetch` as undefined. `/api/imported-ofetch` returns 200 in both. Only the unpatched generated OpenFetch client fails, with `TypeError: getFetch(...) is not a function`.
