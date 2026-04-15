export default defineNuxtConfig({
  modules: ["@nuxt/content"],
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ["/docs/test"],
    },
  },
});
