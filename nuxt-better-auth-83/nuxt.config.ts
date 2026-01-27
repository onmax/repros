export default defineNuxtConfig({
  modules: ['@nuxthub/core', '@onmax/nuxt-better-auth'],
  hub: { db: { dialect: 'sqlite', driver: 'd1' } },
  nitro: { preset: 'cloudflare-module' },
  compatibilityDate: '2025-01-01',
})
