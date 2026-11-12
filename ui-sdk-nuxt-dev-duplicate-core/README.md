# ui-sdk's Nuxt module loads two copies of the core in `nuxt dev`

A Nuxt app adds `@ui-sdk/vue` to `modules`, and a page imports `createCheckboxController` from `@ui-sdk/core/checkbox`.
In `nuxt dev` the page shows Nuxt's error page instead of the checkbox:

```text
500
Internal Server Error

Cannot read properties of undefined (reading 'renders')
```

Nuxt adds every installed module's package to `build.transpile`, and Nuxt's Vite builder keeps transpiled packages out of dependency pre-bundling.
So `@ui-sdk/vue` loads the core's raw `dist` files, while the page's import of `@ui-sdk/core/checkbox` goes through Vite's pre-bundled copy.
The browser ends up with two copies of the core's modules, and the `<Checkbox>` component fails to render.
The module's `setup` registers components and imports but leaves Vite's dependency optimization untouched: [packages/vue/nuxt/module.ts](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/vue/nuxt/module.ts#L28-L37).

The Vue installation docs expect one copy: "Install both so the components and any helpers you use share one copy of the core" ([installation.mdx](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/apps/docs/content/docs/vue/installation.mdx#L14)).

Tested on Linux with Node 24.21.0 and pnpm 12.18.0.
The lockfile pins `@ui-sdk/core` and `@ui-sdk/vue` 0.1.0-beta.1 from npm, Nuxt 4.6.4, Nitro 2.13.6, Vite 8.3.8, Vue 3.5.45, and Playwright 1.63.0.
Playwright 1.63.0 drives Chromium headless shell revision 1243; run `pnpm exec playwright install chromium-headless-shell` if it isn't installed.

```sh
git clone --single-branch --branch repro/ui-sdk-nuxt-dev-duplicate-core https://github.com/onmax/repros.git
cd repros/ui-sdk-nuxt-dev-duplicate-core
bash verify.sh
```

`verify.sh` installs with the frozen lockfile and runs `verify.mjs`.
For each case it deletes `.nuxt` and Vite's cache in `node_modules/.cache`, starts `pnpm exec nuxt dev --host 127.0.0.1 --port 5380`, opens `/` in Chromium, and stops the server.
Then it starts `nuxt dev` again on the cache the first start wrote, opens `/` once more, reads Nuxt's error and clicks the checkbox.
It kills each server's process group and checks that port 5380 is free.
It exits 0 when the bug case shows the error and the control works.

The control sets `vite.optimizeDeps.exclude: ["@ui-sdk/core"]` through `EXCLUDE_CORE=1` in `nuxt.config.ts`.
That loads the core once, from its raw files, and changes nothing else.

Expected and actual output, from a fresh clone on 2026-11-12:

```text
bug: nuxt dev, second start, page imports @ui-sdk/core/checkbox
  expected: Nuxt error=null, checkbox aria-checked after click=true
  actual:   Nuxt error="Cannot read properties of undefined (reading 'renders')", checkbox aria-checked after click=no checkbox
control: same, with vite.optimizeDeps.exclude ["@ui-sdk/core"]
  expected: Nuxt error=null, checkbox aria-checked after click=true
  actual:   Nuxt error=null, checkbox aria-checked after click=true
bug reproduced: true
control passed: true
port 5380 free: true
```

Why the fixture keeps what it keeps:

- The page imports from `@ui-sdk/core/checkbox`. Without an import from the core, Vite never pre-bundles it and only one copy loads.
- `nuxt.config.ts` installs the module. Without it, with `<Checkbox>` imported from `@ui-sdk/vue/checkbox` in the page, `@ui-sdk/vue` is pre-bundled too, and the same verifier sees no error.
- The verifier starts `nuxt dev` twice. A cold start also ends on the error page, but only after Vite discovers `@ui-sdk/core/checkbox` at runtime and reloads the page. The second start uses the cached pre-bundle and fails on the first load, which is what a developer sees on every later `nuxt dev`.

`nuxt build` works: the built server, run with `node .output/server/index.mjs`, renders the checkbox and the click checks it.
That was checked by hand on 2026-11-12 and isn't part of `verify.sh`.
