export default defineNuxtConfig({
  modules: ['nitro-cloudflare-dev', '@nuxthub/core'],
  hub: {
    db: { dialect: 'sqlite', driver: 'd1', connection: { databaseId: 'test-db-id' } },
  },
  compatibilityDate: '2025-01-01',
})
