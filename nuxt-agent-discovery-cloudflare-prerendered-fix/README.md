# nuxt-agent-discovery: prerendered pages on Cloudflare Workers, fixed control

This is the fixed control for [`../nuxt-agent-discovery-cloudflare-prerendered`](../nuxt-agent-discovery-cloudflare-prerendered). It runs the same app and the same `verify.mjs`. The only difference is `patches/nuxt-agent-discovery@0.8.1.patch`, which replaces the module's `dist/` with a build of the fix: commit [`a46079e`](https://github.com/onmax/nuxt-agent-discovery/commit/a46079e251e07b9984b4710c58a0c0418c932ec9) from [benjamincanac/nuxt-agent-discovery#65](https://github.com/benjamincanac/nuxt-agent-discovery/pull/65), on top of v0.8.1 (`489b680`). The patch touches only the five files the change builds into.

Because a page is prerendered, the build writes `"run_worker_first": ["/*", "!/_nuxt/*"]` into `.output/server/wrangler.json`. Every page reaches the Worker first, and Nitro's fingerprinted `/_nuxt/` files stay with Workers Static Assets. In the Worker, the prerendered page is negotiated like any other page, and its HTML half comes from the assets binding. Cloudflare bills those Worker requests, and the Free plan caps them at 100,000 a day.

## Run

```sh
git clone --branch repro/nuxt-agent-discovery-cloudflare-prerendered https://github.com/onmax/repros.git
cd repros/nuxt-agent-discovery-cloudflare-prerendered-fix
pnpm install
pnpm verify
```

## Result

```
GET /docs/on-demand (Accept: text/markdown)
  expected: 200 text/markdown, Vary: Accept, User-Agent
  actual:   200 text/markdown; charset=utf-8, Vary: Accept, User-Agent
  body:     # On demand
GET /docs/prerendered (Accept: text/markdown)
  expected: 200 text/markdown, Vary: Accept, User-Agent
  actual:   200 text/markdown; charset=utf-8, Vary: Accept, User-Agent
  body:     # Prerendered
GET /docs/prerendered (Accept: text/html)
  expected: 200 text/html from the prerendered file (ETag), Vary: Accept, User-Agent
  actual:   307 -> /docs/prerendered/, then 200 text/html; charset=utf-8, ETag, Vary: Accept, User-Agent
  body:     <main>HTML for /docs/prerendered</main>

PASS
```

The 307 to `/docs/prerendered/` comes from the assets binding's default `html_handling` (`auto-trailing-slash`). Without the fix, the asset layer sends the same redirect.
