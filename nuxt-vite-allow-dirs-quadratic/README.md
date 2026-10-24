# `@nuxt/vite-builder` builds `server.fs.allow` in quadratic time

Given Nuxt `5.0.0-2610221052-8c52432` (`nuxt-nightly`) on Node 24, with a layer that sits outside the app's workspace dir, `nuxt build` spends time quadratic in the number of components before Vite starts. 5,000 components take about 450 ms, against about 24 ms with the fix in [`../nuxt-vite-allow-dirs-quadratic-fix`](../nuxt-vite-allow-dirs-quadratic-fix). It runs in `nuxt dev` too, since both call the same `bundle()`.

`bundle()` in `packages/vite/src/vite.ts` adds one `allowDirs` entry per component, plugin, middleware and layout, without de-duplicating. It then keeps an entry only if no other entry is its parent:

```js
allowDirs = allowDirs.filter(d => !allowDirs.some(other => other !== d && d.startsWith(other + '/')))
```

`some()` stops at the first parent it finds. When a component's dir has no parent in the list, it scans all N entries, so N such entries cost N² calls. The list de-duplicates only later, with `new Set(allowDirs)`.

## Run

From the branch root, with Node 24 and pnpm:

```sh
node verify.mjs nuxt-vite-allow-dirs-quadratic
node bench.mjs                                   # the filter alone, without Nuxt
```

The verifier installs `app/` from its lockfile. For 500, 2,000 and 5,000 components it generates `C<i>.vue` files into `layer/app/components/` and runs `nuxt build` three times. `app/modules/measure.ts` records the time from `build:before` to `vite:extend` and the final `server.fs.allow`, then stops the build. Fixed work, such as resolving the entry and merging the Vite config, cancels out of the cost per extra component. That cost stays flat when the time is linear. When the time is quadratic it rises by (5000 + 2000) / (2000 + 500) = 2.8x. The verifier exits 1 when it rises more than halfway to that, 0 otherwise, and 2 when setup fails. On Slimbook every build runs through `heavy`.

## Expected and actual

Expected: the cost per extra component stays flat. Actual: it rises 2.8x. Output on Slimbook, a shared machine, on 2026-10-24:

```text
nuxt-vite-allow-dirs-quadratic: Node v24.21.0, nuxt-nightly 5.0.0-2610221052-8c52432, @nuxt/vite-builder-nightly 5.0.0-2610221052-8c52432, vite 8.3.5, builds through heavy

time from build:before to vite:extend, median of 3 build(s) per size:
    500 components (526 registered)       17.0 ms   fs.allow: 5 entries
   2000 components (2026 registered)       82.9 ms   fs.allow: 5 entries
   5000 components (5026 registered)      454.1 ms   fs.allow: 5 entries

each extra component costs 43.9 µs from 500 to 2000 and 123.8 µs from 2000 to 5000: 2.8x (linear 1x, quadratic 2.8x)
server.fs.allow for 5000 components:
  <fixture>/app
  <fixture>/layer/
  <fixture>/layer/app/components
  <fixture>/app/.nuxt
  <fixture>/app

expected: the cost per extra component stays flat (linear)
actual:   it rises 2.8x, and 5000 components take 454 ms (quadratic)
```

`node bench.mjs` runs the same filter on generated lists. The current code makes exactly N² `some()` calls: 25.2 M for 5,022 entries, 350 to 600 ms. The fix gives the same list, in the same order, in under 2 ms.

In the generated 12-layer app from the research session (2,860 `.vue` files), the real list had 2,740 entries, only 58 of them unique. The current filter made 7.4 M calls and took 1.2 s. The fix took 0.2 ms and gave the same 47 entries.

## Why each piece is here

- `layer/` is outside `app/`. A component dir is dropped as soon as `some()` finds a parent in the list. The only candidates are Nuxt's own app dir, `workspaceDir`, the `modulesDir` entries and the layer roots. With the 5,000 components in `app/components/` instead, `workspaceDir` is their parent and the same build takes 20 ms.
- Layer roots end with `/` (`getLayerDirectories()` returns them with `withTrailingSlash`), so `other + '/'` never matches them. That is why `<fixture>/layer/` does not remove `<fixture>/layer/app/components`.
- `app/pnpm-workspace.yaml` makes `app/` the `workspaceDir`. Without it, Nuxt's `findWorkspaceDir` picks the git root of a fresh clone, which contains `layer/`.
- All components share one dir, as in the research app, so 5,000 entries collapse to one. One dir per component gives the same N² calls; `bench.mjs` shows both shapes.

Source: `packages/vite/src/vite.ts` in nuxt/nuxt `main` at bf4220d6e (2026-10-24); the filter has had this form since nuxt/nuxt#35112.

Written by an AI agent, Claude Code, on 2026-10-24. A human has not reviewed it yet.
