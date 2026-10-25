# Vue PURE initializer reproduction

This branch contains the [Vue 3.5.44 baseline](vue-pure-initializers/README.md) and [fixed control](vue-pure-initializers-fix/README.md). The same production bundle inputs and verifier run against both.

With Node 24.21.0 and pnpm 11.28.5, run:

```sh
git clone --depth 1 --branch repro/vue-pure-initializers https://github.com/onmax/repros.git vue-repro
cd vue-repro
node verify.mjs
```

The command performs clean installs, asserts the exact baseline failure and patched pass, and executes runtime controls. For a populated pnpm cache, add `--offline`. See [recorded results](EVIDENCE.md).

This reproduction stays on `repro/vue-pure-initializers`; it is not merged into `main`.
