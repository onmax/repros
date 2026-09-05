# better-auth-9401

Issue: https://github.com/better-auth/better-auth/issues/9401

## Problem

Calling `client.admin.impersonateUser(...)` changes the server session, but the vanilla Better Auth `useSession` atom stays on the previous user until a manual `refetch()`.

This repro uses:

- no Nuxt
- no `@onmax/nuxt-better-auth`
- `better-auth@1.6.9`
- the vanilla Better Auth client plus the admin plugin

## Verify

```bash
pnpm i
pnpm verify
```

Expected verify output:

```json
{
  "beforeReactiveEmail": "admin318@example.com",
  "beforeFreshEmail": "admin318@example.com",
  "reactiveEmail": "admin318@example.com",
  "freshEmail": "user318@example.com"
}
```

## Browser Verify

```bash
pnpm dev
```

Open `http://localhost:3004` and:

1. Sign in as `admin318@example.com` / `password123`
2. Click `Impersonate seeded user`
3. Compare the reactive `useSession` consumers with the fresh `getSession()` panel
4. Click `Force useSession refetch()` to prove the client store only updates after a manual refetch

## Expected

After `admin.impersonateUser(...)`, the reactive `useSession` atom should immediately switch to `user318@example.com`.

## Actual

After impersonation, fresh `getSession()` returns `user318@example.com`, while the reactive `useSession` atom remains on `admin318@example.com` until `refetch()`.
