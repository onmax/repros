# Nuxt 5 runs `nuxt:nitro-v2-compat` and `nuxt:nitro-resolve-fallback` twice in the nitro environment

Given `nuxt-nightly@5.0.0-2610221052-8c52432` with Nitro 3.0.260903-beta, Vite 8.3.5 and Rolldown 1.2.15, on Node 24 with the default `experimental.nitroViteEnvironment`, `nuxt build` should have one active copy of each of these Nuxt plugins in the nitro environment. Instead it has two. Rolldown calls both copies of `nuxt:nitro-v2-compat` for every module and nearly every import of the nitro build, and only the first copy ever answers.

This is the same double registration as `nuxt:server-auto-imports` in nuxt/nuxt#36700 (repro: branch `repro/nuxt-server-auto-imports-twice` of this repository). No upstream issue exists. A build-performance study of a generated 12-layer app with 2,860 components found it. There the nitro build calls each copy of `nuxt:nitro-v2-compat` about 14,500 times for `resolveId` and 4,500 times for `transform`.

## Run it

From the branch root, with Node 24 and pnpm:

```sh
git clone --branch repro/nuxt-nitro-plugins-twice https://github.com/onmax/repros.git
cd repros && node verify.mjs
```

`verify.mjs` installs each fixture from its lockfile when `node_modules` is missing, runs `nuxt build`, reads the report that `inspect-nitro-plugins.ts` writes, and compares the two `.output` trees. It exits 1 while the bug is present and 2 when a check is inconclusive. `node verify.mjs nuxt-nitro-plugins-twice-fix` checks only the fixed control and exits 0.

Output on 2026-10-25 with Node 24.21.0 and pnpm 11.28.6, exit code 1:

```text
OUTPUT
```

## What each part is for

- `modules/legacy/` is a local module written for Nitro 2. It registers `/api/legacy`, whose handler imports `h3` and `nitropack/runtime`. That gives `nuxt:nitro-v2-compat` real work: the report shows which copy answers the import and rewrites the handler. Without it neither copy changes anything, and the fix couldn't show that the remaining copy still does the job.
- `server/api/hello.ts` and `server/utils/greeting.ts` are a plain Nitro 3 route. `app/pages/index.vue` is the one page.
- `inspect-nitro-plugins.ts` only observes. Before Nitro builds any environment, it wraps the `resolveId` and `transform` hooks of each watched plugin in the nitro environment and counts calls and answers.
- `buildDir: '.nuxt'` pins the layout of a fresh checkout. Once `.nuxt` exists, `nuxt build` moves to `node_modules/.cache/nuxt/.nuxt`.
- `buildId: 'repro'` lets `compare-output.mjs` compare the two `.output` trees.
- `pnpm-lock.yaml` and `pnpm-workspace.yaml` are the ones from `repro/nuxt-server-auto-imports-twice`, so the versions match.

## Cause

- `@nuxt/nitro-server-nightly` registers both plugins twice. `setupNitroCompat` in `dist/index.mjs:2210-2224` pushes them into `nitroConfig.rollupConfig.plugins`, then adds `{ ...plugin, applyToEnvironment }` copies to `vite.plugins` when `experimental.nitroViteEnvironment` is on. On nuxt/nuxt main at `194b1fe`, the same code is in `packages/nitro-server/src/compat.ts:1188-1198`.
- Nitro hands `rollupConfig` to the nitro environment too. `getBundlerConfig` merges it into the environment's `build.rolldownOptions`, and Vite 8 makes `build.rolldownOptions.plugins` active plugins. Nitro main does the same in `src/build/vite/bundler.ts` and `src/build/vite/env.ts`.
- Both copies' hooks use `order: 'pre'` (`nuxt:nitro-v2-compat`) or `order: 'post'` (`nuxt:nitro-resolve-fallback`), so either copy alone runs at the same point in the hook order.

## Fixed control

`nuxt-nitro-plugins-twice-fix/` is the same app with a `pnpm patch` of `@nuxt/nitro-server-nightly@5.0.0-2610221052-8c52432` that drops the two Vite-plugin copies. The `rollupConfig` copies stay, because Nitro also builds prerendered routes from `rollupConfig` alone. Its single `nuxt:nitro-v2-compat` answers the same import and rewrites the same handler, and `.output` is the same after normalizing.

`compare-output.mjs` comes from `repro/nuxt-server-auto-imports-twice`, with two additions. Nitro's public-asset table can land in `server/_libs/_nuxt/nitro-server.mjs`, and its entry order and the etag of the timestamped `builds/latest.json` vary between identical builds. Nuxt's Nitro 2 compat also bakes the absolute path of `.output/server` into that chunk, and that path names the fixture directory.

## Import protection is registered twice too, and that copy must stay

The nitro environment also lists two copies of server import protection: `nuxt:server-import-protection:impound` (the Vite plugin) and `impound` (from `rollupConfig`). They aren't equivalent there. The Vite copy runs before Vite's alias resolution and sees `~~/nuxt.config` as written. The `rollupConfig` copy runs after it and sees only the resolved path. To check this by hand, add `server/api/protect.ts` with `import config from '~~/nuxt.config'`. `nuxt build` then fails with `Importing directly from a nuxt.config file is not allowed` from `nuxt:server-import-protection:impound`. With the Vite copy removed, the build passes. The verifier lists both copies and doesn't check them, and the fixed control keeps both.
