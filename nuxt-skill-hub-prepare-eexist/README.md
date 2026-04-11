# nuxt-skill-hub prepare EEXIST repro

## Steps

```bash
pnpm install
pnpm exec nuxt prepare
pnpm exec nuxt prepare
```

## Expected

The second `nuxt prepare` should be a no-op or replace the generated skill tree cleanly.

## Actual

The second `nuxt prepare` fails with `EEXIST` while copying generated files into `.codex/skills/nuxt-strata/...`.

This repro uses:

- package name `strata`
- module list `['@nuxt/ui', 'nuxt-skill-hub']`
