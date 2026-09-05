export default defineNuxtConfig({
  modules: ['@nuxthub/core', '@onmax/nuxt-better-auth'],
  hub: {
    db: {
      dialect: 'sqlite',
      casing: 'snake_case'
    }
  },
  betterAuth: {
    usePlural: true
  },
  compatibilityDate: '2025-01-01'
})
