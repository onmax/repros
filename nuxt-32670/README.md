# nuxt-32670

Issue: https://github.com/nuxt/nuxt/issues/32670

## Problem
`<Link rel="alternate">` duplicates in client-side HTML after hydration.

## Verify
```bash
pnpm i && pnpm dev
```
Open browser, check DevTools → Elements → `<head>`:
- `link[rel="alternate"]` appears TWICE (bug)
- `link[rel="canonical"]` appears ONCE (correct)

## Expected
Both link tags appear once.

## Actual
`rel="alternate"` is duplicated after hydration.
