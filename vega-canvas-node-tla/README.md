# vega-canvas: Node build with top-level await in Nitro 3

Checks whether Nitro 3 accepts vega-canvas 2.0.0's Node build, which loads the optional `canvas` package with a top-level `await import("canvas")`.

Pinned: `nitro@3.0.261103-rc`, `vite@8.3.8`, `vega-canvas@2.0.0`, `wrangler@4.163.0`, Node 24.

```sh
npm install
NITRO_PRESET=node_server npx vite build && PORT=47823 node .output/server/index.mjs   # GET / -> {"canvas":null}
NITRO_PRESET=cloudflare_module npx vite build && npx wrangler dev -c .output/server/wrangler.json   # GET / -> {"canvas":null}
```

Result: both presets build with the top-level await kept in `_libs/vega-canvas.mjs`, and `GET /` returns `{"canvas":null}`. The same holds with Nitro's Rolldown builder and in a Nuxt 5 nightly SSR chunk. The old failure came from nitropack 2's es2019 esbuild target, not from vega-canvas.
