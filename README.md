# Ofetch unused default client

With ofetch 2.0.0-alpha.3 and esbuild 0.28.2, a browser bundle that imports only `FetchError` retains the default fetch client. Annotating the package's default `createFetch({ fetch })` call allows esbuild to remove it.

This branch contains a published-package baseline in `ofetch-pure-initializers/` and a fixed control in `ofetch-pure-initializers-fix/`. They use identical inputs and verification code. The fixed control applies a one-line pnpm patch. `pnpm-workspace.yaml` declares that patch because pnpm 11 ignores `package.json#pnpm.patchedDependencies`.

Use Node 24.21.0 and pnpm 11.28.6:

```sh
git clone --branch repro/ofetch-pure-initializers --single-branch https://github.com/onmax/repros.git
cd repros
node verify.mjs
```

The command performs clean frozen-lockfile installs with lifecycle scripts disabled. It expects the baseline verifier to exit 1 with `UNUSED_CLIENT_RETAINED`, expects the fixed verifier to exit 0, compares runtime observations, and exits 0 only if the claim is reproduced. Use `node verify.mjs --offline` when all pinned packages are cached. On a shared Slimbook, run `HEAVY_WAIT=0 heavy env GOMAXPROCS=2 node verify.mjs --offline`.

| Browser ESM, ES2022, minified | Raw before → after | Gzip before → after |
| --- | ---: | ---: |
| Live `FetchError` result | 6,070 → 364 | 2,405 → 262 |
| Retained fetching and effects control | 6,520 → 6,520 | 2,596 → 2,596 |

Gzip uses level 9. These are fixture measurements, not application savings. The fetching control exports a callable `$fetch`, uses an injected local `Response`, and checks the default wrapper with a local fetch stub. No external requests are made. Global getters, throwing getters, public factory argument effects, options getters, null options and missing fetch are checked before the size assertion.

The source counterpart is a single annotation on `src/index.ts` at upstream main `1dbc37fd1ceab832fc7c90cad81b1091c95ba563`. V2 supplies an always-defined local fetch function; public `createFetch` remains unannotated. The analogous v1 call is excluded because undefined dependency options can cause observable fallback getter reads inside its factory.

`evidence/` contains recorded results and provenance. The command also checks the exact main TypeScript snapshots in `source/` using esbuild emission and confirms the comment survives. This yields 6,116 → 364 raw bytes and 2,428 → 262 gzip bytes, with unchanged retained controls. It did not run the unavailable upstream obuild pipeline. Default Rollup has separate assumptions about global reads; the headline results and executable reproduction use esbuild and assert getter preservation.
