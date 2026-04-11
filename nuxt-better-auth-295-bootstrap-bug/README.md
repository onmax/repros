# nuxt-better-auth-295-bootstrap-bug

Minimal repro for the broken pre-fix `@onmax/nuxt-better-auth` NuxtHub integration.

## Verify
```bash
cp .env.example .env
pnpm install
pnpm dev
# use the printed local URL from nuxt dev
curl http://localhost:<printed-port>/api/_better-auth/config
```

## Expected
`/api/_better-auth/config` returns JSON.

## Actual
`/api/_better-auth/config` returns `500`:

```txt
Cannot find package 'nitropack' imported from .nuxt/better-auth/database.mjs
```
