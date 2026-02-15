export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxthub/core'],
  hub: {
    db: {
      dialect: 'sqlite',
      driver: 'libsql',
      connection: {
        url: process.env.MY_DB_URL || 'libsql://my-db.turso.io',
        authToken: process.env.MY_DB_TOKEN || 'fake-token',
      },
    },
  },
})
