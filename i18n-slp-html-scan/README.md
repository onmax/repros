# @nuxtjs/i18n scans the whole rendered HTML on every request

`@nuxtjs/i18n`'s `switch-locale-path-ssr` plugin runs a global regex (`<!--nuxt-i18n-slp-[…]-->.+?<!--/nuxt-i18n-slp-->`) over the whole rendered HTML in `app:rendered`, on every server render. It does this even when the page has no `SwitchLocalePathLink`, which is the only thing it rewrites.

## Environment

- Node 24.21.0, pnpm 11.
- `nuxt` 4.6.2, `@nuxtjs/i18n` 10.6.0, two locales.
- Production build (`nuxt build`, `node .output/server/index.mjs`).

## Verify

```sh
git clone --depth 1 --branch repro/i18n-slp-html-scan https://github.com/onmax/repros.git
cd repros
node verify.mjs
node bench.mjs
```

The script installs and builds both fixtures, requests `/` (no link) 5 times and `/with-link` once, and reads the scan counter.

- **Expected:** no scan for a page without the link, and one scan with the href rewritten for the page with it.
- **Actual (this fixture):**

  ```
  i18n-slp-html-scan: 5 requests to a page without SwitchLocalePathLink (521115 bytes of HTML) -> 5 HTML scans, 509170 characters scanned (expected 5 scans)
  i18n-slp-html-scan: page with SwitchLocalePathLink -> 1 HTML scan, href /nl/with-link (expected 1 scan, /nl/with-link)
  ```

- **Fix control** (`../i18n-slp-html-scan-fix`, the same app with `patches/@nuxtjs__i18n@10.6.0.patch`):

  ```
  i18n-slp-html-scan-fix: 5 requests to a page without SwitchLocalePathLink (521115 bytes of HTML) -> 0 HTML scans, 0 characters scanned (expected 0 scans)
  i18n-slp-html-scan-fix: page with SwitchLocalePathLink -> 1 HTML scan, href /nl/with-link (expected 1 scan, /nl/with-link)
  ```

## Bench

`node bench.mjs` runs after `verify.mjs` and uses its builds. It starts one server at a time, alternates the order each round, and sends 2000 requests to `/` per round. It reads the server's own CPU time (`process.cpuUsage()` through `/api/cpu`) and the time spent in the regex (from the counter below).

Median of 6 rounds, Node 24.21.0, on a shared 16-core Linux machine:

| request | measure | before | after |
|---|---|---|---|
| page without SwitchLocalePathLink (`/`) | server CPU | 5.471 ms | 5.689 ms |
| page without SwitchLocalePathLink (`/`) | HTML scan | 0.191 ms | 0.000 ms |

The regex time drops to zero. Total CPU per request moves by more than 0.2 ms between rounds on this machine, so it can't show a 0.19 ms change.

## Why each part is here

- `app/plugins/count-slp-scans.server.ts` wraps `String.prototype.replaceAll` once per process. It counts and times the calls whose pattern is the plugin's regex. `server/api/slp-scans.get.ts` reads the totals.
- `pages/index.vue` has no link. Its 2000 `ReportRow`s have two root nodes each, so Vue wraps them in `<!--[-->` comments like a component-heavy page. That gives 521 KB of HTML for the regex to scan.
- `server/api/cpu.get.ts` is for the bench only.
- `pages/with-link.vue` checks that the rewrite still happens where it is needed.

## Cost and fix

- On a larger Nuxt 4 app with @nuxt/ui, the regex takes 0.26 ms on a 204 KB dashboard body with 3,580 Vue fragment comments. Under load the CPU profile put the hook at 1.1 ms per request, counting the copy it allocates.
- The patch has `SwitchLocalePathLink` add its SSR context to a `WeakSet` during setup, and the plugin returns early for renders that are not in it. The same change on `main` is nuxt-modules/i18n#4173. There, `specs/basic_usage.spec.ts` fails without the mark (`respects experimental.alternateLinkCanonicalQueries`: href stays `/nl/products/big-chair`) and passes with it.
