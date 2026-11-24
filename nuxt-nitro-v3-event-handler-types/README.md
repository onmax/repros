# Compat `defineEventHandler` erases handler return types on Nitro 3

With Nuxt 4.7.0 and `nitro` 3 installed, Nuxt serves the app through `@nuxt/nitro-v3-server`. Server routes auto-import `defineEventHandler` from its h3 v1 compatibility runtime, `dist/runtime/compat/h3-v1`. That function is declared to return `any`, so typed `$fetch` and `useFetch` lose the handler's return type.

Source: `@nuxt/nitro-v3-server@4.7.0` patch in [quiverdk/portal#1673](https://github.com/quiverdk/portal/pull/1673). No upstream issue yet.

## Run

```sh
git clone --branch repro/nuxt-nitro-v3-event-handler-types https://github.com/onmax/repros.git
cd repros/nuxt-nitro-v3-event-handler-types
pnpm install
pnpm verify
```

`verify.mjs` runs `nuxt prepare`, then `vue-tsc --noEmit -p .nuxt/tsconfig.app.json`, and exits nonzero when the app does not typecheck.

## Expected

`server/api/report.get.ts` returns `{ count: 1, label: 'report' }`, so `$fetch('/api/report')` in `app/report-type.ts` is `{ count: number, label: string }`, and the `@ts-expect-error` on `report.missing` is used.

## Actual

```text
vue-tsc exit code: 2
app/report-type.ts(6,3): error TS2578: Unused '@ts-expect-error' directive.
expected: $fetch('/api/report') is { count: number, label: string }
actual:   any (the @ts-expect-error on report.missing is unused)
```

`.nuxt/types/server-imports.d.ts` points `defineEventHandler` at `@nuxt/nitro-v3-server/dist/runtime/compat/h3-v1`, which declares:

```ts
export declare function defineEventHandler(input: ((event: LegacyH3Event) => any) | LegacyHandlerObject): any;
```

`.nuxt/server-routes.d.ts` types each response as `ResponseBodyOf<typeof handler>`, which is `any` for an `any` handler.

## Environment

- `nuxt` 4.7.0, `nitro` 3.0.261103-rc, `@nuxt/nitro-v3-server` 4.7.0
- `typescript` 5.9.3, `vue-tsc` 3.3.14
- Node 24.21.0, pnpm 10.33.0

## Files

- `nitro` is a dependency because installing it is what selects `@nuxt/nitro-v3-server`.
- `app/report-type.ts` holds the type assertion. The `count` line checks the shape after the fix, and the `@ts-expect-error` line fails while the type is `any`.

The fixed control is `../nuxt-nitro-v3-event-handler-types-fix`.
