# nuxthub-742-fixed

Issue: https://github.com/nuxt-hub/core/issues/741

## Fix

This version links to local `@nuxthub/core` with fixes:

1. **D1 driver** - Now checks `isRemoteDev()` in addition to cloudflare hosting
2. **Race condition** - `__env__` is a Proxy that throws helpful errors before ready
3. **Warnings** - Shows warning when remote mode connects to Cloudflare bindings
4. **Error messages** - Detects auth/network errors and gives specific guidance
5. **Validation** - Throws if `remote: true` without `databaseId` configured

## Verify

```bash
pnpm i && pnpm dev
```

Shows:
- `WARN  REMOTE MODE - Connected to remote Cloudflare bindings`
- `hub:db using sqlite database with d1 driver`
- Helpful error about bindings not ready (instead of silent undefined)
