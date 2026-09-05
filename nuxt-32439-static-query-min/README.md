# nuxt-32439 static query repro

Minimal reproduction for a prerendered static hydration issue with query-based rendering.

## Setup

```bash
pnpm install
```

## Reproduce in dev (works)

```bash
pnpm dev --port 3000
```

Open:

`http://localhost:3000/?preview=true`

Expected in dev:

- `query preview: true`
- blue bar turns red

## Reproduce in prerendered static preview (fails)

Stop dev server, then run:

```bash
pnpm generate
pnpm preview --port 3000
```

Open:

`http://localhost:3000/?preview=true`

Actual in static preview:

- `query preview: true`
- bar stays blue (should be red)

## Notes

- If port `3000` is busy, use another port in both commands and URL.
