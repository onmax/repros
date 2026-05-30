# Better Auth runtime secret repro

This reproduces a dev-time failure where the app defines `runtimeConfig.sessionSecret`, but `@onmax/nuxt-better-auth` expects `runtimeConfig.betterAuthSecret`.

## Run

```bash
pnpm install
pnpm dev --port 3017
```

Then open [http://localhost:3017/app](http://localhost:3017/app).

## Expected result

The protected route fails in dev instead of redirecting to `/login`, because the module throws:

```txt
[nuxt-better-auth] Runtime auth secret is missing. Set NUXT_BETTER_AUTH_SECRET or BETTER_AUTH_SECRET on the deployed server.
```
