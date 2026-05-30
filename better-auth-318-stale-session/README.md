# Better Auth `#318` repro

Standalone Nuxt repro for stale `useUserSession()` state after Better Auth admin impersonation.

## Run

```bash
cd /Users/maxi/repros/better-auth-318-stale-session
pnpm install
pnpm dev
```

The app runs at [http://localhost:3001](http://localhost:3001).

## Seeded credentials

- Admin: `admin318@example.com` / `password123`
- User: `user318@example.com` / `password123`

## Repro flow

1. Open `/login` and sign in as the seeded admin.
2. Open `/admin`.
3. Click `Impersonate seeded regular user`.
4. On `/app`, compare the two `useUserSession()` consumers with the debug panel.

Expected result after impersonation:

- Reactive `useUserSession()` state still shows the admin user.
- Fresh `/api/auth/get-session` data shows the regular user with `session.impersonatedBy` set to the admin id.
- Clicking `Force fetchSession()` resynchronizes the reactive state.

## Verified behavior

Observed in browser automation on April 29, 2026:

- Before manual refresh:
  - Reactive email: `admin318@example.com`
  - Fresh server session email: `user318@example.com`
- After `fetchSession({ force: true })`:
  - Reactive email: `user318@example.com`
  - Fresh server session email: `user318@example.com`

That isolates the issue to client invalidation after impersonation rather than shared state inside `useUserSession()`.
