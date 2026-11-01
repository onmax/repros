# The profiler charges a plugin for the plugins it awaits

> Prepared by an AI agent (Claude Code) during an audit of the Nuxt 5 build profiler. A human has not reviewed it yet.

Given the Nuxt 5 build profiler and a Vite plugin that burns 20 ms of CPU whenever it resolves Vue, `nuxt build --profile=verbose` reports `nuxt:bundled-vue` as the slowest plugin. On this fixture it charged `nuxt:bundled-vue` resolveId 3,018 ms over 36 calls, against 1,801 ms for the plugin that did the work (1,755 ms of CPU in the profile). All plugin totals added up to 5,711 ms inside a 2,809 ms `build:bundle`. `nuxt:bundled-vue` does no work of its own: it awaits `this.resolve(id, importer, { skipSelf: true })`, which runs the slow plugin. Its reported time should be close to zero. Instead it gets the slow plugin's time, plus any time spent waiting on other work in the event loop.

Pinned: `nuxt@npm:nuxt-nightly@5.0.0-2611010234-c709ec8` (nuxt/nuxt `c709ec8`), which installs `@nuxt/cli-nightly@4.0.1-2610292127-cd8f364`, `nitro@3.0.261029-rc`, `vite@8.3.5` and `rolldown@1.2.16`. Node 24, Linux. Default Nuxt 5 build path: `experimental.nitroViteEnvironment` on.

## Where it happens

`timedCall` in `packages/vite/src/plugins/perf.ts` (and the same wrapper for Nitro's Rolldown plugins in `packages/nitro-server/src/index.ts`) records `performance.now() - start` around the whole promise a hook returns. Two kinds of time end up in the hook's total:

- Time inside `this.resolve()` or `this.load()`, which belongs to the plugins those calls run. Those plugins already record it, so it is counted twice.
- Time while the hook is suspended and other modules' hooks run. Rolldown keeps many hooks in flight at once, so totals add up past wall time.

Rolldown hit the same problem in its own `pluginTimings` check and fixed it in rolldown/rolldown#10508. Its fix excludes the time a hook waits in the dispatch queue, and it refuses to put a number on a hook whose calls overlap.

## Observed

On the bench `large` fixture (about 170 pages and 370 components), `nuxt:bundled-vue` resolveId was charged 145,539 ms over 648 calls inside a 4,618 ms `build:bundle`. All plugin totals added up to 148,288 ms. The CPU profile has 5.5 ms of samples in its handler.

## Run

From the branch root, with Node 24 and pnpm:

```bash
node verify.mjs
```

It installs `nuxt-profiler-nested-resolve/app` from its lockfile, runs `nuxt build --profile=verbose`, and prints the expected and actual result. Exit code 1 means the bug reproduced, 0 means it did not, and 2 means setup failed. Logs go to `nuxt-profiler-nested-resolve/results/`.

## Why each element is here

- `repro:slow-resolver` is `enforce: 'pre'`. As a normal plugin it would sit after Vite's own `vite:resolve`, which resolves `vue` first, so it would never run.
- `app.vue` is the smallest app that makes the server bundle import Vue.
