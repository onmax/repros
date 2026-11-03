# vue-router: `useScrollRestoration()` outside the `<RouterView>` restores before the page renders

The app shell's `<main>` scrolls, and `App.vue` calls `useScrollRestoration()` once around the `<RouterView>`. Back and reload should bring `<main>` back to 2000. Both land at 0.

Outside a `<RouterView>`, `onRouteRendered` runs in `router.afterEach()`, so the restore runs while the old page is still on screen and clamps to its height. On the first load it isn't called at all.

```sh
git clone --branch repro/vue-router-scroll-restoration-shell https://github.com/onmax/repros.git
cd repros/vue-router-scroll-restoration-shell
pnpm install && pnpm verify
```

Expected: both tests pass. Actual:

```
✘ Back restores <main>    Expected: 2000  Received: 0
✘ reload restores <main>  Expected: 2000  Received: 0
```

[`../vue-router-scroll-restoration-shell-fix`](../vue-router-scroll-restoration-shell-fix) is the control: the same app with the call moved into each page. Both tests pass there.

The detail page is shorter than the list's saved position on purpose. That's where restoring on the old page shows: a position the old page can't reach is clamped.

vue-router 5.4.0, vue 3.5.44, vite 8.3.5, Chromium (Playwright 1.64.1), production build served by `vite preview`.
