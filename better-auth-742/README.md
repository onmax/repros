# `serverAuth().api` loses plugin endpoint types, issue 742

[Source issue](https://github.com/nuxt-modules/better-auth/issues/742). [Fixed control](../better-auth-742-fix/README.md).

With `admin()`, `organization()` and `anonymous()` in `server/auth.config.ts`, `serverAuth(event).api` has only Better Auth's core endpoints. Reading `createUser`, `hasPermission` or `signInAnonymous` in a server route is a TS2339 error. The endpoints exist at runtime; only the types are wrong.

## Run

```sh
git clone --branch repro/better-auth-742 https://github.com/onmax/repros.git
cd repros/better-auth-742
pnpm install --frozen-lockfile && pnpm verify
```

`pnpm verify` runs `nuxt prepare`, then `vue-tsc --noEmit -p .nuxt/tsconfig.server.json`, and lists the endpoints TypeScript reports as missing. It exits nonzero while any are missing. `pnpm verify --expect-bug` asserts the reported result instead. Output is in `evidence.txt`.

```
Expected missing plugin endpoints: []
Actual missing plugin endpoints:   ["createUser","hasPermission","signInAnonymous"]
```

## Environment

`@nuxtjs/better-auth` 0.3.16, `better-auth` 1.7.25, Nuxt 4.6.4, TypeScript 5.9.3, vue-tsc 3.3.14, Node 24.21.0, pnpm 12.18.0.

## Why each part is here

- One endpoint per plugin shows that every plugin is lost, not one. `getSession` is read as a control and typechecks.
- The server tsconfig is the one Nuxt generates for `server/`, where users call `serverAuth()`.

## Cause

Better Auth infers plugin endpoints with `Options['plugins'] extends (infer T)[]`. Since 0.3.11 the module's `ResolvedAuthOptions` replaces the user's plugin tuple with `plugins?: BetterAuthOptions['plugins']`, which has no plugin endpoints. Passing the tuple back as readonly or optional also fails that check, because a readonly tuple is not an array type and `| undefined` is not an array.
