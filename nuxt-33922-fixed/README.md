# nuxt-33922-fixed

Issue: https://github.com/nuxt/nuxt/issues/33922

## Problem

Pages with unicode/special characters in filenames (e.g., `测试.vue`) cause 404 errors on client-side navigation. SSR works fine, but clicking NuxtLink fails.

## Verify

```bash
pnpm i && pnpm dev
# Open http://localhost:3000
# Click "Go to 测试 page" link
```

## Expected

Navigation to `/测试` should show the page content.

## Actual (with fix)

Navigation works correctly.

## Fix

Removed `encodePath()` call in `getRoutePath()` function. The fix keeps route paths as raw strings instead of URI-encoding them, allowing Vue Router to match navigation targets correctly.

```diff
- return path + encodePath(token.value).replace(COLON_RE, "\\:");
+ return path + token.value.replace(COLON_RE, "\\:");
```

See `patches/nuxt.patch` for the full diff.
