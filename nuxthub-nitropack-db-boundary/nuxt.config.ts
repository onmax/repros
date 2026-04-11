export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxthub/core'],
  hub: {
    db: {
      dialect: 'postgresql',
      casing: 'snake_case',
    },
  },
})
