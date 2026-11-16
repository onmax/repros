# Nuxt: an optional module dependency is version-checked although the app does not install it

`dependent-module` declares `optional-module` as an optional module dependency with `version: '>=2'`. The app only installs `dependent-module`, but `optional-module` 1.0.0 is on disk, so `nuxt prepare` (and `nuxt dev` / `nuxt build`) fails:

```
Module optional-module version (1.0.0) does not satisfy >=2 (requested by dependent-module).
```

In a real app the stray copy comes from another package. For example, a module that lists `@nuxtjs/sitemap` 8 as an optional npm dependency makes `nuxt-link-checker` 6 (optional `@nuxtjs/sitemap >=9`) fail the build, in an app that does not use the sitemap module.

## Environment

- `nuxt-nightly` / `@nuxt/kit-nightly` 5.0.0-2611161628-96caf0e (Nuxt main, 96caf0e), Node 24, Linux, pnpm 12

## Verify

```sh
pnpm install
pnpm verify
```

`verify.mjs` runs `nuxt prepare` and exits 1 when it fails on the version of `optional-module`.

Expected: the version is checked only when the app installs `optional-module`.

## Why each part is here

- `optional-module` in `dependencies`: it puts the package on disk without adding it to `modules`, which is what a dependency of another package does.
- `modules/`: two local packages, because the version check reads `package.json` and so does nothing for project-local modules.

## Cause

`installModules` in `packages/kit/src/module/install.ts` runs the `version` check for every dependency that resolves on disk, before it looks at `optional`.

Fix branch: https://github.com/onmax/nuxt/tree/fix/optional-module-version
