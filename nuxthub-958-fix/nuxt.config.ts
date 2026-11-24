export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  nitroLegacy: false,
  hub: {
    db: 'sqlite'
  },
  compatibilityDate: '2026-11-01'
})
