# Baseline

H3 2.0.8 with no package patch. The unused lazy handler remains in the minified Rolldown output while `getQuery` is used.

From the branch root, run `node verify.mjs` to install and verify both states. See the [comparison README](../README.md) for pinned tools, controls, and evidence.

After installation, `pnpm verify` in this directory runs the common acceptance check and intentionally exits 42 with `FAIL_UNUSED_LAZY_HANDLER`.
