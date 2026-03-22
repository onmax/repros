# nuxt-better-auth-signout

## Problem

`signOut()` with `auth.redirects.logout: '/'` doesn't navigate after sign-out.

`navigateTo(logoutRedirect)` in `useUserSession.signOut()` resolves successfully but the router doesn't change the URL. The `clearSession()` call before `navigateTo` triggers reactive updates from the internal session watcher, which causes Vue Router to drop the navigation.

## Reproduce

```bash
pnpm i && BETTER_AUTH_SECRET=test-secret pnpm dev
```

1. Sign up with any email/password
2. You're on `/dashboard`
3. Click "Sign out"
4. **Expected**: redirect to `/`
5. **Actual**: stays on `/dashboard` (session IS cleared — user data disappears)

> Note: in a minimal repro this may work correctly. The bug surfaces when there are reactive subscriptions (e.g. realtime queries) that react to the auth state change, creating enough reactive churn during `signOut()` to cause Vue Router to swallow the `navigateTo`.

## Root cause

In `useUserSession.ts` `signOut()`:

```ts
await client.signOut()   // triggers session watcher reactivity
clearSession()           // triggers more reactivity (loggedIn → false)
await navigateTo('/')    // swallowed by Vue Router due to concurrent reactive updates
```

## Suggested fix

Add `await nextTick()` before `navigateTo` to let reactive effects settle:

```ts
if (logoutRedirect) {
  await nextTick()
  await navigateTo(logoutRedirect)
}
```
