export default defineNuxtConfig({
  // `optional-module` is on disk (another package depends on it), but the app does not use it
  modules: ['dependent-module'],
})
