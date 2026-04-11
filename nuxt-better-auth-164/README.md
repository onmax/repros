# nuxt-better-auth-164

Issue: https://github.com/nuxt-modules/better-auth/issues/164

## Problem
1. `routeRules.auth.user` does not accept augmented/inferred `AuthUser` fields (e.g. `role`).
2. `auth.redirects` is not typed (option recently removed).

## Verify (baseline, should fail)
```bash
pnpm i
npx nuxi prepare
npx vue-tsc --noEmit
```

## Expected
- `AuthUser` augmentation is recognized.
- `routeRules.auth.user` accepts `role`.
- `auth.redirects` is typed.

## Actual (before fix)
- `AuthUser` augmentation is recognized (see `app/typecheck.ts`).
- `auth.redirects` errors as missing option.

## Verify (after fix)
Point the module dependency to a local build of the PR:

```bash
cd /Users/maxi/.codex/worktrees/3ff1/better-auth
pnpm i
pnpm exec nuxt-module-build build

cd /Users/maxi/repros/nuxt-better-auth-164
pnpm add @onmax/nuxt-better-auth@file:/Users/maxi/.codex/worktrees/3ff1/better-auth
npx nuxi prepare
npx vue-tsc --noEmit
```
