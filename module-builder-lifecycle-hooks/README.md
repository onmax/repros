# module-builder: a clean build runs the module's own `onInstall`

On `@nuxt/module-builder@2.0.0-alpha.1`, running `tsdown` in a module repository with no `.nuxt` directory runs `nuxt-module-build prepare` automatically. Prepare installs the module into a Nuxt app rooted at the module repository, so Nuxt calls the module's `onInstall` hook there. The hook's files and a `.nuxtrc` with `setups.<name>` end up in the module's source checkout.

A real module scaffolds consumer files in `onInstall`, such as `auth.config.ts` in `@nuxtjs/better-auth`, so every fresh clone or CI build writes them into the repository.

## Run

```sh
git clone --branch repro/module-builder-lifecycle-hooks https://github.com/onmax/repros.git
cd repros/module-builder-lifecycle-hooks
pnpm install && pnpm verify
```

`verify.mjs` deletes `dist`, `.nuxt`, `.nuxtrc` and the marker, runs `tsdown`, and checks the module root.

## Expected

The build writes `dist/` and leaves the rest of the repository as it was. The consumer lifecycle hook doesn't run.

## Actual

```
$ tsdown   (clean checkout: no dist, no .nuxt, no .nuxtrc)
ONINSTALL_RAN in module root: yes
.nuxtrc in module root:       setups.repro-module="1.0.0"

bug reproduced: building the module ran its own onInstall hook in the module repository
```

## Control

`../module-builder-lifecycle-hooks-v1` holds the same module built with `nuxt-module-build build` on 1.0.4. The build leaves the repository untouched (`pnpm verify` there exits 0 when the bug does not reproduce).

`../module-builder-lifecycle-hooks-fix` holds this fixture with alpha.1 patched to drop `onInstall` and `onUpgrade` from the module it hands to prepare. The build leaves the repository untouched there too.

Running v1's explicit `pnpm exec nuxt-module-build prepare` in the control writes the same `ONINSTALL_RAN` and `.nuxtrc`, so the hook call itself predates v2. What changed is that v2 makes prepare part of every clean build.

## Why each piece is here

- `meta.version`: Nuxt's `callLifecycleHooks` returns early when the module meta has no version, so without it nothing runs.
- `NuxtModule<ModuleOptions>` annotation: without it the v2 declaration step fails with TS2883 before the bug shows.
- `@nuxt/cli` and `nuxt`: prepare runs through `runCommand('prepare')` from `@nuxt/cli`, which loads Nuxt.
- `typescript@5.9.3`: the newest version both module-builder 1.0.4 and 2.0.0-alpha.1 accept, so it's the same in both fixtures.
- `minimumReleaseAgeExclude`: 2.0.0-alpha.1 and vue-sfc-transformer 0.3.5 are newer than pnpm's default minimum release age.

## Environment

`@nuxt/module-builder` 2.0.0-alpha.1, tsdown 0.23.7, `@nuxt/cli` 4.0.3, nuxt and `@nuxt/kit` 4.6.4, TypeScript 5.9.3, pnpm 12.21.0, Node 24.21.0, Linux.

The relevant code: [`tsdown/setup.ts`](https://github.com/nuxt/module-builder/blob/035dfece7390e555d99a7c2b016ec51e8b78a037/src/tsdown/setup.ts#L89-L92) calls `prepareModule` when `.nuxt/tsconfig.json` is missing, and Nuxt kit's [`callLifecycleHooks`](https://github.com/nuxt/nuxt/blob/v4.6.4/packages/kit/src/module/install.ts#L446-L468) runs `onInstall` when the root `.nuxtrc` has no `setups` entry for the module.
