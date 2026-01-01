export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  hub: { blob: { driver: 'vercel-blob' } }
})
