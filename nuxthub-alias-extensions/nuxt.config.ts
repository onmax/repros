export default defineNuxtConfig({
  modules: ['@nuxthub/core', './modules/mjs-alias'],
  hub: { db: 'sqlite' },
})
