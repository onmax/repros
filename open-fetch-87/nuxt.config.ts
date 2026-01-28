export default defineNuxtConfig({
  modules: ['nuxt-open-fetch'],
  openFetch: {
    clients: {
      api: {
        schema: './types/large-schema.json',
      },
    },
  },
})
