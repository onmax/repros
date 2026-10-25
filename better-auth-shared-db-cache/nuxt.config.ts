// NuxtHub Postgres through postgres-js, no Hyperdrive: the database is process-wide.
export default defineNuxtConfig({
  compatibilityDate: '2026-10-25',
  modules: ['@nuxthub/core', '@nuxtjs/better-auth'],
  hub: {
    db: { dialect: 'postgresql', driver: 'postgres-js', applyMigrationsDuringBuild: false },
  },
})
