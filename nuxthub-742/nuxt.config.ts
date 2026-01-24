export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  hub: {
    remote: true,
    db: { 
      dialect: 'sqlite',
      connection: { databaseId: 'test-db-id' }
    },
  },
  compatibilityDate: '2025-01-01',
})
