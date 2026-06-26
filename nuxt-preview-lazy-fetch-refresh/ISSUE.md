# Preview mode refreshes a still-mounted `useLazyFetch` after navigating to a child route

## Environment

- Nuxt: 4.4.8
- Vue: 3.5.38
- Node: v26.4.0
- pnpm: 11.7.0
- OS: Darwin arm64

`pnpm exec nuxi info` did not print package versions in this minimal repro.

## Reproduction

https://github.com/onmax/repros/tree/main/nuxt-preview-lazy-fetch-refresh

Local steps:

```bash
cd ~/repros/nuxt-preview-lazy-fetch-refresh
pnpm install
pnpm dev
```

Open <http://127.0.0.1:3000/report>, then click **Leave visible page**.

To compare with preview mode disabled:

```bash
PREVIEW_MODE=off pnpm dev
```

## Describe the bug

`useLazyFetch` is used on a parent route with a computed POST body. Preview mode is enabled globally. When navigating from `/report` to `/report/child`, the child route is visible but the parent fetch owner is still mounted behind it.

At that point Nuxt preview mode's route refresh causes the still-registered parent `useLazyFetch` to POST again, even though the user has left the visible parent page.

This is painful in preview/content-review flows because leaving a page can trigger background POST requests from UI that is no longer visible. Those requests can be expensive, can duplicate server work, and are hard to trace because the visible route no longer appears to own the request.

This seems to be an interaction of intended primitives rather than one obviously broken primitive:

- `useLazyFetch` still follows `useFetch` semantics; `lazy` controls navigation blocking, not refresh participation.
- Preview mode refreshes async data after navigation.
- `refreshNuxtData()` refreshes registered async data, not only visibly active route data.
- The parent route is hidden but still mounted, so its async data is still registered.

The surprising part is the combined DX: navigating away from the visible parent route can still trigger a parent-owned POST in the background.

## Additional context

Similar open issues:

- https://github.com/nuxt/nuxt/issues/26165 is the closest related report. It covers `refreshNuxtData()` not refetching data once `useAsyncData`/`useFetch` is out of scope. This repro hits the inverse edge: the parent fetch is still mounted/registered, so preview navigation refreshes it even after the parent route is no longer visible.
- https://github.com/nuxt/nuxt/issues/15423 is a related navigation/refetch DX discussion for `useFetch`/`useLazyFetch`.

Relevant history from the Nuxt repo:

- `useLazyFetch` was introduced as a thin alias for `useFetch(..., { lazy: true })` in `f011a60d` / #1861.
- Reactive `useFetch` options became watched by default in `69a6a86d` / #8374.
- `watch: false` was later added as the opt-out for reactive `useFetch` watching in `ee8d3f6` / #19823.
- `refreshNuxtData()` was introduced as a global async-data refresh hook in `8dd77d7` / #3929.
- `usePreviewMode()` calls `refreshNuxtData()` on enable and after route navigation while enabled, from `98aa2c2` / #21705.

So this looks like an interaction between existing behaviors rather than one isolated `useLazyFetch` issue.

## Logs

Preview mode on:

```shell
[report] #1 {"criteria":["initial-criterion"]}
[report] #2 {"criteria":["mount-emit-1"]}
[report] #3 {"criteria":["mount-emit-1"]}
[report] #4 {"criteria":["mount-emit-1"]}
[report] #5 {"criteria":["mount-emit-2"]}
# click "Leave visible page"
[report] #6 {"criteria":["mount-emit-2"]}
```

Preview mode off:

```shell
[report] #1 {"criteria":["initial-criterion"]}
[report] #2 {"criteria":["mount-emit-1"]}
[report] #3 {"criteria":["mount-emit-2"]}
# click "Leave visible page"
# no extra request
```
