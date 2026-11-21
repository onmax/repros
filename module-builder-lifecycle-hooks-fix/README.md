# Fix control: alpha.1 with lifecycle hooks stripped during prepare

The same module and versions as `../module-builder-lifecycle-hooks`, with a `pnpm patch` of `@nuxt/module-builder@2.0.0-alpha.1`. The patch makes `prepareModule` pass Nuxt a copy of the module without `onInstall` and `onUpgrade`. Nuxt still installs and sets up the module, so the generated types are the same, but `callLifecycleHooks` finds no hook to run.

```sh
pnpm install && pnpm verify
```

```
$ tsdown   (clean checkout: no dist, no .nuxt, no .nuxtrc)
ONINSTALL_RAN in module root: no
.nuxtrc in module root:       no

bug not reproduced: the build left the module repository untouched
```

`pnpm verify` exits 0 here because the bug is expected not to reproduce. The patch is in `patches/`.
