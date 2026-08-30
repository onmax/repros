import { useNitroApp } from 'nitro/app'
import { defineEventHandler } from 'nitro/h3'

export default defineEventHandler(() => ({
  globalDollarFetch: typeof globalThis.$fetch,
  nitroLocalFetch: typeof useNitroApp().localFetch,
}))
