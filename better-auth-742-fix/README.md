# `serverAuth().api` plugin endpoint types, issue 742, fixed control

[Source issue](https://github.com/nuxt-modules/better-auth/issues/742). [Failing fixture](../better-auth-742/README.md).

This control is identical to the failing fixture except for `patches/@nuxtjs__better-auth@0.3.16.patch`. The patch changes `ResolvedAuthOptions` in the module's `auth.d.ts` to pass the user's plugin tuple to `betterAuth` as a required, mutable tuple. It ports the module source fix to the published declaration file.

## Run

```sh
git clone --branch repro/better-auth-742 https://github.com/onmax/repros.git
cd repros/better-auth-742-fix
pnpm install --frozen-lockfile && pnpm verify
```

The verifier is the same as in the failing fixture. Here `pnpm verify` passes: the server typecheck reports no errors. Output is in `evidence.txt`.
