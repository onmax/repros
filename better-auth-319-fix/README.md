# better-auth-319-fix

Issue: [nuxt-modules/better-auth#319](https://github.com/nuxt-modules/better-auth/issues/319)

## Problem

Forwarding `useUserSession()` from a setup store causes SSR to crash when the store layer inspects client-only auth actions such as `signIn`.

## Verify

```bash
pnpm i
pnpm dev
```

Then:

1. Open `http://localhost:3020/`
2. Confirm the page renders on first load
3. Confirm the page reports `signIn` and `signUp` are not refs
4. Confirm `signIn.email` and `signUp.email` still exist as callable client-only methods

## Expected

Pinia and Vue can inspect forwarded `useUserSession()` values during SSR without crashing, while actual auth action invocation stays client-only.

## Actual

Before the fix, the initial SSR render fails with an error like `signIn.__v_isRef() can only be called on client-side`.

## Fix

This folder applies a `pnpm patch` to `@onmax/nuxt-better-auth@0.0.2-alpha.31` so server-side `signIn` and `signUp` expose SSR-safe stubs. Pinia can inspect them during SSR, but invoking nested auth methods still throws the same client-only runtime error.
