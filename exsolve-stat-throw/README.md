# exsolve: every missing path probe throws an error

`tryStatSync` in exsolve 1.1.3 (`src/internal/resolve.ts`) calls `statSync(path)` and catches the error. Module resolution probes many paths that don't exist, so a lookup that fails creates and throws hundreds of `ENOENT` errors, each with a stack trace.

Nitro 2's `node-externals` plugin hits this once per server chunk. mlly guesses the subpath `vue/server-renderer/index.mjs`, which is not an `exports` key of `vue`, so every lookup fails. Nitro passes the chunk as the first base, so exsolve's cache never hits.

`verify.mjs` makes the same call as Nitro 2.13.5's `tryResolve`: the same options, one importer per lookup, and the app's `node_modules` plus 12 layer `node_modules` dirs as bases (Nuxt adds one per layer). It counts how many `statSync` calls threw and times each lookup.

## Environment

- exsolve 1.1.3, vue 3.5.44 (pinned in `package.json` and `pnpm-lock.yaml`)
- Node 24.21.0, pnpm 11.28.3, Linux

## Verify

```sh
git clone --branch repro/exsolve-stat-throw https://github.com/onmax/repros.git
cd repros
for d in exsolve-stat-throw exsolve-stat-throw-fix; do (cd $d && pnpm install --frozen-lockfile && pnpm verify); done
```

`pnpm verify` exits 1 while `statSync` throws and 0 once it doesn't.

## Expected and actual

Expected: a failed lookup probes missing paths without throwing.

Actual, in this fixture:

```text
exsolve 1.1.3, node v24.21.0
failed lookups:        200 x "vue/server-renderer/index.mjs", one importer each, 14 bases
time per lookup:       10.06 ms wall, 10.18 ms CPU
statSync throws:       640 per lookup (expected 0)
BUG: each failed lookup throws 640 ENOENT errors from statSync
```

[`../exsolve-stat-throw-fix`](../exsolve-stat-throw-fix) runs the same script with `statSync(path, { throwIfNoEntry: false })`: 0 throws and about 6.5 ms per lookup.

The cost grows with the number of bases and how far up each walk goes. In a 12-layer Nuxt 4.6.2 app (Nitro 2.13.5), with layers outside the app folder, the same call throws 2,720 times and takes about 30 ms per lookup; with the fix it takes about 13 ms.

## Why each part is here

- `vue`: a real package whose `exports` don't list the guessed subpath.
- One importer per lookup: exsolve caches per importer, and Nitro passes a different chunk each time.
- 12 layer dirs: Nitro's `moduleDirectories` has one per layer. Without them, a lookup throws 64 times instead of 640; the bug is the same, only smaller.
