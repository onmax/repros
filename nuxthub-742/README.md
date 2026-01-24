# nuxthub-742

Issue: https://github.com/nuxt-hub/core/issues/741

## Problem

`hub.remote: true` mode has several issues:
1. D1 driver not selected (only checks `cloudflare` hosting, not remote mode)
2. `__env__` race condition - accessing bindings before ready gives `undefined`
3. No warning when connecting to remote Cloudflare bindings

## Verify

```bash
pnpm i && pnpm dev
```

## Expected

- Warning about remote mode
- Helpful error if bindings accessed before ready
- D1 driver selected for sqlite in remote mode

## Actual (before fix)

- No warning
- Silent `undefined` when accessing `__env__.DB` before ready
- Falls back to libsql instead of d1

## See Also

- `../nuxthub-742-fixed` - Same repro with pnpm patch
