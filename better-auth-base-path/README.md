# Better Auth base-path

Unsupported server basePath is accepted even though the module registers its handler at /api/auth.

Source: [nuxt-modules/better-auth at 90b945a](https://github.com/nuxt-modules/better-auth/tree/90b945ad2366d6ade92b99ce0885f2831c8ef8d0). This is an audit report without a pre-existing issue. The failing fixture preserves the copied upstream implementation; `provenance.json` lists the exact files. Node.js 24.19.0, pnpm 11.22.0 and dependency versions are pinned. No credentials or deployment are needed.

```sh
pnpm install --frozen-lockfile && pnpm verify
```

The command exits nonzero if this fixture's claim is false. Its output records expected and actual behavior. The real config helper and Better Auth handler preserve the routing boundary. The requests need no listening server or database. The module registers /api/auth/** in src/module/hooks.ts; a custom Better Auth path cannot match those incoming URLs.

The fixed sibling uses the same verification command. The narrow reproductions cover the public contract; upstream regression tests additionally cover generated Nuxt types and configured plugin fields.

To reproduce from GitHub:

```sh
git clone --depth 1 --branch repro/better-auth-base-path https://github.com/onmax/repros.git
cd repros/better-auth-base-path
pnpm install --frozen-lockfile && pnpm verify
```
