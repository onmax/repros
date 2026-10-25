# @nuxtjs/i18n scans the whole rendered HTML on every request

`@nuxtjs/i18n`'s `switch-locale-path-ssr` plugin runs a global regex (`<!--nuxt-i18n-slp-[…]-->.+?<!--/nuxt-i18n-slp-->`) over the whole rendered HTML in `app:rendered`, on every server render. It does this even when the page has no `SwitchLocalePathLink`, which is the only thing it rewrites.

## Environment

- Node 24.21.0, pnpm 11.
- `nuxt` 4.6.2, `@nuxtjs/i18n` 10.6.0, two locales.
- Production build (`nuxt build`, `node .output/server/index.mjs`).

## Verify

From the branch root:

```sh
node verify.mjs
```

The script installs and builds both fixtures, requests `/` (no link) 5 times and `/with-link` once, and reads the scan counter.

- **Expected:** no scan for a page without the link, and one scan with the href rewritten for the page with it.
- **Actual (this fixture):**

  ```
  i18n-slp-html-scan: 5 requests to a page without SwitchLocalePathLink (186650 bytes of HTML) -> 5 HTML scans, 174705 characters scanned (expected 5 scans)
  i18n-slp-html-scan: page with SwitchLocalePathLink -> 1 HTML scan, href /nl/with-link (expected 1 scan, /nl/with-link)
  ```

- **Fix control** (`../i18n-slp-html-scan-fix`, the same app with `patches/@nuxtjs__i18n@10.6.0.patch`):

  ```
  i18n-slp-html-scan-fix: 5 requests to a page without SwitchLocalePathLink (186650 bytes of HTML) -> 0 HTML scans, 0 characters scanned (expected 0 scans)
  i18n-slp-html-scan-fix: page with SwitchLocalePathLink -> 1 HTML scan, href /nl/with-link (expected 1 scan, /nl/with-link)
  ```

## Why each part is here

- `app/plugins/count-slp-scans.server.ts` wraps `String.prototype.replaceAll` once per process and counts calls whose pattern is the plugin's regex. It is instrumentation only; `server/api/slp-scans.get.ts` reads the count.
- `pages/index.vue` has no link; its list only makes the HTML large enough to show that the whole page is scanned.
- `pages/with-link.vue` checks that the rewrite still happens where it is needed.

## Cost and fix

- On a Portal-shaped Nuxt 4 app with @nuxt/ui, the regex takes 0.26 ms on a 204 KB dashboard body with 3,580 Vue fragment comments. Under load the CPU profile put the hook at 1.1 ms per request, counting the copy it allocates.
- The patch has `SwitchLocalePathLink` add its SSR context to a `WeakSet` during setup, and the plugin returns early for renders that are not in it. The same change on `main` is the branch `perf/skip-slp-html-scan` in `onmax/i18n`. There, `specs/basic_usage.spec.ts` fails without the mark (`respects experimental.alternateLinkCanonicalQueries`: href stays `/nl/products/big-chair`) and passes with it.
