# defu: unused merger initialization

With defu 6.1.7 and esbuild 0.28.2, importing only `defu` retains the unused `defuFn` and `defuArrayFn` initializations. Adding PURE comments to the three factory calls lets esbuild remove the unused mergers.

[Reproduction branch](https://github.com/onmax/repros/tree/repro/defu-pure-initializers).

## Run

Requires Node 24.21.0 and pnpm 11.28.5 available on PATH. The lockfiles pin the packages and platform binaries.

```sh
git clone --depth 1 --branch repro/defu-pure-initializers https://github.com/onmax/repros.git defu-repro
cd defu-repro
node verify.mjs
```

The command installs both fixtures from their lockfiles, expects the unpatched assertion to fail with `UNUSED_MERGERS_RETAINED`, expects the patched assertion to pass, prints minified and gzip byte counts, and exits nonzero if any claim or runtime control fails. For an already populated pnpm cache, `node verify.mjs --offline` avoids package downloads. Installs skip lifecycle scripts; esbuild uses its pinned optional native package.

## Comparison

On Linux x64, the fixture drops from 878 to 716 minified bytes, or 485 to 433 gzip bytes. The control using all three mergers remains byte-identical at 1,008 bytes. A clean offline run passed with the pinned Node and pnpm versions.

- `defu-pure-initializers/` uses the published package unchanged.
- `defu-pure-initializers-fix/` applies a committed pnpm patch to that same package. Only three comments change.
- Both directories contain identical input, control, and verification code. After the root command installs dependencies, run `node verify.mjs` inside either directory to inspect that state's assertion directly.
- The fixture keeps ordinary `defu` in use. A second bundle uses all three mergers and checks callback behavior; its output must stay byte-identical.
- Readable output checks the two retained declarations. Separate minified output supplies the size measurement. Both use browser ESM, ES2022, normal tree shaking and gzip level 9.

The proposed upstream change targets [`unjs/defu` at `82632b66`](https://github.com/unjs/defu/blob/82632b66f5914e9946edce300e10633a3d5c0cb7/src/defu.ts). This reproduction exercises the published ESM build. The patch does not mark the merging functions themselves pure.

The same verifier against source builds from that commit gives the same sizes. unbuild 3.6.1 preserves the three PURE comments in both ESM and CJS, and declaration outputs are unchanged.

Rollup and Rolldown already remove these unused initializations in the corresponding fixtures. The measurements above apply to this esbuild fixture.

To check a local upstream build, run the fixed fixture with `DEFU_ENTRY=/absolute/path/to/defu/dist/defu.mjs node verify.mjs` after building defu. That changes only package resolution. This environment-variable syntax is for POSIX shells; in PowerShell, set `$env:DEFU_ENTRY` before running `node verify.mjs`.
