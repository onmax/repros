import { addComponentsDir, createResolver, defineNuxtModule } from '@nuxt/kit'

// Stands in for a published module that ships components using Nuxt UI.
export default defineNuxtModule({
  meta: { name: 'card-kit' },
  setup() {
    const { resolve } = createResolver(import.meta.url)
    addComponentsDir({ path: resolve('./runtime/components'), prefix: 'CardKit' })
  },
})
