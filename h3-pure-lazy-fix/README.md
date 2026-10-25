# Fixed control

The same H3 2.0.8 release and fixture, with a pnpm patch adding `/* @__NO_SIDE_EFFECTS__ */` above `defineLazyEventHandler` in its published bundle.

From the branch root, run `node verify.mjs` to install and verify both states. See the [comparison README](../README.md) for pinned tools, controls, and evidence.

After installation, `pnpm verify` in this directory runs the common acceptance check and exits 0. Only this directory applies the package patch; application inputs and the verifier are shared with the baseline.
