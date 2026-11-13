# Cube client drops the fetch error behind `network Error`

When `fetch` rejects, `@cubejs-client/core` throws an error whose message is only `network Error`.
`HttpTransport` returns `{ error: 'network Error' }` and drops the rejected error, so `error.cause` is empty.
On Node, the same failed request with plain `fetch` reports why in `error.cause`, such as `ECONNREFUSED`.

Tested on Linux with Node 24.21.0 and pnpm 11.28.6, against `@cubejs-client/core` 1.8.22, the latest release on 2026-11-13.

```sh
git clone --single-branch --branch repro/cube-client-network-error https://github.com/onmax/repros.git
cd repros
bash verify.sh
```

`verify.sh` exits 0 when the published package drops the cause and the patched control keeps it.

| Fixture | Package | `node check.mjs` |
|---|---|---|
| `cube-client-network-error/` | 1.8.22 | exits 1: `network Error`, `cause` is `undefined` |
| `cube-client-network-error-fix/` | 1.8.22 with `patches/` | exits 0: `error.cause.cause.code` is `ECONNREFUSED` |

`check.mjs` opens a free port and closes it, so the request is refused without a Cube server.
It runs the same request through plain `fetch` first, as a control that Node reports `ECONNREFUSED` there.
The fix fixture differs only by a `pnpm patch` of the compiled ESM files. The patch keeps the fetch error as `cause` on the transport result and passes it to `RequestError`.
