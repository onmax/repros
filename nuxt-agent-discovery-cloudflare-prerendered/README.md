# nuxt-agent-discovery: prerendered pages answer HTML to agents on Cloudflare Workers

No upstream issue yet. The module documents the gap in [Deployment > Other hosts](https://github.com/benjamincanac/nuxt-agent-discovery/blob/v0.8.1/README.md#other-hosts): on a host whose CDN serves the prerendered files, "like Netlify or Cloudflare, those requests never reach Nitro, so the pages stay HTML and carry no `Vary`".

On a `cloudflare-module` build, a prerendered page requested with `Accept: text/markdown` should return the page's markdown with `Vary: Accept, User-Agent`, the same answer the Worker gives for a page it renders on demand. Instead, Workers Static Assets redirects it to `/docs/prerendered/` and serves the prerendered HTML, with no `Vary`. Browsers get that file too, also without `Vary`.

The fixed control in [`../nuxt-agent-discovery-cloudflare-prerendered-fix`](../nuxt-agent-discovery-cloudflare-prerendered-fix) runs the same app and the same `verify.mjs` against a patched module.

## Run

```sh
git clone --branch repro/nuxt-agent-discovery-cloudflare-prerendered https://github.com/onmax/repros.git
cd repros/nuxt-agent-discovery-cloudflare-prerendered
pnpm install
pnpm verify
```

`verify.mjs` runs `nuxt build`, then serves `.output/server/wrangler.json` with `wrangler dev` on port 8797 (`PORT` overrides it). It requests both pages with `Accept: text/markdown` and the prerendered page with `Accept: text/html`, and follows redirects by hand so every hop is printed. The HTML check needs the prerendered file (its asset `ETag`) with `Vary`, so a fix that renders the page in the Worker fails it. The script exits 1 when a prerendered check fails, 2 when the on-demand control fails, and 0 when every check passes. `pnpm verify --no-build` reuses the last build.

## Expected

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

This is the output of the fixed control.

## Actual

```
GET /docs/on-demand (Accept: text/markdown)
  expected: 200 text/markdown, Vary: Accept, User-Agent
  actual:   200 text/markdown; charset=utf-8, Vary: Accept, User-Agent
  body:     # On demand
GET /docs/prerendered (Accept: text/markdown)
  expected: 200 text/markdown, Vary: Accept, User-Agent
  actual:   307 -> /docs/prerendered/, then 200 text/html; charset=utf-8, ETag, Vary: (none)
  body:     <main>HTML for /docs/prerendered</main>
GET /docs/prerendered (Accept: text/html)
  expected: 200 text/html from the prerendered file (ETag), Vary: Accept, User-Agent
  actual:   307 -> /docs/prerendered/, then 200 text/html; charset=utf-8, ETag, Vary: (none)
  body:     <main>HTML for /docs/prerendered</main>

FAIL: the prerendered page answers HTML to an agent; Workers Static Assets serves it before the Worker runs
FAIL: the HTML half of the prerendered page is missing `Vary`, or the Worker rendered it instead of serving the file
```

The markdown request gets the asset server's answer (`ETag`, `Cache-Control: public, max-age=0, must-revalidate`), which shows that the Worker never handled it.

## Environment

- `nuxt` 4.6.2 (Nitro 2.13.5, Vite 8.3.5)
- `nuxt-agent-discovery` 0.8.1, the latest release
- `wrangler` 4.152.0 (`workerd` 1.20261019.1, `miniflare` 5.20261019.2-beta)
- Worker `compatibility_date` 2026-10-01
- Node 24.21.0, pnpm 12.15.0, Linux x64

## Why each piece is here

- `nitro.prerender.routes: ['/docs/prerendered']` triggers the bug. Workers Static Assets checks for a matching file before it invokes the Worker, and the module negotiates only inside the Worker.
- `/docs/on-demand` is the control. It is served by the same Worker with the same source, but it is not prerendered. It negotiates, which shows that the module works in workerd and that only the prerendered page fails.
- `agentDiscovery.source` points at a two-page source in `server/agent-source.ts`. With no source, the module turns negotiation off for every page. `@nuxt/content` would also work, but on Workers it needs a D1 binding.
- `nitro.cloudflare.deployConfig: true` makes Nitro write `.output/server/wrangler.json`, the config that Workers Builds deploys. `verify.mjs` serves that file unchanged.
- `compatibilityDate` pins the Worker compatibility date written to `wrangler.json`.
- `app.vue` prints the route, which makes the HTML body easy to identify.
- `minimumReleaseAgeExclude` in `pnpm-workspace.yaml` admits `nuxt-agent-discovery` 0.8.1, which is younger than pnpm's minimum release age. Without the entry, pnpm 12 adds it to the file during install.
