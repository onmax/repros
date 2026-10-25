# H3 unused lazy handler

An unused `defineLazyEventHandler()` call survives Rolldown tree-shaking when the same module re-exports the used `getQuery` helper. Adding `/* @__NO_SIDE_EFFECTS__ */` to that factory lets Rolldown remove the unused handler and its dependencies.

This branch compares H3 **2.0.8** with the same release plus one annotation. The baseline is in `h3-pure-lazy/`; `h3-pure-lazy-fix/` applies a pnpm patch. Their `src/` files are identical and use one shared verifier. This is an isolated library bundle, not a Nitro application measurement.

## Run

Use Node **24.21.0** and pnpm **11.28.5**, then run from this branch's root:

```sh
git clone --depth 1 --branch repro/h3-pure-lazy https://github.com/onmax/repros.git h3-repro
cd h3-repro
node verify.mjs
```

The command removes each fixture's `node_modules`, installs both frozen lockfiles from scratch, builds both fixtures, and runs the assertions. With those packages already cached, use `node verify.mjs --offline`. On Slimbook, run it through `HEAVY_WAIT=0 heavy node verify.mjs --offline`.

The baseline must exit **42** with `FAIL_UNUSED_LAZY_HANDLER`; the fixed fixture must exit **0**. The root command succeeds only when both outcomes and every control match. It exits nonzero for an install error, unexpected baseline failure, changed fixture input, lost runtime behavior, or failed tree-shaking. It saves new results under `.output/`.

To run the same acceptance check in either fixture after installation:

```sh
pnpm --dir h3-pure-lazy verify
pnpm --dir h3-pure-lazy-fix verify
```

The first command intentionally fails. The root command checks that failure for you.

## What the controls prove

- The mixed entry imports the registry's `getQuery` export while leaving its lazy handler unused. A unique string identifies the retained dead handler in the minified output.
- The live-only entry exports `getQuery` without creating a handler. Its before/after output must be byte-identical.
- The dead-argument entry increments a counter while evaluating the factory's argument. The increment must survive exactly once; its lazy loader must never run, and Rolldown must remove its unused handler after the patch.
- The runtime entry keeps the lazy factory in use. Unbundled and bundled handlers must defer loading, share one pending load across concurrent requests, reuse the loaded handler, and return the expected JSON through `.fetch()`.
- Every fixture runs through both `h3/generic` and the ordinary `h3` import on the Node platform. Only the import specifier changes. Both Rolldown **1.2.14** and esbuild **0.28.2** build minified ESM. esbuild is a zero-reduction control; its output must be byte-identical across the patch.

## Recorded result

A clean offline install on Linux x64 with the pinned runtime and tools produced the expected baseline failure and fixed pass. Both generic and normal Node entries measured **14,140 → 1,214 bytes raw** and **5,107 → 714 bytes gzip** with Rolldown. esbuild stayed at **14,231 bytes raw / 5,219 bytes gzip**. The live-only outputs were byte-identical before and after, and all ten runtime checks passed in each state. Gzip uses Node zlib at level 9.

See [the check log](evidence/verification.log) and [full results](evidence/comparison.json). These measurements use H3 2.0.8, `srvx` 1.0.7, and `rou3` 1.0.0.

## Provenance

The package version is H3 2.0.8, with transitive versions and registry integrity hashes in each lockfile. No dependency is resolved from another checkout. The fixed package patch adds one comment in `dist/cache.mjs`, the published location of `defineLazyEventHandler`. No transform plugin or call-site annotation changes the test.

The upstream source target is [`h3js/h3@f0e17808ac2439b6434bb10609a961067f4d555b`, `src/handler.ts`](https://github.com/h3js/h3/blob/f0e17808ac2439b6434bb10609a961067f4d555b/src/handler.ts). The matching source change adds the annotation immediately above `defineLazyEventHandler`, leaving other functions unchanged. H3's build configuration preserves comments beginning with `#` or `@`. This CLI verifies the patched published artifact; it does not run H3's full upstream build or test suite.

This was discovered by a direct bundle experiment; there is no originating upstream issue. Earlier H3 2.0.7 measurements are not substituted for the 2.0.8 evidence recorded here. Checked results live in `evidence/`.
