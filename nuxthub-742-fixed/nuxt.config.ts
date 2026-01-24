export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  hub: {
    remote: true,
    db: { 
      dialect: 'sqlite',
      connection: { databaseId: '5dcc3bde-e6ab-4ef0-9adc-0d917d6d5a28' } // nuxthub-741-test
    },
  },
  compatibilityDate: '2025-01-01',
})
