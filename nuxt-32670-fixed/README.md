# nuxt-32670-fixed

Issue: https://github.com/nuxt/nuxt/issues/32670

## Problem
`<Link rel="alternate">` duplicates in client-side HTML after hydration.

## Fix Applied
Auto-generate dedupe key for `rel="alternate"` links based on hreflang.

## Verify
```bash
pnpm i && pnpm dev
```
Open browser, check DevTools → Elements → `<head>`:
- `link[rel="alternate"]` appears ONCE (fixed)
- `link[rel="canonical"]` appears ONCE (already working)

## Result
Both link tags appear once.
