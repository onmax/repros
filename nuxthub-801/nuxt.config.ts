export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  hub: {
    db: 'sqlite'
  },
  devtools: { enabled: false }
})
