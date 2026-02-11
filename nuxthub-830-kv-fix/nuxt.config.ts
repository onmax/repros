export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  hub: {
    kv: true,
    blob: false,
    db: false,
    cache: false,
    dir: '.data',
  },
  typescript: {
    strict: true,
  },
})
