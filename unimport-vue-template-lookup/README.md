# Baseline

From the repository root, run `pnpm install --frozen-lockfile`. Then run `node verify.mjs` in this directory.

Expected exit status is 42. The addon performs repeated linear searches through the import registry. Use the [root verifier](../README.md) to compare this failure with the fixed sibling and check matching output.
