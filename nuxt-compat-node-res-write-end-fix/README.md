# Fixed control for `nuxt-compat-node-res-write-end`

This is the app from `../nuxt-compat-node-res-write-end` with one change: `patches/@nuxt__nitro-v3-server@4.7.0.patch`, applied through `pnpm patch`. It is the change from https://github.com/nuxt/nuxt/compare/main...onmax:nuxt:fix/compat-node-res-write-end, built against the published 4.7.0 package.

The patch gives the in-process `event.node.res` a `write` and an `end`. It buffers what the handler writes and sends it when `end` is called. It also stops `prepareLegacyEvent` from building a new `event.node` on each v1 handler, so a request hook and the handler see the same response object.

```bash
git clone --depth 1 --branch repro/nuxt-compat-node-res-write-end https://github.com/onmax/repros.git
cd repros/nuxt-compat-node-res-write-end-fix
pnpm install && pnpm verify
```

Output:

```
HTTP         {"status":200,"body":"ok"}
serverFetch  {"status":200,"body":"ok"}
PASS
```
