# @better-auth/agent-auth host lookup reproduction

Claim: with `@better-auth/agent-auth@0.6.2`, a host JWT whose `iss` is the RFC 7638 JWK thumbprint reaches the host lookup path. If the adapter rejects that thumbprint as a UUID, the unpatched middleware queries `id` first and returns HTTP 500; the `pnpm patch` control queries `kid` first and avoids the invalid UUID lookup.

Pinned runtime: Node 22, pnpm 10.12.1, `@better-auth/agent-auth@0.6.2`, `better-auth@1.7.3`.

Run the unpatched fixture (expected failure):

```sh
cd better-auth-agent-auth-host-lookup
pnpm install --frozen-lockfile
pnpm verify
```

Run the fixed control (expected pass):

```sh
cd better-auth-agent-auth-host-lookup-fix
pnpm install --frozen-lockfile
pnpm verify
```

The adapter wrapper intentionally models the PostgreSQL UUID cast failure seen when a 43-character JWK thumbprint is passed to an `id` lookup. The fixture then exercises the published package through Better Auth’s handler, rather than calling a copied helper.
