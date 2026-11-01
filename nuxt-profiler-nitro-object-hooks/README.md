# The profiler skips Nitro plugins that declare hooks as objects

> Prepared by an AI agent (Claude Code) during an audit of the Nuxt 5 build profiler. A human has not reviewed it yet.

Given a Rolldown plugin in the Nitro bundle whose `transform` is `{ handler }`, `nuxt build --profile=verbose` leaves it out of the report's bundler plugins entirely. On this fixture the CPU profile has 611 ms in it. Of the 17 plugins in Nitro's Rolldown config on a default Nuxt 5 app, only `nuxt:server-auto-imports` has function-form `resolveId`/`load`/`transform` hooks. `impound`, `nitro:virtual`, `nitro:externals`, `nitro:raw`, `unwasm`, `replace` and the rest are all invisible to the profiler.

Pinned: `nuxt@npm:nuxt-nightly@5.0.0-2611010234-c709ec8` (nuxt/nuxt `c709ec8`), which installs `@nuxt/cli-nightly@4.0.1-2610292127-cd8f364`, `nitro@3.0.261029-rc`, `vite@8.3.5` and `rolldown@1.2.16`. Node 24, Linux. Default Nuxt 5 build path: `experimental.nitroViteEnvironment` on.

## Where it happens

The `build:config` hook in `packages/nitro-server/src/index.ts`, "Instrument Nitro rollup plugins for perf tracking":

```ts
const original = plugin[hookName]
if (typeof original !== 'function') { continue }
```

The Vite-side wrapper in `packages/vite/src/plugins/perf.ts` handles `{ handler }` hooks. On the `nitroViteEnvironment` path these plugins sit in the Nitro environment's `rolldownOptions.plugins`, not among Vite's plugins, so that wrapper doesn't see them either.

## Run

From the branch root, with Node 24 and pnpm:

```bash
node verify.mjs
```

It installs `nuxt-profiler-nitro-object-hooks/app` from its lockfile, runs `nuxt build --profile=verbose`, and prints the expected and actual result. Exit code 1 means the bug reproduced, 0 means it did not, and 2 means setup failed. Logs go to `nuxt-profiler-nitro-object-hooks/results/`.
