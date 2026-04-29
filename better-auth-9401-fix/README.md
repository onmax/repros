# better-auth-9401-fix

Issue: https://github.com/better-auth/better-auth/issues/9401

## Problem

This is the fixed companion repro for issue `#9401`.

This repro uses:

- no Nuxt
- no `@onmax/nuxt-better-auth`
- `better-auth@1.6.9`
- the vanilla Better Auth client plus the admin plugin
- a `pnpm patch` that revalidates the client session after admin impersonation starts or stops

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
  "reactiveEmail": "user318@example.com",
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
3. Confirm the reactive `useSession` consumers switch to `user318@example.com` immediately
4. Compare them with the fresh `getSession()` panel to confirm both are already aligned

## Fix

The patch adds `"/admin/impersonate-user"` to the admin client mutating route map and emits `"$sessionSignal"` for both impersonation start and stop, following Better Auth's existing route-signal invalidation pattern.
