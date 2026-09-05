# nuxt-34162-fix

Fix for https://github.com/nuxt/nuxt/issues/34162

## Problem
Prerender fails with 500 when route contains unicode (e.g. `联想.vue`). Works in 4.2.2, broken in 4.3.0.

## Root Cause
When prerendering, `ssrContext.url` contains decoded unicode (e.g. `/联想`). This value is used in an HTTP header (`x-nitro-prerender`) which requires ASCII. Unicode characters cause:
```
TypeError: Cannot convert argument to a ByteString because the character at index 1 has a value of 32852 which is greater than 255.
```

## Fix
Add `encodeURI()` when setting the `x-nitro-prerender` header in `packages/nitro-server/src/runtime/handlers/renderer.ts:175`.

```diff
- appendResponseHeader(event, 'x-nitro-prerender', joinURL(ssrContext.url.replace(/\?.*$/, ''), PAYLOAD_FILENAME))
+ appendResponseHeader(event, 'x-nitro-prerender', encodeURI(joinURL(ssrContext.url.replace(/\?.*$/, ''), PAYLOAD_FILENAME)))
```

## Verify
```bash
pnpm i && pnpm generate
```

Should prerender `/联想` successfully.
