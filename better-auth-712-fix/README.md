# POST bodies dropped in `nuxt dev` with a Cloudflare preset, issue 712, fixed control

[Source issue](https://github.com/nuxt-modules/better-auth/issues/712). [Failing fixture](../better-auth-712/README.md).

This control is identical to the failing fixture except for `patches/@nuxtjs__better-auth@0.3.15.patch`. The patch changes one line in the module's Nitro 2 adapter: it streams a request with no buffered body when `req.readable` is true, instead of when it has no `__unenv__` key. node-mock-http's in-process `IncomingMessage` is never readable. A real request stays readable until its body is consumed, whatever plugins attach to it.

## Run

```sh
git clone --depth 1 --branch repro/better-auth-712 https://github.com/onmax/repros.git
cd repros/better-auth-712-fix
pnpm install --frozen-lockfile && pnpm verify
```

The verifier is the same as in the failing fixture. Here `pnpm verify` passes with `401 INVALID_EMAIL_OR_PASSWORD`, and `pnpm verify --expect-bug` fails. Verification output is in `evidence.txt`.

With the patch applied, an SSR `useFetch` POST to `/api/auth/sign-up/email` under the same preset still returns the new user, so issue 648's in-process path keeps working. That check was run by hand and is not part of the verifier.
