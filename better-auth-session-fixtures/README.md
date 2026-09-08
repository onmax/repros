# Better Auth test login with a required session field

Given Better Auth 1.7.3 and a generated SQLite schema with a required
`session.providerToken` field, calling `testUtils.login({ userId })` throws
`NOT NULL constraint failed: session.providerToken` instead of returning a
session. The helper has no parameter for supplying that field.

This demonstrates a missing test-fixture capability. It does not establish a
regression or claim that the current API promises session overrides. No upstream
issue has been opened. It comes from Portal's need to create test sessions with
required provider credentials while moving away from seeded administrator users.

## Run

From this directory, with pnpm available:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

The package pins pnpm 11.15.1 and Node 24.19.0. pnpm's `devEngines.runtime`
downloads the pinned Node runtime for the script when needed. The lockfile pins
transitive dependencies and their integrity hashes. Verification uses only an
in-memory database; no server, credentials, Directus, Nuxt, or deployment is needed.

Expected output:

```text
ACTUAL: NOT NULL constraint failed: session.providerToken
EXPECTED CAPABILITY: supply a per-login providerToken and receive a valid session.
CONTROL: adding only defaultValue allows login and authenticated session lookup.
REPRODUCED: required session fields without defaults prevent testUtils.login().
```

Exit code 0 means the exact failure and successful control were both observed.
If login succeeds without the default, throws another error, or the control fails,
the command exits nonzero. The verifier closes both databases in `finally` blocks.

## Evidence and scope

The npm release `better-auth@1.7.3` is the version pinned by Portal when this
reproduction was created. In the installed release:

- `dist/plugins/test-utils/types.d.mts` declares `login(opts: { userId: string })`.
- `dist/plugins/test-utils/auth-helpers.mjs` calls
  `ctx.internalAdapter.createSession(opts.userId)` without session fields.
- User factories already accept overrides, and login already returns cookies,
  headers, and a token. Those features do not need to be added.

The requested capability would let a test provide different session values for
each login. The verifier calls the existing supported API; it does not invent an
unsupported `session` option and treat its rejection as a bug.

`providerToken` represents Portal's required `directusAccessToken` field. Its
name and token contents do not affect the failure. A single required string
without a default is sufficient. Removing Portal's `input: false` setting
did not change the result, so it is omitted from the minimal fixture.

SQLite is necessary to exercise a real NOT NULL constraint. Node's built-in
SQLite avoids native addon builds. Better Auth generates the schema itself.
The control changes only `defaultValue`, proving the user, database setup, session
creation, and cookie-based lookup work when the field is populated. A global
default is a control, not a fix for per-login provider credentials.

See `verification.txt` for the clean-checkout result. This reproduction covers
Node and SQLite, not Portal's PostgreSQL deployment or browser behavior. No fix,
upstream edits, or hosted reproduction are included.
