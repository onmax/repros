import type { RuntimeConfig } from 'nuxt/schema'
import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

export default defineServerAuth((ctx) => {
  // BUG: This line fails with:
  // "Type 'Record<string, unknown>' is missing properties from 'RuntimeConfig': app, public, hub..."
  const _rc: RuntimeConfig = ctx.runtimeConfig

  return { appName: 'Test' }
})
