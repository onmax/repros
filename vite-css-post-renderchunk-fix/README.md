# Fixed control

This is the same app and scripts as `../vite-css-post-renderchunk/`, with `patches/vite@8.3.5.patch` applied. The patch removes the `renderedModules` Proxy. It builds a `Map` from module id to rendered module once for each `meta.chunks` object, keyed in a `WeakMap`. Rolldown makes one `meta.chunks` object per output and reuses it for every `renderChunk` call. The index is built on the first `cssScopeTo` lookup, so builds without `cssScopeTo` don't pay for it.

```sh
pnpm install --frozen-lockfile
pnpm verify
```

```
N      chunks  renderChunk sync  per chunk  whole build  output hash
250    251            6 ms         25 µs       204 ms  b89061692a069139
500    501           10 ms         20 µs       312 ms  806a461222a0ecc0
1000   1001          29 ms         29 µs       756 ms  7f537fb2f8020917
2000   2001          45 ms         23 µs      1316 ms  ad500aa1fd2f3c83
4000   4001         106 ms         26 µs      3474 ms  7ddc7897ca67015b

growth exponent 1.02 (expected about 1, fails above 1.5)
PASS: vite:css-post renderChunk grows linearly
```

The output hashes are the same as the unpatched run at every N.
