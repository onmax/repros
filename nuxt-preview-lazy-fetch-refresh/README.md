# Nuxt preview mode + useLazyFetch refresh repro

Minimal repro for a Nuxt preview mode refresh issue with `useLazyFetch`.

## Run

```bash
pnpm install
pnpm dev
```

Open <http://127.0.0.1:3000/report>.

For a custom port:

```bash
pnpm exec nuxt dev --host 127.0.0.1 --port 3315
```

## What to watch

The app logs every `/api/report` request in the browser console and in the dev server terminal.

1. Initial page load starts the lazy fetch.
2. `NoisyControls` emits two criteria updates on mount. Because the computed `body` is watched by default, `useLazyFetch` refetches.
3. Click `Leave visible page`. The child route renders while the parent fetch owner stays mounted behind it. With preview mode enabled, Nuxt's preview composable registers `router.afterEach(() => refreshNuxtData())`, so entering the child route refreshes the still-registered async data and triggers another POST.

To prove the exit request is preview mode:

```bash
PREVIEW_MODE=off pnpm dev
```

The leave-page POST disappears. The criteria-emitted POSTs remain because they are caused by the watched computed fetch body.
