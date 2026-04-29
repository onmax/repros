# better-auth-318-fix

Issue: [nuxt-modules/better-auth#318](https://github.com/nuxt-modules/better-auth/issues/318)

## Problem

The bug repro shows that Better Auth admin impersonation changes the session cookie, but does not invalidate the client session atom, so `useUserSession()` stays stale.

## Verify

```bash
pnpm i
pnpm dev
```

Then:

1. Open `http://localhost:3002/login`
2. Sign in as `admin318@example.com` / `password123`
3. Open `/admin`
4. Click `Impersonate seeded regular user`
5. Land on `/app` and compare the reactive session cards with the debug panel

## Expected

After impersonation, all `useUserSession()` consumers should update immediately to the impersonated user.

## Actual

With the patch applied, the reactive session cards switch to `user318@example.com` without needing `Force fetchSession()`.

## Fix

The patch adds `$sessionSignal` invalidation to Better Auth's admin client for `/admin/impersonate-user` and `/admin/stop-impersonating`, so impersonation changes trigger the same session refresh path as other auth mutations.
