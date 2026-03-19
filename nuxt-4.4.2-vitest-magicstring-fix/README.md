# nuxt-4.4.2-vitest-magicstring-fix

Related bug repro: [onmax/nuxt-4.4.2-vitest-magicstring](https://github.com/onmax/nuxt-4.4.2-vitest-magicstring)

## Problem

`nuxt@4.4.2` fails when a production build is invoked inside a Vitest process, even in a plain app fixture and even when the test calls `@nuxt/kit` directly with:

- `loadNuxt(...)`
- `buildNuxt(...)`

A normal `nuxi build test/fixture` succeeds. The failure is specific to the in-process Vitest build path.

## Verify

```bash
pnpm i && pnpm test
```

## Expected

The Vitest test should build the plain fixture successfully on `nuxt@4.4.2`.

## Actual (before fix)

The test fails with:

```txt
TypeError: [vite:vue] MagicString is not a constructor
file: .../nuxt/dist/app/components/nuxt-root.vue
```

## Fix

This repro applies a local [`pnpm patch`](https://pnpm.io/cli/patch) to `nuxt@4.4.2`.

The patch makes Nuxt detect production builds started from a Vitest process and delegate that build to a clean `nuxi build <rootDir>` subprocess. That keeps the same minimal repro while avoiding the in-process Vite and Vitest interaction that triggers the `MagicString` crash.

This is a targeted workaround repro, not a claim that the final upstream fix must use this exact implementation.
