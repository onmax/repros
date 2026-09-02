# Better Auth disabled cookie-cache migration repro

This fixture reproduces a session failure after an application disables Better Auth's cookie cache.

Source issue: https://github.com/better-auth/better-auth/issues/11119

The first Better Auth 1.7.2 configuration creates a database session and issues a JWE `session_data` cache cookie. The fixture asserts the cookie's five-part JWE shape, then constructs a second Better Auth 1.7.2 instance over the same database with `session.cookieCache.enabled: false`. It sends the cookies from the first response to `GET /api/auth/get-session`.

Using the same release on both sides isolates the configuration migration. An application does not need to upgrade Better Auth to trigger the failure.

## Run

Use Node.js 22 or later and pnpm 10.33.0.

```sh
pnpm install --frozen-lockfile
pnpm repro
```

## Expected and actual behavior

Expected: the new configuration ignores or expires the unused `session_data` cookie and returns the database-backed session.

Actual: `get-session` returns `500` and Better Auth logs `Invalid Base64 character: .`.

The verifier repeats the request without `session_data` as a control. That request returns `200` with the same `session_token` and database state.

The fixture calls Better Auth's Fetch handler directly. A browser is not required because the failure occurs after the browser has sent the Cookie header.
