# a11y-209-fixed

Issue: https://github.com/nuxt/a11y/issues/209

## Problem

No way to generate a11y report file during build/generate for CI pipelines or AI agent integration.

## Verify

```bash
pnpm i && pnpm generate
```

## Expected

- Build generates `.nuxt/a11y-report.md` with accessibility violations
- Build exits with code 1 due to violations found

## Actual (before fix)

No report generated, no CI integration.

## Fix

Adds `render:html` hook integration during prerender that:
1. Runs axe-core server-side via jsdom on each route
2. Generates markdown report after all routes scanned
3. Exits non-zero when violations found

The `-fixed` folder uses [pnpm patch](https://pnpm.io/cli/patch) to apply the fix locally.
