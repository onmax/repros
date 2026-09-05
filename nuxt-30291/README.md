# Reproduction for nuxt/nuxt#30291

`await navigateTo` to a page with different layout breaks `useHead` title update.

## Steps
1. `pnpm install && pnpm dev`
2. Click "Go to Target"
3. Check `document.title` - stays "Home" instead of "Target"

## Expected
`document.title` should be "Target"

## Cause
`NuxtPage.deferHydration()` done callback never fires when layout changes unmount old NuxtPage before Suspense resolves.
