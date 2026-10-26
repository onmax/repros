# devframe: a `localhost` side-car is not reachable on `127.0.0.1`

Fix: https://github.com/devframes/devframe/pull/462

A page on `127.0.0.1` cannot connect to the Vite DevTools WebSocket. The browser shows this error:

```
WebSocket connection to 'ws://127.0.0.1:9777/__ws' failed: net::ERR_CONNECTION_REFUSED
```

Vite DevTools starts a devframe side-car when Vite runs in middleware mode. Nuxt DevTools 4 runs Vite this way. The side-car calls `listen(port, 'localhost')`, and Node binds only one address. On current Linux and macOS, that address is `::1`. The page dials the side-car on its own hostname, so a page on `127.0.0.1` gets no answer.

## Run

```sh
git clone --branch repro/devframe-localhost-sidecar https://github.com/onmax/repros.git
cd repros/devframe-localhost-sidecar
pnpm install
pnpm test
```

## Result

`pnpm test` starts Vite in middleware mode on `127.0.0.1`. Then it dials the side-car on both loopback addresses. It exits with code 1 when one address does not connect.

```
page:     http://127.0.0.1:34607/__devtools/
side-car: port 9777, path __ws
ws://127.0.0.1:9777/__ws  expected: connected  actual: refused
ws://[::1]:9777/__ws  expected: connected  actual: connected
FAIL: the side-car listens on only one loopback address.
```

If your machine resolves `localhost` to `127.0.0.1` first, the two results change places. The test fails in both cases.

With the fix from the PR, both addresses connect and the test passes.

## Versions

- `vite` 8.2.2
- `@vitejs/devtools` 0.8.0
- `devframe` 1.2.6 and `@devframes/hub` 1.2.6, pinned with `pnpm.overrides`
- Node 24.21.0, Linux

## Notes

`server.middlewareMode` is necessary. Without it, the socket uses the Vite server, and the bug does not occur.

`hmr: false` stops Vite from opening its HMR socket on port 24678. That port is not part of the bug.
