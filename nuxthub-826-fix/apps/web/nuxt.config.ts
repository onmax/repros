export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  hub: {
    db: {
      dialect: 'sqlite',
      driver: 'd1',
    },
  },
})
