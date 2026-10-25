# VueUse unused string-helper initializers

This branch contains the baseline in `vueuse-pure-initializers/` and a fixed control in `vueuse-pure-initializers-fix/`.

Use Node 24.21.0 and pnpm 11.28.6, then run from this directory:

```sh
git clone --depth 1 --branch repro/vueuse-pure-initializers https://github.com/onmax/repros.git vueuse-repro
cd vueuse-repro
node verify.mjs --clean
```

Add `--offline` to install from an existing pnpm content store. The command expects the baseline to fail the unused-helper assertion, the fixed control to pass, and both runtime controls to pass. It exits nonzero for any other outcome.

See `vueuse-pure-initializers/README.md` for the pinned source, measurements and limitations.
