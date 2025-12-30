# hub-754-fixed: Improved static preset detection

## Fix
Patch improves static detection in NuxtHub to also check preset string:
- `static` preset
- `*-static` presets (e.g., `cloudflare-pages-static`)

## Verify
```bash
pnpm i && pnpm build
```

## Expected & Actual
Build fails early with clear error:
```
[nuxt:hub] ERROR NuxtHub is not compatible with `nuxt generate` as it needs a server to run.
[nuxt:hub] ℹ To pre-render all pages: https://hub.nuxt.com/docs/recipes/pre-rendering#pre-render-all-pages
```
