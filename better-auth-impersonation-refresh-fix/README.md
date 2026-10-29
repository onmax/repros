# Admin impersonation session refresh, fixed control

[Failing fixture](../better-auth-impersonation-refresh/README.md).

This control is identical to the failing fixture except for `patches/better-auth@1.7.14.patch` and `patches/better-auth@1.8.0-beta.3.patch`. Both patches change one condition in `dist/api/routes/session.mjs`. When the admin plugin is installed, `getSession` skips the sliding refresh for a stored session that has `impersonatedBy`, as it already does when the `dont_remember` cookie is present. This is the same change as the upstream pull request, applied to the published `dist`.

## Run

```sh
git clone --branch repro/better-auth-impersonation-refresh https://github.com/onmax/repros.git
cd repros/better-auth-impersonation-refresh-fix
pnpm install --frozen-lockfile && pnpm verify
```

The verifier is the same as in the failing fixture. Here `pnpm verify` passes: every scenario keeps the expiry, and the session ends after `impersonationSessionDuration`. `pnpm verify --expect-bug` fails. Verification output is in `evidence.txt`.

The stateless cookie-cache control still sets `session_token` `Max-Age=604800`. That branch keeps `session.expiresAt`, so the session still ends on time. The patch leaves it unchanged.
