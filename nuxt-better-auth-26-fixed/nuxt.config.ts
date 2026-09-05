export default defineNuxtConfig({
  modules: ['@nuxthub/core', '@onmax/nuxt-better-auth'],
  hub: { db: { dialect: 'sqlite' } },
  compatibilityDate: '2025-01-01',
})
