# srvx: an empty Node stream body never responds

When a srvx `FastResponse` gets an empty Node `IncomingMessage` as its body, the request never gets a response. A one-byte body works. Reported in h3js/srvx#338.

```sh
git clone --branch repro/srvx-empty-node-stream https://github.com/onmax/repros
cd repros/srvx-empty-node-stream
pnpm install
pnpm repro
```

```
empty body:    100/100 requests hung (expected 0)
one-byte body: 0/100 requests hung (expected 0)
Bug reproduced.
```

The script exits 0 when the bug reproduces. Tested with srvx 1.0.7 and Node.js 24.21.0 on Linux.

The script proxies a small upstream server because the bug needs a body stream that ended before srvx subscribed to it. An empty proxied `IncomingMessage` is that case. env-runner 0.3.8 proxies every Nitro dev response this way, so a Nitro dev route that returns `new Response("")` hangs.
