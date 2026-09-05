export default defineNuxtConfig({
  modules: ['@nuxthub/core'],
  hub: {
    db: {
      dialect: 'postgresql',
      driver: 'postgres-js',
      connection: {
        url: 'postgresql://localhost:5432/test',
        prepare: false,
      },
    },
  },
})
