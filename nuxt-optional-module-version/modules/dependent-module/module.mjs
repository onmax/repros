import { defineNuxtModule } from '@nuxt/kit'
// works with optional-module 2+, when the app uses it
export default defineNuxtModule({
  meta: { name: 'dependent-module' },
  moduleDependencies: { 'optional-module': { version: '>=2', optional: true } },
  setup () {},
})
