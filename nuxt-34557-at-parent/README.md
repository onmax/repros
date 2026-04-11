# Nuxt issue 34557 repros

This folder contains two local reproductions for [nuxt/nuxt#34557](https://github.com/nuxt/nuxt/issues/34557).

- `nuxt-4.4.2`: matches the reported setup.
- `nuxt-4.3.1`: same app on an earlier Nuxt release for regression comparison.
- `nuxt-4.4.2-fixed`: workaround variant that keeps the `/@admin` URL without using `@` in the page filename.

Both apps use the same page tree:

- `app/pages/admin.vue`
- `app/pages/admin/index.vue`
- `app/pages/@admin.vue`
- `app/pages/@admin/index.vue`

Expected behavior:

- `/admin` renders the parent page and the child page.
- `/@admin` should do the same.

Run locally:

```bash
cd /Users/maxi/repros/nuxt-34557-at-parent/nuxt-4.4.2
pnpm dev

cd /Users/maxi/repros/nuxt-34557-at-parent/nuxt-4.3.1
pnpm dev

cd /Users/maxi/repros/nuxt-34557-at-parent/nuxt-4.4.2-fixed
pnpm dev
```

What I observed locally on March 13, 2026:

- `nuxt-4.4.2` renders both `/admin` and `/@admin` correctly.
- `nuxt-4.4.2-fixed` is a workaround shape: `pages/admin.vue` overrides its route path to `/@admin`, so the URL stays the same without relying on `@admin.vue`.
- The StackBlitz issue payload uses `app/pages` and `app/layouts`; the local repro also mirrors the same content into root `pages`, `layouts`, and `app.vue` because that is what the local installs picked up reliably.
