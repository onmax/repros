# Issue #41 - Missing Type Augmentation for plugin fields

## Problem
When using plugins like `organization()`, the session object contains fields like `activeOrganizationId` at runtime, but TypeScript doesn't know about them.

## Verify Bug
```bash
pnpm i && BETTER_AUTH_SECRET=test123test123test123test123test123 npx nuxi prepare && pnpm typecheck
```

Expected: Type error `Property 'activeOrganizationId' does not exist on type 'AuthSession'`

## Root Cause
In `nuxt-better-auth-infer.d.ts`, the AuthSession interface was incorrectly defined as:
```ts
interface AuthSession { session: InferSession<_Config>['session'], user: ... }
```

`InferSession<_Config>` IS the session object - it doesn't have a `['session']` property. This results in `unknown`.

## Fix
```ts
interface AuthSession extends InferSession<_Config> {}
```
