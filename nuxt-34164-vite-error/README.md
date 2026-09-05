# nuxt-34164-vite-error

Goal: minimal CLI reproduction for:

- `Pre-transform error: Failed to resolve import "#build/route-rules.mjs"` (Vite `vite:import-analysis`)

Notes:
- Targets Nuxt `4.3.0`.
- Nuxt cannot be removed from this repro because `#build/*` + template VFS are Nuxt mechanisms.

## Run

From repo root:

```bash
NUXT_TELEMETRY_DISABLED=1 pnpm i
NUXT_TELEMETRY_DISABLED=1 pnpm --filter web prepare
NUXT_TELEMETRY_DISABLED=1 pnpm --filter web dev
```

This repro prints diagnostic lines prefixed with `[repro]`:
- whether `route-rules.mjs` is present in the template list
- whether `#build/route-rules.mjs` exists in `nuxt.vfs` at `ready`, after templates generation, and when Vite server is created

If you reproduce the Vite error, paste the full output including `[repro]` lines.

## Variations

- Toggle nitro preset in `apps/web/nuxt.config.ts` (`cloudflare_module` vs `node-server`).
