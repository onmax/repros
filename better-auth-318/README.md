# better-auth-318

Issue: [nuxt-modules/better-auth#318](https://github.com/nuxt-modules/better-auth/issues/318)

## Problem

After calling Better Auth admin impersonation, the cookie-backed session switches to the impersonated user, but `useUserSession()` stays on the original admin until a manual refresh via `fetchSession()`.

## Verify

```bash
pnpm i
pnpm dev
```

Then:

1. Open `http://localhost:3001/login`
2. Sign in as `admin318@example.com` / `password123`
3. Open `/admin`
4. Click `Impersonate seeded regular user`
5. Land on `/app` and compare the reactive session cards with the debug panel

## Expected

After impersonation, all `useUserSession()` consumers should update immediately to the impersonated user.

## Actual

The reactive session cards still show `admin318@example.com`, while a fresh `/api/auth/get-session` fetch already returns `user318@example.com`. Clicking `Force fetchSession()` resynchronizes the client state.
