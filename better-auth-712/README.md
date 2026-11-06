# POST bodies dropped in `nuxt dev` with a Cloudflare preset, issue 712

[Source issue](https://github.com/nuxt-modules/better-auth/issues/712). Adapted from the reporter's [reproduction](https://github.com/jd-solanki/reproductions/tree/nuxtjs-better-auth-cloudflare-dev-drops-body--2026-11-06).

With Nuxt 4.6.4 (nitropack 2.13.6, node-mock-http 1.0.5), Better Auth 1.7.18, `@nuxtjs/better-auth` 0.3.15, wrangler 4.158.0, and `nitro.preset: 'cloudflare_module'`, a JSON POST to `/api/auth/sign-in/email` in `nuxt dev` should get `401 INVALID_EMAIL_OR_PASSWORD` for an unknown user. Instead Better Auth receives no body and answers `400 VALIDATION_ERROR`.

In dev, the Cloudflare preset runs nitropack's `cloudflare-dev` plugin, which sets `event.node.req.__unenv__` on every request, including real Node `IncomingMessage`s that still carry their body stream. The module's Nitro 2 `toWebRequest` (since 0.3.13) treats any request with an `__unenv__` key as Nitro's in-process mock and sends no body.

Node 24.21.0 and pnpm 12.15.0 were used for verification. Direct dependencies and the full graph are pinned in `package.json` and `pnpm-lock.yaml`.

## Run

```sh
git clone --depth 1 --branch repro/better-auth-712 https://github.com/onmax/repros.git
cd repros/better-auth-712
pnpm install --frozen-lockfile && pnpm verify --expect-bug
```

The verifier starts `nuxt dev` on `127.0.0.1:3712`, retries the POST until Nitro answers with JSON, prints the response, and stops the server. `--expect-bug` passes only when Better Auth reports the body missing. Without the flag it asserts the expected 401 and fails on the published package.

## Expected and observed

| | Response |
| --- | --- |
| Expected | `401 {"message":"Invalid email or password","code":"INVALID_EMAIL_OR_PASSWORD"}` |
| `@nuxtjs/better-auth` 0.3.15 | `400 {"message":"[body] Invalid input: expected object, received undefined","code":"VALIDATION_ERROR"}` |

Verification output is in `evidence.txt`.

## Why these files remain

- `nuxt dev` is the failure boundary. The `cloudflare-dev` plugin only runs in dev.
- `nitro.preset: 'cloudflare_module'` enables that plugin. The reporter's control removes it and the POST gets the expected 401.
- `wrangler` is required by the plugin, which loads it for the bindings proxy.
- `sign-in/email` with `emailAndPassword` is the smallest endpoint that validates a body without a database or session. Better Auth uses its in-memory adapter.
- `server/auth.config.ts` and `app/auth.config.ts` are required by the module. The verifier supplies a public fixture-only secret.

The sibling [fixed control](../better-auth-712-fix/README.md) keeps the application and dependency versions identical and applies a one-line pnpm patch to the module.
