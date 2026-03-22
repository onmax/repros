// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxthub/core', '@onmax/nuxt-better-auth'],
  hub: { db: 'sqlite' },
  auth: {
    schema: {
      // @ts-expect-error casing should be 'camelCase' | 'snake_case' but is any
      casing: 123,
    },
  },
})
