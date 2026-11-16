# Control: nuxt-prerendered-hash-reload with nuxt/nuxt#36938

Written by an AI agent (Claude Code) for @onmax. No human has reviewed it yet.

Same app and same `verify.mjs` as [`../nuxt-prerendered-hash-reload`](../nuxt-prerendered-hash-reload), plus a `pnpm patch` on `nuxt-nightly@5.0.0-2611161229-4959451` with the source change of nuxt/nuxt#36938: on the first navigation, `scrollBehavior` returns `false` for a hash unless the route came from a redirect or the app uses hash history. The verifier listens on port 43928 here.

```sh
pnpm install
pnpm verify
```

```
Chromium 156.0.8078.4, http://127.0.0.1:43928
scrollY after scrolling to 1000 and reloading (expected 1000):
  /ssr#section: 1000
  /prerendered#section: 3000
    scrollTo({"left":0,"top":1000}) at scrollY 0
    scrollTo({"behavior":"auto","left":0,"top":3000}) at scrollY 1000
FAIL: a page did not keep its position after the reload
```

The server-rendered page now keeps its position. The prerendered page still jumps: its last `scrollTo` comes from the deferred route restore, which runs after hydration as a same-page navigation from `/prerendered` to `/prerendered#section`.
