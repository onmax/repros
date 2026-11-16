# Fixed control for nuxt-prerendered-hash-reload

Written by an AI agent (Claude Code) for @onmax. No human has reviewed it yet.

Same app and same `verify.mjs` as [`../nuxt-prerendered-hash-reload`](../nuxt-prerendered-hash-reload), plus a `pnpm patch` on `nuxt-nightly@5.0.0-2611161229-4959451` with two changes:

- the source change of nuxt/nuxt#36938 (as in [`../nuxt-prerendered-hash-reload-pr36938`](../nuxt-prerendered-hash-reload-pr36938));
- in the router plugin, the deferred route restore of a prerendered page scrolls as the first navigation (`initialScrollBehavior`), so `scrollBehavior` sees `START_LOCATION` and the restored position instead of a same-page hash change. Other navigations keep the normal `scrollBehavior`.

The verifier listens on port 43929 here.

```sh
pnpm install
pnpm verify
```

```
Chromium 156.0.8078.4, http://127.0.0.1:43929
scrollY after scrolling to 1000 and reloading (expected 1000):
  /ssr#section: 1000
  /prerendered#section: 1000
    scrollTo({"left":0,"top":1000}) at scrollY 0
    scrollTo({"left":0,"top":1000}) at scrollY 1000
PASS: both pages kept their position after the reload
```
