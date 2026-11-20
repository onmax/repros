# Control: module-builder 1.0.4 build

The same module as `../module-builder-lifecycle-hooks`, built with `nuxt-module-build build` from `@nuxt/module-builder@1.0.4` (unbuild). The build doesn't run prepare, so `onInstall` doesn't run and the repository stays clean.

```sh
pnpm install && pnpm verify
```

```
$ nuxt-module-build build   (clean checkout: no dist, no .nuxt, no .nuxtrc)
ONINSTALL_RAN in module root: no
.nuxtrc in module root:       no

bug not reproduced: the build left the module repository untouched
```

`pnpm verify` exits 0 here because the bug is expected not to reproduce. Running `pnpm exec nuxt-module-build prepare` by hand in this directory does write `ONINSTALL_RAN` and `.nuxtrc`.
