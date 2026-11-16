# Nitro: `import.meta.url` is undefined in Cloudflare Worker output

Nitro 2 replaced `import.meta.url` with `"file:///_entry.js"` in Worker output. Nitro 3 leaves it as is, and workerd has no `import.meta.url`, so a module-level `new URL("./file", import.meta.url)` (common in dependencies that locate fonts or Wasm files) throws `TypeError: Invalid URL string.` when the chunk loads. Every route that imports that chunk returns 500, while `nitro build` passes.

Pinned: `nitro@3.0.261103-rc`, `rolldown@1.3.2`, `wrangler@4.163.0` (local workerd), Node 24.

```sh
npm install
npm run verify   # starts `wrangler dev` on 127.0.0.1:47741 (PORT=... to change)
```

Expected: `GET /font` returns 200.
Actual: `GET /meta` shows `importMetaUrl: "undefined"`, and `GET /font` returns 500 with `TypeError: Invalid URL string.` `verify` exits 1.

Workaround: `replace: { "import.meta.url": JSON.stringify("file:///_entry.js") }` in the Nitro config.
