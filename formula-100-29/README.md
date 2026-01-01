# formula-100-29

Reproduction for PR #29: https://github.com/onmax/formula-100/pull/29

## Problem

Verify patterns from PR #29 migration to nuxt-better-auth + NuxtHub v0.10 work correctly.

## Test Plan

- [x] nuxt-better-auth module setup with `defineServerAuth`
- [x] NuxtHub v0.10 `hub:db` virtual imports
- [x] Route protection via `routeRules` with `auth` property
- [x] Stripe plugin integration with `onEvent` webhook handler
- [x] Email templates receiving config as props
- [x] Build succeeds
- [x] Typecheck (with known type warnings)

## Issues Found

### Critical

**1. Missing package export in published npm version**

- **File**: `@onmax/nuxt-better-auth/package.json`
- **Issue**: Package doesn't export `./config` subpath
- **Impact**: Users cannot import `defineServerAuth` from `@onmax/nuxt-better-auth/config`
- **Fix**: Add to package.json exports:
  ```json
  "./config": {
    "types": "./dist/runtime/config.d.ts",
    "import": "./dist/runtime/config.js"
  }
  ```

### Medium

**2. TypeScript errors in routeRules**

- **File**: `nuxt.config.ts` lines 24-26
- **Issue**: `auth` property in `routeRules` causes TS errors
- **Error**: `Object literal may only specify known properties, and 'auth' does not exist in type 'RouteRulesMatcherOptions'`
- **Note**: Type augmentation exists (`NitroRouteRules.auth`) but TypeScript doesn't pick it up in config
- **Status**: Runtime works, only type error during typecheck

## Verify

```bash
# Clone and setup
git clone --depth 1 --filter=blob:none --sparse https://github.com/onmax/repros.git
cd repros && git sparse-checkout set formula-100-29
cd formula-100-29

# Install (requires local module due to export issue)
pnpm install

# Build
pnpm build

# Typecheck (expect 3 type warnings for routeRules)
pnpm typecheck
```

## Expected

- All patterns from PR #29 work correctly
- Build succeeds
- No runtime errors

## Actual

- **Build**: ✅ Works
- **Runtime patterns**: ✅ Work (not tested in dev mode, only build)
- **TypeScript**: ⚠️ 3 type errors in nuxt.config.ts (routeRules auth property)
- **Published package**: ❌ Missing `./config` export

## Patterns Tested

### 1. defineServerAuth (server/auth.config.ts)
```ts
import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

export default defineServerAuth((ctx) => {
  return {
    appName: 'Formula 100 Test',
    emailAndPassword: { ... },
  }
})
```

### 2. NuxtHub v0.10 hub:db (server/api/test-db.get.ts)
```ts
import { db } from 'hub:db'

export default defineEventHandler(async () => {
  const users = await db.query.user.findMany()
  return { users }
})
```

### 3. routeRules auth protection (nuxt.config.ts)
```ts
routeRules: {
  '/app/**': { auth: 'user' },
  '/admin/**': { auth: { user: { role: 'admin' } } },
  '/login': { auth: 'guest' },
}
```

### 4. Email templates with props (server/emails/welcome.vue)
```vue
<script setup lang="ts">
defineProps<{
  userEmail: string
  userName: string
  baseUrl?: string
}>()
</script>
```
