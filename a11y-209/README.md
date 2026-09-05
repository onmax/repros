# a11y-209

Issue: https://github.com/nuxt/a11y/issues/209

## Problem

No way to generate a11y report file during build/generate for CI pipelines.

## Verify

```bash
pnpm i && pnpm generate
```

## Expected

Build generates `.nuxt/a11y-report.md` with accessibility violations.

## Actual

No report generated - the `report` config option doesn't exist yet.
