export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
  devtools: { enabled: false },
  // Lets the persist watcher reach `useCookie` during SSR, so verify.mjs can check the cookie write.
  experimental: { asyncContext: true },
  runtimeConfig: {
    // fresh-persist | shared-persist | fresh-plain | shared-plain, set with NUXT_VARIANT
    variant: 'fresh-persist',
  },
})
