# Baseline

Pinned ofetch 2.0.0-alpha.3 and esbuild 0.28.2. From the repository root, run `node verify.mjs` to install and verify both fixtures. This directory's verifier is expected to fail with `UNUSED_CLIENT_RETAINED` after its runtime checks pass. It emits a 6,070-byte minified error-only bundle, 2,405 bytes with gzip level 9.

`input.mjs` retains a real `FetchError` result. `controls.mjs` retains fetching and factory effects using only local responses. Both files and `verify.mjs` are identical in the fixed control.
