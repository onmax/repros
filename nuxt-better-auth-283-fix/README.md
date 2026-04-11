# nuxt-better-auth-283-fix

Issue: https://github.com/nuxt-modules/better-auth/issues/283

## Problem
`signOut()` with `auth.redirects.logout: '/'` can clear the session before the router gets a stable tick to finish the logout redirect.

The dashboard page includes a small auth-state watcher that reasserts the dashboard route when the session clears. This simulates the same-tick reactive router work that triggered the original bug.

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
Before the patch, the app can remain on `/dashboard`.

## Fix
Patch `@onmax/nuxt-better-auth` so the built-in logout redirect waits for one Vue tick after `clearSession()` before calling `navigateTo(logoutRedirect)`.
