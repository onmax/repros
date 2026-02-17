# nuxt-better-auth-107

Issue: https://github.com/nuxt-modules/better-auth/issues/107

## Problem
`defineServerAuth()` rejects plugin arrays in some version-mismatch setups, and `AuthUser` loses plugin/additionalFields inference.

## Verify
```bash
pnpm i && npx nuxi prepare && npx vue-tsc --noEmit
```

## Expected
Typecheck succeeds and route rules accept plugin/additional field keys.

## Actual
Type errors for plugin assignability and missing inferred user fields.
