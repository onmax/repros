# vitehub.dev site audit issues

Ahrefs Site Audit crawled vitehub.dev on 14 November 2026 (2,870 URLs) and reported new errors and warnings:

- Page size exceeds 2 MB crawl limit: `/docs/agents/diagnostics` is 2,609,979 bytes of HTML.
- 4XX page: `/mcp` answers `405` to `GET`, and `/docs/getting-started/ai-resources` links to it.
- Slow server response for AI crawlers: 10 pages with a TTFB over 1.8 s.
- Open Graph tags incomplete: 451 pages, which have no `og:url` and no `og:type`.
- Page has links to redirect: 2,841 pages, because the footer links to `https://chat.vitehub.dev` (`302`).

## Verify

Requires Node.js 22 or later. It has no dependencies.

```sh
node verify.mjs                 # https://vitehub.dev
node verify.mjs http://localhost:3000
```

`crawl.mjs` starts at `/` and the sitemap, follows every same-origin link (anchors, `<link rel=alternate|canonical>`, `Link` headers, and Markdown links outside code), and writes one row per URL to `crawl.json`. It sends the Ahrefs Site Audit user agent, because vitehub.dev answers AI user agents such as GPTBot with Markdown. `verify.mjs` prints `REPRODUCES` or `fixed` for each issue and exits `1` while any issue reproduces.

## Observed on 14 November 2026

```txt
https://vitehub.dev: 5683 URLs, 2841 HTML, 2394 noindex, TTFB p50 174 ms, p90 362 ms, max 2171 ms
REPRODUCES  HTML page over 2 MB: 1
              2609979 B https://vitehub.dev/docs/agents/diagnostics
REPRODUCES  Linked URL answers 4xx: 1
              405 https://vitehub.dev/mcp <- https://vitehub.dev/docs/getting-started/ai-resources
REPRODUCES  Indexable page lacks required Open Graph tags (first 20 sampled): 19
              https://vitehub.dev/contact missing og:type, og:url
REPRODUCES  Every page links to a redirect: 1
              302 https://chat.vitehub.dev
REPRODUCES  TTFB over 1.8 s: 7
              2171 ms https://vitehub.dev/docs/agents/diagnostics/agent_r0487
```

## Causes

- Page size: every table cell, link, and code span of the diagnostics index carries the full Nuxt UI prose class strings, about 900 bytes for each of about 1,000 rows. Class attributes are 1.77 MB of the 2.6 MB. Each diagnostic page also ships a 237 KB sidebar that lists every code of the panel.
- TTFB: the docs Worker sets `assets.run_worker_first: ["/*", ...]` to negotiate Markdown, so every HTML request, prerendered pages too, waits for a Worker cold start. The 2,394 noindex diagnostic pages are rendered on request and have no `cache-control`.
- Open Graph: the head sets `og:title`, `og:description`, and `og:image`, but not `og:url` or `og:type`.

TTFB depends on Worker cold starts, so its count changes from run to run. The other checks are deterministic.
