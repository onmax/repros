# nuxt-32439

Issue: https://github.com/nuxt/nuxt/issues/32439

## Setup

```bash
pnpm i
```

## Reproduce in dev (works)

```bash
cd apps/web
pnpm dev --port 3000
```

Open `http://localhost:3000/?preview=true`.

Expected in dev:

- `query preview: true`
- bar is red

## Reproduce in prerendered static preview (fails)

Stop dev server, then run:

```bash
cd apps/web
pnpm generate
pnpm preview --port 3000
```

Open `http://localhost:3000/?preview=true`.

Actual in static preview:

- `query preview: true`
- bar stays blue (should be red)

## Why this seems to happen

- static HTML is generated for `/` (no query), so initial render is the false branch (blue)
- after hydration, route query does become `preview=true`
- but the visual binding does not update in this prerendered static path
