import { addServerHandler, createResolver, defineNuxtModule } from 'nuxt/kit'

// A module written for Nitro 2: its handler imports `h3` and `nitropack/runtime`,
// which nuxt:nitro-v2-compat redirects to its shims.
export default defineNuxtModule({
  meta: { name: 'legacy' },
  setup () {
    const { resolve } = createResolver(import.meta.url)
    addServerHandler({ route: '/api/legacy', handler: resolve('./runtime/legacy') })
  },
})
