export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  hub: {
    db: true,
    blob: false,
    kv: false,
    cache: false,
    dir: '.data',
  },
  typescript: {
    strict: true,
  },
})
