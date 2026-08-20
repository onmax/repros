export default defineNuxtConfig({
  modules: ['@nuxthub/core', '@nuxtjs/better-auth'],
  hub: {
    db: {
      dialect: 'sqlite',
      useRelationsV2: true,
    },
  },
})
