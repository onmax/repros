# VueUse unused string-helper initializers

With `@vueuse/shared@15.0.0` and esbuild `0.28.2`, importing a working `createSingletonPromise` also retains the unused `hyphenate` and `camelize` initializers. They call `cacheStringFunction`, which allocates a private cache and returns a closure without invoking its callback.

The expected bundle contains the live singleton loader and removes the unused string helpers. The unpatched package produces 426 raw bytes and 307 gzip bytes. The sibling `../vueuse-pure-initializers-fix` changes only the two initializer calls by adding `/* #__PURE__ */`. Its bundle contains 237 raw bytes and 192 gzip bytes.

Use Node **24.21.0** and pnpm **11.28.6**. From the repository root, run:

```sh
node verify.mjs --clean
```

This installs both fixtures with frozen lockfiles, runs the same verifier, and succeeds only when the baseline reports the expected failure and the patched fixture passes. Add `--offline` to use an existing pnpm content store. `--clean` removes only these fixtures' `node_modules` before installing. On a machine that requires the shared `heavy` lock, prefix the command with `heavy`.

To inspect this fixture alone, run `pnpm install --frozen-lockfile --ignore-scripts && pnpm verify` in this directory. The baseline verifier exits 1 because it expects unused helpers to disappear. Its sibling verifier exits 0.

The inputs and verifier are identical in both directories. Both use exact direct dependency versions and committed lockfiles. pnpm applies the fixed package patch through `pnpm-workspace.yaml`; the verifier checks the installed comments explicitly. There are no bundler plugins or source substitutions during measurement.

The controls check the live singleton's value, promise identity and reset, count callback invocations, and execute both string helpers repeatedly, including empty strings and `__proto__`. With `ignoreAnnotations: true`, both packages must produce byte-for-byte identical output. The root command also checks exact bundle sizes and that removing the two patch comments restores identical package content.

The live singleton keeps the package module in the bundle. A completely unused package import would test package-level `sideEffects`, which does not demonstrate this issue. The installed Vue peer is pinned to `3.5.44`; it is required for ordinary package resolution even though the retained singleton does not use Vue. esbuild uses browser ESM, production defines, target ES2022, minification and tree shaking. Gzip uses level 9.

The source proposal targets [`packages/shared/utils/port.ts` at `0f170513de8d670c7a27fd713703fddaeceb8e9d`](https://github.com/vueuse/vueuse/blob/0f170513de8d670c7a27fd713703fddaeceb8e9d/packages/shared/utils/port.ts). The patch here applies the same comments to the published package's `dist/index.js`. No upstream issue or PR has been published for this fixture. This command tests the published package; it does not rebuild the VueUse monorepo. Earlier investigation found Rollup already removes these helpers, so the size claim is specific to esbuild.

Generated bundles and machine-readable results appear in each fixture's ignored `output/` directory. `verification-evidence.json` records the clean-install result used for the handoff.
