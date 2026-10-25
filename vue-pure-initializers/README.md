# Vue retains unused initializers

With Vue 3.5.44 and esbuild 0.28.2, a production browser ESM bundle using `isRef`, `toDisplayString`, or `hasInjectionContext` retains internal initializers that the exported function does not use. Across three small inputs, the verifier finds one `builtInSymbols` Set, four cached string helper initializers, and one `emptyAppContext` initializer.

The expected behavior is to remove those unused initializers while keeping the exported functions working. The sibling `vue-pure-initializers-fix/` adds exactly six PURE comments through pnpm patches against the same package versions. Both fixtures use the same files in `../inputs/` and the same verifier.

From this branch's repository root, with Node **24.21.0** and pnpm **11.28.5** installed:

```sh
node verify.mjs
```

This command clears each fixture's generated `node_modules/` and `dist/`, installs from its frozen lockfile, verifies the baseline failure and patched result, executes the bundled exports, and compares the outputs. It exits nonzero if any claim is false. Use `node verify.mjs --offline` when the pinned packages are already in the pnpm store. Neither command needs the original application or a private filesystem path.

The baseline's expected counts are `1 / 4 / 1`; the patched counts are `0 / 0 / 0`. A successful baseline assertion means the known tree-shaking failure was reproduced. The command also requires smaller patched bundles and identical minified bundles when annotation handling is disabled. Generated bundles and measurements go into each fixture's ignored `dist/` directory.

The live control calls all four string helpers, updates refs and reactive objects, checks built-in and custom symbol tracking, and renders components both without an app and with an app-provided value. It requires all six initializers to remain when used. Separate checks require Vue's global instance and SSR setter registrations to remain in the context-query bundle.

The inputs are production bundle cases with live exports, not measurements of a deployed application. Browser ESM, ES2022, production mode, Options API enabled, production devtools disabled, and production hydration mismatch details disabled are identical in both arms. Gzip uses level 9. The runtime controls use ordinary JavaScript built-ins.

The packages are the published Vue **3.5.44** distributions, pinned by lockfile integrity. The source candidate was prepared against [`vuejs/core` at `0ff253bfba3ee8d3d65448bd44ad890fd01b0ecd`](https://github.com/vuejs/core/tree/0ff253bfba3ee8d3d65448bd44ad890fd01b0ecd). The corresponding sites are in `packages/reactivity/src/baseHandlers.ts`, `packages/shared/src/general.ts`, and `packages/runtime-core/src/component.ts`. This fixture tests package distribution patches; it does not claim to run Vue's official source build or full test suite.

See [recorded output](../EVIDENCE.md) for the clean-install result.
