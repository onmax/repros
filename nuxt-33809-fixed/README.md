# Bug Fix Verification: #33809

This reproduction includes a pnpm patch that fixes the client component duplication issue.

## The Fix

The issue was in `nuxt-island.ts` where during hydration, the SSR HTML (which contains teleported client component content) was cached to `payload.data[key].html`. On client-side navigation, this cached HTML was used instead of fetching fresh HTML, causing duplication because:

1. Cached HTML had client component content inside
2. Teleports ALSO added the same client component
3. Result: TWO components

The fix removes the unnecessary caching of SSR HTML during hydration, since the clean HTML from `setPayload()` during SSR is already available.

## Steps to Verify Fix

```bash
pnpm install
pnpm dev
```

1. Open http://localhost:3000
2. Click "Like" button - works
3. Click "About" link
4. Click "Home" link
5. **Only ONE Like button appears** ✓
