export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/image', '@nuxthub/core'],
  hub: { blob: true },
  nitro: { preset: 'cloudflare-pages' },
  compatibilityDate: '2025-01-09',
})
