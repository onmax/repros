# nuxt-33824

Issue: https://github.com/nuxt/nuxt/issues/33824

## Problem

`nuxt generate` doesn't crawl/discover pages when initial route (`/`) has a redirect routeRule. Only error pages (/, /200, /404) are generated.

Regression introduced in v4.2.1 via PR #33662 which changed prerender routes hook from `pages:extend` to `pages:resolved`.

## Verify

```bash
pnpm i
pnpm generate
ls .output/public
```

## Expected

All page routes should be generated:
- `/main/index.html`
- `/page-a/index.html`
- `/page-b/index.html`
- `/200.html`
- `/404.html`

## Actual

Only error pages generated:
- `/200.html`
- `/404.html`
- (empty index.html for `/`)

The crawler starts from `/` which returns a redirect, so it can't discover any links.
