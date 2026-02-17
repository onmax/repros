import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup (_, nuxt) {
    nuxt.hook('app:templatesGenerated', () => {
      delete nuxt.vfs['#build/route-rules.mjs']
      delete nuxt.vfs[nuxt.options.buildDir + '/route-rules.mjs']
    })
  },
})
