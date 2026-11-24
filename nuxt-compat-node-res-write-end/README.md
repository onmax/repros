# `event.node.res.end` is missing on in-process requests under Nitro 3

On Nuxt 4.7.0 with Nitro 3, an h3 v1 handler that calls `event.node.res.end()` works over HTTP. Called in process through `serverFetch`, the same handler fails with a 500 because the response has no `end`.

## Run

```bash
git clone --depth 1 --branch repro/nuxt-compat-node-res-write-end https://github.com/onmax/repros.git
cd repros/nuxt-compat-node-res-write-end
pnpm install && pnpm verify
```

`verify.mjs` builds the app, starts `.output/server/index.mjs`, and requests `/api/inner` twice. The first request goes over HTTP. The second goes through `/api/outer`, which calls `serverFetch('/api/inner')`. Both should return `200 ok`.

Actual:

```
HTTP         {"status":200,"body":"ok"}
serverFetch  {"status":500,"body":"{\n  \"error\": true, ... }"}
AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal
```

The server logs `TypeError: event.node.res.end is not a function`.

## Why

Over HTTP, `event.node.res` is a proxy over the real Node response. An in-process request has no Node response, so `@nuxt/nitro-v3-server` builds a stand-in that has header and status methods and `writeHead` but no `write` or `end`. Nitro 2's `localFetch` gave these requests a mock response that had both.

## Versions

- `nuxt` 4.7.0, which ships `@nuxt/nitro-v3-server` 4.7.0
- `nitro` 3.0.261103-rc, installed so Nuxt builds with Nitro 3
- Node 24, pnpm 10.33.0

## Fixed control

`../nuxt-compat-node-res-write-end-fix` is the same app with `patches/@nuxt__nitro-v3-server@4.7.0.patch`, the change from https://github.com/nuxt/nuxt/compare/main...onmax:nuxt:fix/compat-node-res-write-end. The patch gives the stand-in `write` and `end`. It buffers what the handler writes and sends it when `end` is called. The same `pnpm verify` passes there.
