# nuxt-ui-5847

Issue: https://github.com/nuxt/ui/issues/5847

## Problem
TypeScript error when using `slots` in `app.config.ts` for components with flat `base:` theme structure (Container, Skeleton, Form, etc.)

## Verify
```bash
pnpm i && pnpm typecheck
```

## Expected
TypeScript should accept `slots` property for all components consistently.

## Actual
```
app.config.ts:11:5 - error TS2353: Object literal may only specify known properties, and 'slots' does not exist in type 'Container'.
app.config.ts:12:5 - error TS2353: Object literal may only specify known properties, and 'slots' does not exist in type 'Skeleton'.
app.config.ts:13:5 - error TS2353: Object literal may only specify known properties, and 'slots' does not exist in type 'Form'.
```

Components like `card` and `button` work fine because they use `slots:` structure in their theme files.
