# Nuxt Auth Utils session replacement reproduction

This branch owns [nuxt-auth-utils #533](https://github.com/atinux/nuxt-auth-utils/issues/533).

- [Failing production Nuxt application](nuxt-auth-utils-533/README.md)
- [Fixed control using the same package version](nuxt-auth-utils-533-fix/README.md)

With Node 20.20.0 and Corepack, run `node verify-pair.mjs` from this directory. It succeeds only when the unpatched state reproduces the stale cookie fields and the patched state passes the same verifier.

Clone this branch with `git clone --single-branch --branch repro/nuxt-auth-utils-533 https://github.com/onmax/repros.git`. Reproduction branches are never merged into `main`.
