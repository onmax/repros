import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['nuxt-open-fetch'],
  compatibilityDate: '2025-07-15',
  openFetch: {
    clients: {
      testApi: {
        schema: './types/test-openapi.json',
        baseURL: 'https://example.com',
      },
    },
  },
})
