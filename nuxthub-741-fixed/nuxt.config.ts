export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  hub: {
    db: { dialect: 'sqlite', driver: 'd1' },
  },
  compatibilityDate: '2025-01-01',
})
