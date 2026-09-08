# Better Auth required session field reproduction

Better Auth 1.7.3 cannot create a session with a required additional field through
`testUtils.login()`. Its supported input is only `{ userId }`, so the helper has
no way to populate a required field that has no default.

The verifier exercises the proposed `session` option. Unpatched JavaScript
ignores that option and throws `NOT NULL constraint failed: session.providerToken`.
The [patched sibling](../better-auth-session-fixtures-fix/) runs the identical
verifier and succeeds. This is an additive test-helper capability, not a claimed
regression. No originating upstream issue exists.

## Run

```sh
git clone --depth 1 --branch repro/better-auth-session-fixtures https://github.com/onmax/repros.git
cd repros/better-auth-session-fixtures
pnpm install --frozen-lockfile && pnpm verify
```

Expected unpatched output, exit code **1**:

```text
EXPECTED: login accepts providerToken and returns an authenticated session.
ACTUAL: NOT NULL constraint failed: session.providerToken
```

Then run the same command in the patched sibling:

```sh
cd ../better-auth-session-fixtures-fix
pnpm install --frozen-lockfile && pnpm verify
```

Exit code **0** requires both login and an authenticated session lookup to
preserve the supplied value. An unexpected error also exits nonzero, so compare
the exact output against `verification.txt` when checking the baseline.

## Environment and provenance

- Published npm package `better-auth@1.7.3`, the version pinned by Portal when the
  failure was reported. The lockfile pins transitive versions and integrity hashes.
- Node **24.19.0**, pnpm **11.15.1**, verified on Linux x86_64. pnpm installs the
  pinned Node runtime through `devEngines.runtime` when needed.
- Better Auth's own migrations create an in-memory SQLite database. A real
  NOT NULL constraint is the failure boundary. Node's built-in `node:sqlite`
  avoids native addon builds and requires local Node execution for this repro.
- `providerToken` reduces Portal's required Directus access token to one string.
  Directus, Nuxt, real tokens, networking, and a deployment are unnecessary.
  Removing `input: false` did not change the failure.

The original verifier also proved that adding only a field default made login
and session lookup succeed. That control is preserved in commit `c07c332`;
this branch now compares identical per-login inputs before and after the fix.

The published `dist/plugins/test-utils/types.d.mts` only accepts `userId` for
login. `auth-helpers.mjs` calls `internalAdapter.createSession(userId)` with no
session fields. User overrides and returned cookies/tokens already exist.

The script closes its database in `finally` and starts no processes or services.
This validates the Node/SQLite boundary, not Portal's PostgreSQL deployment.
There is no hosted URL. Use local Node rather than StackBlitz for `node:sqlite`.
