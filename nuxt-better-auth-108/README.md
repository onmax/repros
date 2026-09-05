# nuxt-better-auth-108

Issue: https://github.com/nuxt-modules/better-auth/issues/108

## Problem
`updateUser()` only patches local reactive state. It doesn't call `client.updateUser()` to persist changes to the server.

## Verify
```bash
pnpm i && pnpm dev
```

1. Open http://localhost:3000
2. Click "Sign Up"
3. Click "Update Name" → name changes to "Updated"
4. Click "Refresh Session" → name reverts to "Original"

## Expected
Name stays "Updated" after session refresh.

## Actual
Name reverts to "Original" because update was never persisted to server.
