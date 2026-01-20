export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  modules: ['@nuxthub/core'],
  hub: {
    db: {
      dialect: 'postgresql',
      driver: 'postgres-js',
      applyMigrationsDuringBuild: false
    }
  }
})
