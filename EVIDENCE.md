# Verification evidence

Observed on 2026-10-25 with Node 24.21.0, pnpm 11.28.5, Vue 3.5.44, esbuild 0.28.2, and Linux x64. Both fixtures were genuinely installed from the local pnpm store with zero downloads. Their installed browser ESM files differ by exactly the six committed PURE comments.

The documented command passed after clearing both fixtures' generated dependencies and bundles:

```sh
node verify.mjs --offline
```

```text
baseline reactivity: retained=1, raw=852, gzip=543
baseline shared: retained=4, raw=1342, gzip=786
baseline runtime-core: retained=1, raw=2887, gzip=1555
baseline: exact tree-shaking failure reproduced; used-export controls pass
patched reactivity: retained=0, raw=116, gzip=126
patched shared: retained=0, raw=1092, gzip=655
patched runtime-core: retained=0, raw=2151, gzip=1204
patched: expected tree shaking passes; used-export controls pass
PASS: baseline fails tree shaking at all six sites; patched output removes them; runtime controls pass.
```

Each row measures its input with all six comments applied in the patched arm. The reductions are not additive measurements of individual comments. Turning annotation handling off produces identical minified bundles for both arms.

The controls execute both sets of bundled exports, retain the initializers when used, preserve Vue's global instance and SSR setter registrations, and check repeated string-helper calls, reactive updates, symbol tracking, and component context fallback.

The separate source candidate uses `vuejs/core` at `0ff253bfba3ee8d3d65448bd44ad890fd01b0ecd`. All six annotations survive per-file TypeScript transpilation. A consumer built from the actual `general.ts` and `makeMap.ts` sources retains four unused caches before and zero after, and all four string helpers pass focused behavior checks in both states. This was a partial source check. The official Vue package build, typecheck, and upstream unit suite were not run.
