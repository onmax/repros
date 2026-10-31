# Nuxt reports "Compiled X in N ms" for templates that only waited

Given Nuxt 4.6.3 on Node 24 and a module that adds one template whose `getContents` blocks the event loop for 700 ms, `nuxt build` prints a `Compiled ... in ~710ms` line for 48 of the app's 51 templates. Only one of them, `#build/repro/slow.mjs`, did 700 ms of work; the other 47 spent a few milliseconds each and waited for it. The fixed control in [`../nuxt-template-compile-time-log-fix`](../nuxt-template-compile-time-log-fix) prints one line, for the slow template.

In a production app with 22 layers, `@nuxt/icon`'s `nuxt-icon-server-bundle.mjs` template blocked for about 2.1 s, and every build printed 219 lines, all around 2,100 ms. The list doesn't say which template was slow.

## Where it happens

`generateApp` in `dist/index.mjs` (`src/core/app.ts`), lines 4512 to 4542 in 4.6.3:

```js
async function processTemplate(template) {
  const fullPath = template.dst || resolve(nuxt.options.buildDir, template.filename);
  const start = performance.now();
  const oldContents = nuxt.vfs[fullPath];
  const contents = await trackPendingTemplate(template.filename, () => compileTemplate(template, templateContext)).catch(/* ... */);
  // ...
  const perf = performance.now() - start;
  const compileTime = Math.round(perf * 100) / 100;
  if (nuxt.options.debug && nuxt.options.debug.templates || compileTime > 500) logger.info(`Compiled \`${linkToAlias(fullPath, nuxt)}\` in ${compileTime}ms`);
  // ...
}
await Promise.allSettled(filteredTemplates.pre.map(processTemplate));
await Promise.allSettled(filteredTemplates.post.map(processTemplate));
```

`map` starts every `pre` template in one synchronous pass, and each one takes its `start` before it runs. Each template then awaits at least a few times (`compileTemplate` and `trackPendingTemplate` are async). When one template blocks the event loop, every template still waiting on an `await` also takes more than 500 ms of wall-clock time, and Nuxt prints a line for it. What gets reported depends on where the template blocks:

- After its first `await`, as `@nuxt/icon` does (`await ctx.resolveServerBundle()`, then synchronous module resolution for each collection): the block runs on the microtask queue after every `start` has been taken and before any other template has finished, so every `pre` template is reported. This fixture does that: 48 lines, the slow template included.
- Before any `await`: the block runs inside the `map` pass, so the templates already started are reported, and the ones after it in the list start later and are not. Making `repro/slow.mjs` synchronous gave 30 lines on the same machine. The committed fixture doesn't do this.

The slow template is always reported too, since its own time is over 500 ms. The `post` templates (`plugins.client.mjs`, `plugins.server.mjs`, `types/plugins.d.ts`) start only after every `pre` template has settled, so a slow `pre` template doesn't make them report. A slow `post` template would do the same to the other `post` templates.

Each reported line also calls `linkToAlias`, which calls `reverseResolveAlias` from pathe and normalizes the whole alias map again. In the production app that came to 146 ms over 219 lines. This app has few aliases, so the verifier doesn't measure it.

`nuxt-nightly` 5.0.0-2610291341-744179a has the same `processTemplate` (its `dist/index.mjs` around line 5013). Nuxt 4 stable reproduces it, so this fixture uses that.

## Run

From the branch root, with Node 24 and pnpm:

```sh
node verify.mjs nuxt-template-compile-time-log
```

The verifier installs `app/` from its lockfile and runs `nuxt build` once. `app/modules/templates.ts` adds `repro/fast-a.mjs`, `repro/fast-b.mjs`, `repro/fast-c.mjs` and `repro/slow.mjs`. `app/modules/stop.ts` stops the build at `build:before`, after `generateApp` has compiled every template and before Vite and Nitro start, so a run takes a few seconds. The verifier reads the `Compiled ... in` lines from the build output.

It exits 1 when Nuxt prints a `Compiled` line for any template other than `repro/slow.mjs`. It exits 0 when no other template gets a line and the 700 ms block is still reported, either as a line for `repro/slow.mjs` or as one `Generating templates took <ms>ms` line of at least 700 ms for the whole batch, which is what the proposed upstream fix prints. It exits 2 when setup or the build fails, the build doesn't reach `build:before`, or the block isn't reported at all. On Slimbook the install and build run through `heavy`.

## Expected and actual

Expected: one `Compiled` line, for `#build/repro/slow.mjs`. Actual: 48 lines. Output on Slimbook on 2026-10-31:

