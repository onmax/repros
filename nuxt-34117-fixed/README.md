# nuxt-34117-fixed

Issue: https://github.com/nuxt/nuxt/issues/34117

## Fix Applied
Patched nuxt to replace shallowRef property mutation with full object replacement

## Verify
```bash
pnpm i && pnpm dev
```
Click increment button - count now updates correctly
