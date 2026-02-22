# nuxt-34164-min

Minimal synthetic reproduction harness for [nuxt/nuxt#34164](https://github.com/nuxt/nuxt/issues/34164) and PR [nuxt/nuxt#34251](https://github.com/nuxt/nuxt/pull/34251).

This repro is focused on the real failure shape from discussion with Daniel: a Vite import-analysis resolution failure for `#build/route-rules.mjs`.

## Why this repro exists

The earlier repro only checked whether `.nuxt/route-rules.mjs` exists on disk.
That is not a valid signal by itself because `#build` entries can be virtual.

This harness verifies:

- lifecycle timing and virtual-template signals (`ready`, `app:templatesGenerated`, `vite:serverCreated`)
- parent `node_modules` contamination behavior
- a deterministic synthetic scenario that reproduces the exact `vite:import-analysis` error signature

## Run

```bash
cd /Users/maxi/repros/nuxt-34164-min
pnpm repro
```

Extra modes:

```bash
pnpm repro:baseline
pnpm repro:contaminated
pnpm repro:real
```

## Pass/fail contract

- `repro:baseline` must **not** contain the target import-analysis error.
- `repro:contaminated` must contain at least one scenario with:
  - `Pre-transform error: Failed to resolve import "#build/route-rules.mjs"`
  - `vite:import-analysis`
- `repro:real` runs only natural scenarios and exits non-zero when no natural reproduction is found yet.
- `repro` exits non-zero only when the above expectations fail.

## Scenario matrix

- Natural:
  - `s0-baseline`: clean minimal workspace.
  - `s1-parent-node-modules`: ancestor `node_modules` contamination (`vite@6.4.1`).
  - `s2-cache-dir`: `s1` + explicit Vite cache dir under ancestor path.
  - `s3-linked-package-natural`: `s2` + linked local package across workspace boundary.
- Synthetic:
  - `s9-linked-package-simulated`: deterministic resolver corruption simulation used when natural scenarios remain non-reproducible.

## Expected failing snippet

From `s9-linked-package-simulated`, logs include lines like:

```text
Pre-transform error: Failed to resolve import "#build/route-rules.mjs"
Plugin: vite:import-analysis
```

## Notes

- This is local-first and intentionally synthetic to be deterministic.
- It does not patch Nuxt core.
- Logs are written to `/Users/maxi/repros/nuxt-34164-min/.tmp/logs/`.
