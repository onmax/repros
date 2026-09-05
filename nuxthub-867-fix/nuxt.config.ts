export default defineNuxtConfig({
  compatibilityDate: '2026-03-13',
  modules: ['@nuxthub/core'],
  nitro: {
    preset: 'cloudflare-module'
  },
  hub: {
    db: {
      dialect: 'postgresql',
      connection: {
        hyperdriveId: process.env.HYPERDRIVE_ID
      },
      applyMigrationsDuringBuild: true
    }
  }
})
