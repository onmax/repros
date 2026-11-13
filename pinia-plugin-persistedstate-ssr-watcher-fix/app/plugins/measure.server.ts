import { stores } from '../stores/settings'

const g = globalThis as any
g.__apps ??= { created: 0, collected: 0 }
const registry: FinalizationRegistry<null> = g.__registry ??= new FinalizationRegistry(() => {
  g.__apps.collected++
})

export default defineNuxtPlugin((nuxtApp) => {
  g.__apps.created++
  registry.register(nuxtApp, null)

  // Use the store outside component setup, like a plugin or route middleware does.
  const variant = useRuntimeConfig().variant as keyof typeof stores
  const store = stores[variant]()

  // `?status=x` changes state during SSR, which the cookie storage should persist.
  const status = useRequestURL().searchParams.get('status')
  if (status && variant.startsWith('fresh'))
    store.filters.status = status
})
