# `event.node.res` has no `write` or `end` on in-process requests under Nitro 3

> Written by an AI agent (Claude Code). Not yet reviewed by a human.

Nuxt 4.7.0 runs Nitro v3 when `nitro` is installed, and gives h3 v1 code an `event.node` bridge. A request that arrives over HTTP gets a proxy over the real Node response. A request made in process, such as `serverFetch('/api/inner')` from `nitro`, has no Node runtime and gets a plain object instead. That object has header and status methods and `writeHead`, but no `write` or `end`.

So a `request` hook that wraps `event.node.res.write` or `.end`, as response-size telemetry does, throws a `TypeError` on in-process requests only. Nitro passes the error to the `error` hook and serves the request anyway, so the hook silently skips its work. Nitro 2's `localFetch` used a mock Node response that had both methods.

## Run

```bash
git clone --depth 1 --branch repro/nuxt-compat-node-res-write-end https://github.com/onmax/repros.git
cd repros/nuxt-compat-node-res-write-end
pnpm install && pnpm verify     # fails: TypeError from the request hook
cd ../nuxt-compat-node-res-write-end-fix
pnpm install && pnpm verify     # passes
```

`verify.mjs` runs `nuxt build`, starts `.output/server/index.mjs`, and calls `/api/inner` twice: over HTTP, and in process through `/api/outer`, which uses `serverFetch`. It expects both to answer `{"status":200,"wrapped":"wrapped","body":"{\"ok\":true}"}` and the `error` hook to log nothing.

Actual, unpatched:

```
GET /api/inner (HTTP)         -> {"status":200,"wrapped":"wrapped","body":"{\"ok\":true}"}
GET /api/inner (serverFetch)  -> {"status":200,"wrapped":null,"body":"{\"ok\":true}"}
server log: [error hook] tags=request TypeError: Cannot read properties of undefined (reading 'bind')
AssertionError [ERR_ASSERTION]: expected the request hook to throw no error
```

## Versions

- `nuxt` 4.7.0 (`@nuxt/nitro-v3-server` 4.7.0)
- `nitro` 3.0.261103-rc (opts the app into Nitro v3)
- Node 24, pnpm 10.33.0

## Fixtures

- `nuxt-compat-node-res-write-end/`: unpatched. The request hook throws on the `serverFetch` request.
- `nuxt-compat-node-res-write-end-fix/`: the same app with `patches/@nuxt__nitro-v3-server@4.7.0.patch`. The patch gives the in-process response bridge `write` and `end`. What a handler writes is buffered, and `end` makes it the response. The patch also keeps the `event.node` that the request hook saw when a v1 handler prepares the event again. Both requests pass.

`server/plugins/count-bytes.ts` is the trigger. It wraps `write` and `end`, then sets `x-count-bytes: wrapped`, so a response without that header shows the hook stopped early. Its `error` hook prints what Nitro captured. `/api/outer` exists only to make the in-process request.
