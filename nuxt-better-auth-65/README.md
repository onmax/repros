# nuxt-better-auth-65

PR: https://github.com/onmax/nuxt-better-auth/pull/65

## Problem
When `schema.usePlural` or `schema.casing` is enabled, the generated drizzle schema uses plural/camelCase names but drizzleAdapter doesn't receive these options, causing "model not found" errors.

## Verify

```bash
pnpm i && pnpm build
```

Check `.nuxt/better-auth/database.mjs` - should contain:
```js
drizzleAdapter(db, { provider: dialect, schema, usePlural: true, camelCase: true })
```

## Expected
Build succeeds, generated database.mjs passes both usePlural and camelCase options.

## Actual (before fix)
Only usePlural was passed (partially). camelCase was never passed.
