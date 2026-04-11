# nuxt-app-manifest-min

Focused minimal repro for `#app-manifest` import-analysis behavior on Nuxt 4 (`4.3.0`).

## Run

```bash
cd /Users/maxi/repros/nuxt-app-manifest-min
pnpm install
pnpm dev
```

## Cold-start race check

```bash
cd /Users/maxi/repros/nuxt-app-manifest-min
pnpm repro:cold
```

This does repeated cold starts (`.nuxt` removed before each run), requests `/`, and reports:

- `Failed to resolve import "#app-manifest"`
- `Failed to resolve import "#build/route-rules.mjs"`
- `Plugin: vite:import-analysis`

Outputs:

- per-run logs in `logs/`
- aggregate summary in `logs/summary.json`
