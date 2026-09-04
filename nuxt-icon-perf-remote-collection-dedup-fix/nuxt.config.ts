export default defineNuxtConfig({
  compatibilityDate: '2026-09-04',
  modules: ['@nuxt/icon'],
  devtools: { enabled: false },
  icon: {
    provider: 'server',
    fallbackToApi: false,
    clientBundle: { scan: false },
    serverBundle: {
      collections: [
        { prefix: 'test', fetchEndpoint: process.env.REPRO_COLLECTION_URL! },
        { prefix: 'retry', fetchEndpoint: process.env.REPRO_RETRY_URL! },
        { prefix: 'nullable', fetchEndpoint: process.env.REPRO_NULL_URL! },
      ],
    },
  },
})
