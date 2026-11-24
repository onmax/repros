# Nitro 3: `/_openapi.json` server URL behind a TLS proxy

Nitro 3 with `experimental.openAPI` and `openAPI.production: "runtime"`. A production build serves `/_openapi.json` with:

- `servers[0].url` built from `getRequestURL(event).origin`, which ignores `x-forwarded-proto` and `x-forwarded-host` in h3 v2. Behind a proxy that terminates TLS, the URL is `http://…`.
- `servers[0].description` hardcoded to `"Local Development Server"`, also in production.

```sh
git clone -b repro/nitro-openapi-servers https://github.com/onmax/repros
cd repros/nitro-openapi-servers
pnpm install
pnpm verify
```

`pnpm verify` builds, starts `.output/server/index.mjs` and requests `/_openapi.json` with `x-forwarded-proto: https` and `x-forwarded-host: example.com`.

Actual (nitro 3.0.261103-rc):

```
servers: [{"url":"http://127.0.0.1:3917","description":"Local Development Server","variables":{}}]
FAIL
```

Expected: `https://example.com`, without the dev label.

## Control: nitropack 2.14

`../nitropack-2-control` builds the same app with nitropack 2.14.0 (h3 v1). There `getRequestURL` trusts `x-forwarded-proto` by default, so the URL is `https://…` (the host still comes from `Host`). `pnpm verify` there checks only the protocol and passes:

```
servers: [{"url":"https://127.0.0.1:3917","description":"Local Development Server","variables":{}}]
PASS
```
