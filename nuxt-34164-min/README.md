# nuxt-34164-min

Bare minimum realistic repro attempt for [nuxt/nuxt#34164](https://github.com/nuxt/nuxt/issues/34164) / [nuxt/nuxt#34251](https://github.com/nuxt/nuxt/pull/34251).

This repo keeps only:

- pnpm workspace (`apps/web`)
- Nuxt `4.3.0`
- `routeRules` using `swr` / `isr`
- `nitro.preset = 'cloudflare_module'`
- parent `node_modules` containing `vite@6.4.1` (root devDependency) to mimic contamination reports

## Run

```bash
cd /Users/maxi/repros/nuxt-34164-min
pnpm i
pnpm prepare
pnpm dev
```

## Expected on affected environments

You may see Vite import-analysis errors like:

```text
Pre-transform error: Failed to resolve import "#build/route-rules.mjs"
Plugin: vite:import-analysis
```

## Notes

- This is intentionally realistic and manual (no synthetic plugin/error injection).
- If it does not fail on your machine, that is still useful: it confirms environment sensitivity.
