export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  hub: {
    // Only blob is enabled to keep this repro minimal.
    blob: true,
    kv: false,
    db: false,
    cache: false,
    dir: '.data',
  },
  typescript: {
    strict: true,
  },
})
