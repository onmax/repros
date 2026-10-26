# @nuxtjs/i18n sets up its server context on every request

Source: nuxt-modules/i18n#4144. Fix: nuxt-modules/i18n#4174.

`@nuxtjs/i18n` builds its server context (`event.context.nuxtI18n`) in Nitro's `request` hook, so every request pays for it. That includes API routes, files from `public/` and `/_nuxt` assets, which never use it. Most of the cost is `useRuntimeConfig(event)`, which in Nitro 2 copies the runtime config for each event.

## Environment

- Node 24.21.0, pnpm 11.
- `nuxt` 4.6.2 (Nitro 2), `@nuxtjs/i18n` 10.6.0, three locales.
- Production build (`nuxt build`, `node .output/server/index.mjs`).

## Verify

```sh
git clone --depth 1 --branch repro/i18n-4144 https://github.com/onmax/repros.git
cd repros
node verify.mjs
node bench.mjs
```

`verify.mjs` installs and builds both fixtures. It checks that the pages render their translations, then requests an API route, a public file and a `/_nuxt` asset, and reads whether i18n set up its context for each.

- **Expected:** no i18n context for requests that render no page.
- **Actual (this fixture):**

  ```
  i18n-4144: pages /, /nl and /fr render their translated title
  i18n-4144: /api/report -> i18n server context set up: true (expected true)
  i18n-4144: /robots.txt -> i18n server context set up: true (expected true)
  i18n-4144: /_nuxt/BQtqP0r6.js -> i18n server context set up: true (expected true)
  ```

- **Fix control** (`../i18n-4144-fix`, the same app with `patches/@nuxtjs__i18n@10.6.0.patch`):

  ```
  i18n-4144-fix: pages /, /nl and /fr render their translated title
  i18n-4144-fix: /api/report -> i18n server context set up: false (expected false)
  i18n-4144-fix: /robots.txt -> i18n server context set up: false (expected false)
  i18n-4144-fix: /_nuxt/JLQQXMhb.js -> i18n server context set up: false (expected false)
  ```

## Bench

`node bench.mjs` runs after `verify.mjs` and uses its builds. It starts one server at a time, alternates the order each round, and sends 2000 requests per path per round. It reads the server's own CPU time (`process.cpuUsage()` through `/api/cpu`), so client time isn't counted.

Median of 6 rounds, Node 24.21.0, on a shared 16-core Linux machine:

| request | before | after | change |
|---|---|---|---|
| API route | 0.448 ms | 0.157 ms | -65% |
| public file | 0.547 ms | 0.305 ms | -44% |
| `/_nuxt` asset | 1.060 ms | 0.821 ms | -23% |
| page | 1.743 ms | 1.557 ms | -11% |

The first three dropped in every round. The page is noise: the rounds overlap, and pages still set up the context in `render:before`. Nuxt's renderer calls `useRuntimeConfig(event)` for pages anyway, so they gain nothing.

## Why each part is here

- `server/plugins/i18n-context-header.ts` sets `x-repro-i18n-context` in `beforeResponse`, after i18n had its chance to set up the context. It is instrumentation only.
- `server/api/report.get.ts` is a server route that uses no i18n. `public/robots.txt` is a public file.
- `app/pages/index.vue` and the three locale files check that pages still get translated with the fix.
- `server/api/cpu.get.ts` is for the bench only.

## The fix

The patch drops the `request` hook. The context is set up the first time something needs it: `render:before` for pages, the messages route, and the server locale detector.
