import { defineNuxtModule } from 'nuxt/kit'

// `generateApp` has compiled every template by `build:before`; Vite and Nitro haven't started.
// Print how many templates there were, then stop the build.
export default defineNuxtModule({
  setup (_, nuxt) {
    let templates = 0
    nuxt.hook('app:templatesGenerated', (app) => { templates = app.templates.length })
    nuxt.hook('build:before', () => {
      console.log(`repro: stopped at build:before after ${templates} templates`)
      process.exit(0)
    })
  },
})
