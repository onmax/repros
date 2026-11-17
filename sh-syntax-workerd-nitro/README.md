# sh-syntax: parse in workerd from a Nitro 3 Cloudflare build

Checks that sh-syntax 0.8.7 parses in workerd from a `cloudflare_module` Nitro build without a resolver that swaps `lib/index.js` for `lib/browser.js`. Since 0.8.4, `exports["."]` maps the `workerd` condition to `lib/workerd.js`, which imports `../main.wasm` as a module.

Pinned: `nitro@3.0.261103-rc`, `rolldown@1.3.2`, `sh-syntax@0.8.7`, `wrangler@4.163.0`, Node 24.

```sh
npm install
npm run verify   # builds, then starts `wrangler dev` on 127.0.0.1:47761 (PORT=... to change)
```

- `GET /parse` uses the bare `sh-syntax` import.
- `GET /module` imports `sh-syntax/main.wasm?module` and passes it to `getProcessor`.

Both return `{"statements":1}` with 0.8.7. With 0.8.3, `/parse` returns 500 (`no such file or directory, readAll '/bundle/main.wasm'`) and `/module` still passes.

The build prints `Failed to load the WebAssembly module; falling back to module mode: Cannot resolve module "gojs"`. That is expected: Go WASM gets its imports from `wasm_exec` at runtime, so unwasm gives a `WebAssembly.Module`, which `getProcessor` accepts.
