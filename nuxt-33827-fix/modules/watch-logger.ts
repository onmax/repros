import { defineNuxtModule, useNuxt } from '@nuxt/kit'

export default defineNuxtModule({
  meta: { name: 'watch-logger' },
  setup() {
    const nuxt = useNuxt()
    nuxt.hook('builder:watch', (event, path) => {
      console.log(`[builder:watch] ${event}: ${path}`)
    })
  },
})
