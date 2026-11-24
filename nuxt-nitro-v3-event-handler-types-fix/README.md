# Fixed control: compat `defineEventHandler` keeps handler return types

Same app and verifier as `../nuxt-nitro-v3-event-handler-types`, plus a `pnpm patch` against `@nuxt/nitro-v3-server@4.7.0` that makes compat `defineEventHandler` generic over the handler's return value and return h3's `EventHandler<EventHandlerRequest, Response>`.

```sh
git clone --branch repro/nuxt-nitro-v3-event-handler-types https://github.com/onmax/repros.git
cd repros/nuxt-nitro-v3-event-handler-types-fix
pnpm install
pnpm verify
```

Expected and observed:

```text
vue-tsc exit code: 0
expected: $fetch('/api/report') is { count: number, label: string }
actual:   { count: number, label: string }
PASS
```
