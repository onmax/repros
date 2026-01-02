export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  compatibilityDate: '2025-01-01',
  nitro: { preset: 'cloudflare_module' },
  runtimeConfig: { betterAuthSecret: 'dev-secret-change-in-production-32+' },
})
