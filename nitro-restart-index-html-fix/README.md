# Fixed control for `../nitro-restart-index-html`

Same fixture and `verify.mjs`, with `patches/nitro@3.0.261103-rc.patch` adding `cache: false` to Nitro's `./index.html` and `./server` lookups. `pnpm install && pnpm verify` exits 0 when `/` answers 200 after the Vite restart. See `../nitro-restart-index-html/README.md`.
