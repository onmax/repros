# nuxt-better-auth-108-fix

Issue: https://github.com/nuxt-modules/better-auth/issues/108

## Fix
Patches `updateUser()` to call `client.updateUser()` for server persistence with optimistic local update and rollback on error.

## Verify
```bash
pnpm i && pnpm dev
```

1. Open http://localhost:3000
2. Click "Sign Up"
3. Click "Update Name" → name changes to "Updated"
4. Click "Refresh Session" → name stays "Updated" (fixed!)
