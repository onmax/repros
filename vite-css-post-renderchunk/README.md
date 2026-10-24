# vite:css-post renderChunk is quadratic in chunks with `cssScopeTo`

In a build, `vite:css-post` checks each CSS module that has `meta.vite.cssScopeTo` (which `@vitejs/plugin-vue` sets on every SFC `<style>` block). It looks up the importer through a `renderedModules` Proxy. Each lookup scans `meta.chunks` until it finds the module. With N chunks that each hold one scoped CSS file, a build does about N²/2 property lookups.

Source: `packages/vite/src/node/plugins/css.ts` in `cssPostPlugin().renderChunk`, added in vitejs/vite#19775. It is unchanged on `main` at 82e7aa0 (2026-10-23). In the vite@8.3.5 build it is `dist/node/chunks/node.js:30121`.

## Run

```sh
git clone --branch repro/vite-css-post-renderchunk https://github.com/onmax/repros.git
cd repros/vite-css-post-renderchunk
pnpm install --frozen-lockfile
pnpm verify            # node bench.mjs, about 10 s
```

`bench.mjs` runs `build-one.mjs` for N = 250, 500, 1000, 2000 and 4000, each in a new process. `build-one.mjs` writes an app to `.gen/<N>/`: `main.js` lazily imports N modules, and each one imports its own CSS file. It builds the app with Vite and prints:

- the time spent in the synchronous part of `vite:css-post` `renderChunk`, summed over all chunks (the Proxy scan runs before the hook's first `await`)
- the time of the whole build
- a hash of every output file

The script fails when the growth exponent of the renderChunk time, from the smallest to the largest N, is above 1.5.

## Expected and actual

Expected: about the same cost per chunk at every N.

Actual, vite 8.3.5, rolldown 1.2.15, Node 24.21.0, Linux x64:

```
N      chunks  renderChunk sync  per chunk  whole build  output hash
250    251           13 ms         51 µs       278 ms  b89061692a069139
500    501           38 ms         77 µs       381 ms  806a461222a0ecc0
1000   1001         120 ms        120 µs       862 ms  7f537fb2f8020917
2000   2001         632 ms        316 µs      2061 ms  ad500aa1fd2f3c83
4000   4001        2993 ms        748 µs      5821 ms  7ddc7897ca67015b

growth exponent 1.97 (expected about 1, fails above 1.5)
FAIL: vite:css-post renderChunk grows faster than the number of chunks
```

Control: `SCOPE=0 pnpm verify` builds the same app without `cssScopeTo`. renderChunk then takes 4 → 51 ms (exponent 0.95) and the output is the same. `getModuleInfo` still runs for every CSS module in that case, so the Proxy lookup is the cause.

## Why each part is here

- `scope-css-to-importer` plugin: sets `cssScopeTo` the way plugin-vue does. Without it the Proxy is never read.
- One dynamic import per module: makes one chunk per module, so the number of chunks grows with N.
- One CSS file per chunk: one Proxy lookup per chunk.
- `minify: false`: not needed for the bug. It only makes the builds faster.

The fixed control is `../vite-css-post-renderchunk-fix/`. It is the same app with a `pnpm patch` of vite@8.3.5.
