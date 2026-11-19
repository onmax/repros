import { createResolver, defineNuxtModule, extendPages } from '@nuxt/kit'

export default defineNuxtModule({
  setup() {
    const { resolve } = createResolver(import.meta.url)
    extendPages((pages) => {
      pages.push({ name: 'module-admin', path: '/module-admin', file: resolve('./runtime/admin.vue') })
    })
  },
})
