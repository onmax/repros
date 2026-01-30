export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  hub: {
    blob: {
      driver: 'fs',
      dir: '.data/blob'
    }
  }
})
