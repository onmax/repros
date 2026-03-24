# nuxt-better-auth-294

Issue: [nuxt-modules/better-auth#294](https://github.com/nuxt-modules/better-auth/issues/294)

## Problem

Minimal NuxtHub 0.10.7 app using PostgreSQL through Cloudflare Hyperdrive and the published `@onmax/nuxt-better-auth@0.0.2-alpha.31`.

This app proves two different paths:

- `GET /api/db-check` uses `@nuxthub/db` directly and succeeds on the deployed Worker.
- Better Auth sign-up and session lookup use the module-managed Drizzle adapter on top of `@nuxthub/db`.

On a deployed Worker with a real Hyperdrive binding, direct DB access works, but Better Auth session or user queries can fail with `Failed query: select ... from "session"` or `Failed query: select ... from "user"`.

## Verify

```bash
pnpm install
pnpm typecheck
pnpm build
```

Local direct PostgreSQL verification:

```bash
cp .env.example .env
pnpm dev
```

Then:

- open `/`
- sign up
- refresh the direct DB check
- refresh the server auth check

Manual curl flow:

```bash
curl -i -c cookies.txt -H 'content-type: application/json' \
  -d '{"name":"Demo User","email":"demo@example.com","password":"demo-password-123"}' \
  http://localhost:3000/api/auth/sign-up/email

curl -i http://localhost:3000/api/db-check

curl -i -b cookies.txt http://localhost:3000/api/auth-check
```

Cloudflare Worker verification:

1. Set `HYPERDRIVE_ID` in `nuxt.config.ts` via env.
2. Provide `DATABASE_URL` and `NUXT_BETTER_AUTH_SECRET` to the Cloudflare build.
3. Deploy the Worker.
4. Tail logs with `wrangler tail <worker-name>`.
5. Repeat sign-up, sign-in, and authenticated session requests.

## Expected

- Local direct PostgreSQL works for both `/api/db-check` and the Better Auth flow.
- On the deployed Worker, both `/api/db-check` and authenticated Better Auth session lookups succeed through the Hyperdrive-backed PostgreSQL database.

## Actual

- Local direct PostgreSQL works.
- On the deployed Worker, `/api/db-check` succeeds.
- Better Auth sign-up may succeed, but follow-up session or user reads can fail with PostgreSQL query errors during `select ... from "session"` or `select ... from "user"`.
