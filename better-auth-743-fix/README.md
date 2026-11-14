# API-key session, issue 743, fixed control

[Source issue](https://github.com/nuxt-modules/better-auth/issues/743). [Failing fixture](../better-auth-743/README.md).

This control is identical to the failing fixture except for `patches/@nuxtjs__better-auth@0.3.16.patch`. The patch makes `loadSession()` and `loadFreshSession()` in the module's `session.js` accept `{ headers, response }` when `headers` is missing, and default the headers to an empty `Headers`. It ports the module source fix to the published `dist` file.

## Run

```sh
git clone --branch repro/better-auth-743 https://github.com/onmax/repros.git
cd repros/better-auth-743-fix
pnpm install --frozen-lockfile && pnpm verify
```

The verifier is the same as in the failing fixture. Here `pnpm verify` passes: `requireUserSession()` returns the user for the API-key request. Output is in `evidence.txt`.
