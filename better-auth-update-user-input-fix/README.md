# Better Auth update-user-input

The public updateUser input accepts immutable output fields.

Source: [nuxt-modules/better-auth at 90b945a](https://github.com/nuxt-modules/better-auth/tree/90b945ad2366d6ade92b99ce0885f2831c8ef8d0). This is an audit report without a pre-existing issue. The fixed control changes only the copied contract implementation; `provenance.json` lists the exact files. Node.js 24.19.0, pnpm 11.22.0 and dependency versions are pinned. No credentials or deployment are needed.

```sh
pnpm install --frozen-lockfile && pnpm verify
```

The command exits nonzero if this fixture's claim is false. Its output records expected and actual behavior. The TypeScript compiler consumes the actual exported declaration; the client-session fixture also executes the original stripToken function extracted by the compiler, without recreating it. Nuxt bootstrapping is unnecessary for this type contract.

The fixed sibling uses the same verification command. The narrow reproductions cover the public contract; upstream regression tests additionally cover generated Nuxt types and configured plugin fields.

To reproduce from GitHub:

```sh
git clone --depth 1 --branch repro/better-auth-update-user-input https://github.com/onmax/repros.git
cd repros/better-auth-update-user-input-fix
pnpm install --frozen-lockfile && pnpm verify
```
