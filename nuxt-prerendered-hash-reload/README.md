# Nuxt: reloading a page with a hash jumps back to the hash

Written by an AI agent (Claude Code) for @onmax. No human has reviewed it yet.

Open a page at `#section`, scroll to y=1000, reload. The browser restores y=1000, then Nuxt scrolls to `#section` again and the position is lost. It happens on a server-rendered page and on a prerendered one, and the cause is different for each:

- **Server-rendered (`/ssr`)**: the first-load `scrollBehavior` call scrolls to the hash with `behavior: 'instant'`. nuxt/nuxt#36938 leaves that scroll to the browser.
- **Prerendered (`/prerendered`)**: the app hydrates on the prerendered path `/prerendered` and restores `/prerendered#section` afterwards with a second `router.replace`. That replace goes through the same-page hash branch of `scrollBehavior`, so it scrolls to the hash even with #36938 applied. See [`../nuxt-prerendered-hash-reload-pr36938`](../nuxt-prerendered-hash-reload-pr36938).

The two pages render the same `<Lines />` component. The only difference is `routeRules: { '/prerendered': { prerender: true } }`.

## Environment

- `nuxt-nightly` 5.0.0-2611161229-4959451 with `vue` 3.5.45 and `vue-router` 5.5.1
- Chromium 156.0.8078.4 (the headless shell that `playwright-core` 1.64.0 installs), 1280×720 viewport
- Node 24.21, Linux, pnpm 12

## Verify

```sh
git clone --branch repro/nuxt-prerendered-hash-reload https://github.com/onmax/repros
cd repros/nuxt-prerendered-hash-reload
pnpm install
pnpm verify
```

`verify.mjs` builds the app (which prerenders `/prerendered`), serves `.output` on port 43927 and, for each page, opens it at `#section`, waits for hydration, scrolls to y=1000 and reloads. After the reload settles it prints `scrollY` and every `window.scrollTo` call the page made, and exits 1 unless both pages stay at 1000.

```
Chromium 156.0.8078.4, http://127.0.0.1:43927
scrollY after scrolling to 1000 and reloading (expected 1000):
  /ssr#section: 3000
    scrollTo({"behavior":"instant","left":0,"top":3000}) at scrollY 1000
  /prerendered#section: 3000
    scrollTo({"left":0,"top":1000}) at scrollY 0
    scrollTo({"behavior":"auto","left":0,"top":3000}) at scrollY 1000
FAIL: a page did not keep its position after the reload
```

Expected: both pages at 1000. Actual: both at 3000, where `#section` is. The same result came back on three runs.

## Controls

| Fixture | Patch on the same nightly | `/ssr#section` | `/prerendered#section` |
|---|---|---|---|
| this one | none | 3000 | 3000 |
| [`-pr36938`](../nuxt-prerendered-hash-reload-pr36938) | nuxt/nuxt#36938 | 1000 | 3000 |
| [`-fix`](../nuxt-prerendered-hash-reload-fix) | #36938 and the prerendered restore change | 1000 | 1000 |

The app and `verify.mjs` are the same in all three; only the port differs.
