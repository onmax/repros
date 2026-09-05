# Fixed Reproduction for nuxt/nuxt#30291

This version includes a patch to fix the `await navigateTo` + layout change + `useHead` bug.

## Fix
Added `onBeforeUnmount(done)` to `NuxtPage` setup to ensure `deferHydration` done callback fires even when layout change causes unmount before Suspense resolves.

## Steps
1. `pnpm install && pnpm dev`
2. Click "Go to Target"
3. Check `document.title` - now correctly shows "Target"
