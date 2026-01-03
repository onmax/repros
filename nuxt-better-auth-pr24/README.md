# Repro for PR #24

https://github.com/onmax/nuxt-better-auth/pull/24

## Issue

Before PR: `routeRules.auth` shows TS error:
> Object literal may only specify known properties, and 'auth' does not exist in type

## Current generated types (.nuxt/types/nuxt-better-auth-nitro.d.ts)

Only `NitroRouteRules` is augmented, not `NitroRouteConfig`:

```ts
declare module 'nitropack/types' {
  interface NitroRouteRules {
    auth?: import('...').AuthMeta
  }
}
```

## After PR #24

Adds `NitroRouteConfig` augmentation:

```ts
declare module 'nitropack/types' {
  interface NitroRouteRules {
    auth?: import('...').AuthMeta
  }
}
declare module 'nitropack' {
  interface NitroRouteConfig {
    auth?: import('...').AuthMeta
  }
}
export {}
```

## Suggestion from review

Also add `NitroRouteConfig` to `nitropack/types` for full consistency with Nuxt's patterns.
