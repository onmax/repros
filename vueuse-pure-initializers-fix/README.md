# VueUse fixed string-helper initializers

This is the fixed control for `../vueuse-pure-initializers`. It uses the same input, verifier and package versions. The only package change is the pnpm patch adding `/* #__PURE__ */` to the `hyphenate` and `camelize` calls to `cacheStringFunction` in `@vueuse/shared@15.0.0`.

With Node 24.21.0 and pnpm 11.28.6, run `node verify.mjs --clean` from the repository root to install and compare both fixtures. Add `--offline` when the locked packages are already cached. The root command expects baseline FAIL and fixed PASS, with runtime controls passing in both.

To run this control alone, use `pnpm install --frozen-lockfile --ignore-scripts && pnpm verify`. It should exit 0 and report 237 raw bytes and 192 gzip bytes, versus 426 and 307 in the baseline. The patch configuration is in `pnpm-workspace.yaml`; the verifier confirms that both comments were actually installed.

See the baseline README for the source commit, controls, build settings and limitations.
