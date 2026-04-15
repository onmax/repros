# h3 Nuxt Content prerender header fix

This folder applies a `pnpm patch` against `@nuxt/content@3.13.0` to tolerate mixed event shapes during Nuxt Content prerender.

## Reproduce

```bash
pnpm install
pnpm repro:headers    # direct h3 call → "event.req.headers.entries is not a function"
pnpm build            # patched build succeeds
```

## Patch

- Patch file: [patches/@nuxt__content@3.13.0.patch](patches/@nuxt__content@3.13.0.patch)
- `package.json` uses `pnpm.patchedDependencies` so the patch is applied automatically on install.
- The patch adds compat helpers in `@nuxt/content` for:
  - request headers from `Headers` or plain objects
  - response header writes across web and node-style events
  - request body reads across `Request`, node streams, and Nitro prerender mocks
