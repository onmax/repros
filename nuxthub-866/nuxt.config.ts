import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  hub: {
    db: {
      dialect: 'sqlite',
      applyMigrationsDuringBuild: false
    }
  }
})
