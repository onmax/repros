export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxthub/core'],
  nitro: { preset: 'cloudflare_module' },
  hub: { blob: true }
})
