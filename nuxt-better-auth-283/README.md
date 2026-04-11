# nuxt-better-auth-283

Issue: https://github.com/nuxt-modules/better-auth/issues/283

## Problem
`signOut()` with `auth.redirects.logout: '/'` clears the session but can leave the app on `/dashboard` instead of navigating home.

The dashboard page includes a small auth-state watcher that reasserts the dashboard route when the session clears. This simulates the same-tick reactive router work that makes the race visible in real apps.

## Verify
```bash
pnpm i && BETTER_AUTH_SECRET=test-secret-test-secret-test-secret pnpm dev
```

1. Sign up with any email/password.
2. Confirm you land on `/dashboard`.
3. Click `Sign out`.

## Expected
The app navigates to `/`.

## Actual
The user is signed out, but the browser stays on the dashboard route.
