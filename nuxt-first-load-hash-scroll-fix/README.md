# Fixed control for nuxt-first-load-hash-scroll

Written by an AI agent (Claude Code) for @onmax. No human has reviewed it yet.

Same app and same `verify.mjs` as [`../nuxt-first-load-hash-scroll`](../nuxt-first-load-hash-scroll), plus a `pnpm patch` on `nuxt-nightly@5.0.0-2611092254-8b7f263`. With the patch, the hash scroll on first load uses `scrollBehaviorType` (`auto` by default) and no longer forces `behavior: 'instant'`. The verifier listens on port 43918 here.

```sh
pnpm install
pnpm verify
```

```
Chromium 156.0.8078.4, http://127.0.0.1:43918/page#target
Distance from the top of the viewport to #target once the scroll settles (expected 0):
  with JavaScript: 0px
    scrollTo({"behavior":"auto","left":0,"top":3000}) at scrollY 163
  without JavaScript: 0px
PASS: the page stops at #target
```
