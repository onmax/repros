# nuxt-ui-5847-fixed

Issue: https://github.com/nuxt/ui/issues/5847

## Problem
TypeScript error when using `slots` in `app.config.ts` for components with flat `base:` theme structure.

## Fix
Demonstrates expected behavior after normalizing @nuxt/ui theme files:
- Convert 39 theme files from `{ base: '...' }` to `{ slots: { base: '...' } }`
- Update 14+ components to use `ui.base()` instead of `ui()`
- Add normalization util for backward compatibility

## Verify
```bash
pnpm i && pnpm typecheck
```

## Expected
✅ TypeScript passes - all components accept `slots` property consistently.

## Note
This fix requires source changes to @nuxt/ui (not patchable in dist).
See PR for full implementation.
