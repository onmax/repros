# Vue PURE initializer control

This is the fixed control for [the baseline reproduction](../vue-pure-initializers/README.md). Package versions, browser production build settings, input files, runtime controls, and verifier are identical. Three committed pnpm patches add exactly six PURE comments to the Vue 3.5.44 ESM distributions.

With Node **24.21.0** and pnpm **11.28.5**, run from the repository root:

```sh
node verify.mjs
```

The command installs and verifies both arms. The baseline retains `1 / 4 / 1` unused initializers; this control retains `0 / 0 / 0`. Every used-export control must still pass, including a component rendered through the fallback `emptyAppContext`.

The patches change only the browser ESM distributions used by the repro. They are a test control for the upstream TypeScript candidate, not a rebuilt or published Vue package. See the baseline README for provenance and [recorded output](../EVIDENCE.md) for results.
