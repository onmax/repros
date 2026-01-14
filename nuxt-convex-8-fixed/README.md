# nuxt-convex-8-fixed

Issue: https://github.com/onmax/nuxt-convex/issues/8

## Problem
Published npm package contains `catalog:prod` references instead of resolved versions.

## Fix
Replace `catalog:prod` with actual versions in package.json dependencies:
- `@nuxt/kit`: `^4.2.2`
- `consola`: `^3.4.2`
- `defu`: `^6.1.4`
- `pathe`: `^2.0.3`

**Root cause fix**: In `.github/workflows/release.yml`, change `npm publish` to `pnpm publish`. pnpm resolves catalog references on publish.

## Verify
```bash
pnpm i
```

## Expected
Dependencies install successfully.

## Actual
✅ Works