```text
nuxt-template-compile-time-log: Node v24.21.0, nuxt 4.6.3, @nuxt/kit 4.6.3, builds through heavy

`nuxt build` to build:before compiled 51 templates. Nuxt printed 48 "Compiled ... in" lines:
  #build/repro/slow.mjs                722.44 ms
  47 other templates                   708.01 to 734.4 ms
    #build/app-component.mjs           708.01 ms
    #build/types/app.config.d.ts       711.09 ms
    #build/app.config.mjs              711.95 ms
    #build/types/build.d.ts            712.2 ms
    #build/nitro.client.mjs            712 ms
    #build/css.mjs                     712.17 ms
    #build/fetch.mjs                   712.32 ms
    #build/fetch.d.ts                  712.53 ms
    #build/error-component.mjs         712.8 ms
    #build/global-polyfills.mjs        713.15 ms
    #build/island-renderer.mjs         713.48 ms
    #build/layouts.mjs                 713.68 ms
    #build/middleware.mjs              713.8 ms
    #build/paths.mjs                   713.45 ms
    #build/root-component.mjs          713.51 ms
    #build/types/modules.d.ts          713.42 ms
    #build/types/shared-app.config.d.ts 713.06 ms
    #build/test-component-wrapper.mjs  713.2 ms
    #build/types/vue-shim.d.ts         713.32 ms
    #build/types/shared-server-routes.d.ts 714.64 ms
    #build/types/nitro-layouts.d.ts    714.28 ms
    #build/types/builder-env.d.ts      714.4 ms
    #build/repro/fast-a.mjs            714.53 ms
    #build/repro/fast-b.mjs            714.62 ms
    #build/repro/fast-c.mjs            714.73 ms
    #build/types/layouts.d.ts          714.79 ms
    #build/pages.mjs                   714.84 ms
    #build/router.options.mjs          714.93 ms
    #build/types/middleware.d.ts       715.02 ms
    #build/unhead-options.mjs          715.13 ms
    #build/unhead.config.mjs           715.19 ms
    #build/components.d.ts             715.28 ms
    #build/types/components.d.ts       714.79 ms
    #build/components.plugin.mjs       714.36 ms
    #build/component-names.mjs         714.4 ms
    #build/components.islands.mjs      714.45 ms
    #build/component-chunk.mjs         714.42 ms
    #build/types/nitro-internal-api.d.ts 714.28 ms
    #build/route-rules.mjs             723.73 ms
    #build/imports.mjs                 720.89 ms
    #build/imports.d.ts                720.97 ms
    #build/types/nitro-nuxt.d.ts       721.02 ms
    #build/server-routes.d.ts          723.72 ms
    #build/types/shared-imports.d.ts   722.75 ms
    #build/types/runtime-config.d.ts   725.7 ms
    #build/types/imports.d.ts          723.21 ms
    #build/nuxt.config.mjs             734.4 ms

expected: one line, for #build/repro/slow.mjs, the only template whose own work takes more than 500 ms (a 700 ms busy-wait)
actual:   48 lines; 47 for templates that only waited while #build/repro/slow.mjs blocked the event loop, including #build/repro/fast-a.mjs, #build/repro/fast-b.mjs, #build/repro/fast-c.mjs
```

With `debug: { templates: true }` and the fix applied, the slowest template other than `repro/slow.mjs` took 7.45 ms of its own time.

## Why each piece is here

- `repro/slow.mjs` stands in for `@nuxt/icon`'s server-bundle template. It awaits an async function once and then busy-waits 700 ms on `performance.now()`. A busy-wait gives the same block on every run and can't get shorter on a loaded machine; the real template spends its time in synchronous module resolution, which this repro doesn't need. 700 ms is over Nuxt's 500 ms threshold. The `await` puts the block where `@nuxt/icon` has it, after every template has started.
- `repro/fast-a.mjs` to `repro/fast-c.mjs` return a constant string. Nuxt's own templates already show the bug; these three show that module templates are reported too, with names the verifier can point to.
- `app/modules/stop.ts` ends the build at `build:before`, so nothing after template generation runs. It prints the template count, which tells the verifier the build got that far.
- `app/pnpm-workspace.yaml` makes `app/` the pnpm workspace root, so the install stays in the fixture.

Pinned: `nuxt` 4.6.3 (Nitro 2.13.5, Vite 8.3.5), `@nuxt/kit` 4.6.3, `vue` 3.5.44, `vue-router` 5.4.0, Node 24.21.0, pnpm 12.16.1. Source: the published `nuxt` 4.6.3 tarball (`dist/index.mjs`) and `nuxt-nightly` 5.0.0-2610291341-744179a; I didn't check the TypeScript source in nuxt/nuxt.

Written by an AI agent, Claude Code, on 2026-10-31. A human has not reviewed it yet.
