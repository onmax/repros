# nuxt-34164-min

Minimal local repro harness for [nuxt/nuxt#34164](https://github.com/nuxt/nuxt/issues/34164) and PR [nuxt/nuxt#34251](https://github.com/nuxt/nuxt/pull/34251).

It keeps only essential checks:

- one baseline run
- one natural contamination probe
- one deterministic canonical failure path

## Run

```bash
cd /Users/maxi/repros/nuxt-34164-min
pnpm repro
```

Extra modes:

```bash
pnpm repro:baseline
pnpm repro:contaminated
```

## Pass/fail

- `repro:baseline` must not include the target error.
- `repro:contaminated` must include at least one scenario with:
  - `Pre-transform error: Failed to resolve import "#build/route-rules.mjs"`
  - `vite:import-analysis`
- `repro` exits non-zero if expectations fail.

## Scenario set

- `s0-baseline` (`natural`): clean workspace.
- `s1-parent-node-modules` (`natural`): parent `node_modules` contamination with `vite@6.4.1`.
- `s9-simulated` (`synthetic`): deterministic resolver-failure simulation used when natural scenario does not reproduce.

## Notes

- This intentionally avoids using `.nuxt/route-rules.mjs` disk presence as a bug signal.
- Diagnostics are logged at `ready`, `app:templatesGenerated`, and `vite:serverCreated`.
- Run logs are written to `/Users/maxi/repros/nuxt-34164-min/.tmp/logs/`.
