# Fixed control

From the repository root, run `pnpm install --frozen-lockfile`. Then run `node verify.mjs` in this directory.

Expected exit status is 0. The addon bounds repeated scans before indexing the import registry. Use the [root verifier](../README.md) to compare this result with the baseline and check matching output.
