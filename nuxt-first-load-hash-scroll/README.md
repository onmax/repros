# Nuxt: a page opened with a hash stops past the target under `scroll-behavior: smooth`

Written by an AI agent (Claude Code) for @onmax. No human has reviewed it yet.

A server-rendered page has `html { scroll-behavior: smooth }`. Opening `/page#target` in Chromium ends with the page scrolled past `#target`. The same page with JavaScript disabled stops on it.

## Environment

- `nuxt-nightly` 5.0.0-2611092254-8b7f263 (Nuxt `main` at `8b7f2633c`)
- Chromium 156.0.8078.4 (the headless shell that `playwright-core` 1.64.0 installs), 1280×720 viewport
- Node 24.21, Linux, pnpm 12

Firefox 157 and WebKit 27.2 stop on the target with the same app.

## Verify

```sh
git clone --branch repro/nuxt-first-load-hash-scroll https://github.com/onmax/repros
cd repros/nuxt-first-load-hash-scroll
pnpm install
pnpm verify
```

`verify.mjs` builds the app, serves it on port 43917 and opens `/page#target` twice, with and without JavaScript. It waits for the scroll position to hold, prints how far `#target` is from the top of the viewport, and exits 1 when that is not 0. It also prints every `window.scrollTo` call the page makes.

```
Chromium 156.0.8078.4, http://127.0.0.1:43917/page#target
Distance from the top of the viewport to #target once the scroll settles (expected 0):
  with JavaScript: -70px
    scrollTo({"behavior":"instant","left":0,"top":3000}) at scrollY 163
  without JavaScript: 0px
FAIL: the page does not stop at #target
```

The number changes with timing. Runs here gave between 50 and 125px.

## Why each part is here

- `html { scroll-behavior: smooth }` in `app/pages/page.vue`: without it the browser jumps to the hash at once and nothing is running when Nuxt scrolls.
- The 150 ms delay on the first script in `verify.mjs`: it stands in for an app that takes longer to load than this one. The app has to start while the browser is still scrolling. Without the delay the page still stops 2 to 20px past the target.
- The run without JavaScript: it shows the page, the CSS and the browser are right until Nuxt starts.

## Cause

The browser starts a smooth scroll to `#target` as soon as it parses the page. When the app starts, Nuxt's default `scrollBehavior` (`packages/nuxt/src/pages/runtime/router.options.ts`) returns `{ el: '#target', behavior: 'instant' }` for the first navigation, and Vue Router calls `window.scrollTo` with it. Chromium adds the rest of its running smooth scroll on top of that jump.

Nuxt is not needed for the Chromium part. A static page with the same CSS that calls `window.scrollTo({ top, behavior: 'instant' })` 100 ms into that scroll stops 53px past the target. With `behavior: 'auto'` it stops on it.

## Fixed control

[`../nuxt-first-load-hash-scroll-fix`](../nuxt-first-load-hash-scroll-fix) runs the same app and verifier with a one-line patch on Nuxt, and passes.
