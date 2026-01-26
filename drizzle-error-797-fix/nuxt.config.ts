export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxthub/core'],
  hub: {
    db: 'sqlite'
  },
  typescript: {
    typeCheck: 'build'
  }
})