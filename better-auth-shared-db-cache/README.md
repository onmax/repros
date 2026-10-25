# @nuxtjs/better-auth rebuilds the auth instance on every request with a process-wide database

With a NuxtHub database (Postgres through `postgres-js`, no Hyperdrive), `serverAuth()` builds a new Better Auth instance for every request. It also calls the app's `defineServerAuth` factory on every request, before it checks its cache, so every plugin factory runs again. Each SSR page triggers this through the module's `/api/auth/get-session` call.

## Environment

- Node 24.21.0, pnpm 11.
- `nuxt` 4.6.2, `@nuxtjs/better-auth` 0.3.13, `better-auth` 1.7.13, `@nuxthub/core` 0.10.11, `drizzle-orm` 0.45.4, `postgres` 3.4.9.
- Production build (`nuxt build`, `node .output/server/index.mjs`). No database server is needed: guest sessions never query it.

## Verify

From the branch root:

```sh
node verify.mjs
```

The script installs both fixtures, builds them for production, sends 10 SSR requests to `/`, and asserts:

- **Expected:** the factory runs once, and two requests get the same instance.
- **Actual (this fixture):**

  ```
  better-auth-shared-db-cache: 10 page requests -> defineServerAuth factory called 10 times (expected 10)
  better-auth-shared-db-cache: serverAuth() returns the same instance on the next request: false (expected false)
  ```

- **Fix control** (`../better-auth-shared-db-cache-fix`, the same app with `patches/@nuxtjs__better-auth@0.3.13.patch`):

  ```
  better-auth-shared-db-cache-fix: 10 page requests -> defineServerAuth factory called 1 times (expected 1)
  better-auth-shared-db-cache-fix: serverAuth() returns the same instance on the next request: true (expected true)
  ```

## Why each part is here

- `@nuxthub/core` with `hub.db` makes `createDatabase()` return an adapter, which sets `cacheable = false`. Without it, the instance is cached (`same: true`) but the factory still runs on every request (10 calls), because `createServerAuth()` runs before the cache lookup.
- `server/auth.config.ts` counts its own calls. In a real app this factory builds plugins such as `jwt()`, `mcp()` and `oauthProvider()`, which accounted for 1.6 ms of a 9.5 ms request in a Portal-shaped app.
- `server/api/instance.get.ts` compares `serverAuth()` with the instance from the previous request.

## Cause and fix

- `src/runtime/server/utils/auth.ts` has `const cacheable = !database && !derivedSecretMissing`. nuxt-modules/better-auth#295 made database-backed instances per-request because a Hyperdrive `postgres` client must not outlive a Worker request.
- NuxtHub's other drivers create `db` once per process or isolate.
- The patch adds `isRequestScopedDatabase(event)` to `#auth/database` (true only with a Hyperdrive connection string), caches unless the database is request-scoped, and looks the cache up before calling the factory.

Measured effect on a Portal-shaped Nuxt 4 app, server CPU per request: near-empty page 15.4 → 9.7 ms (−37%); guest `/` 34.4 → 20.3 ms (−41%).
