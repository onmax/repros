import { defineServerAuth } from '@nuxtjs/better-auth/config'

// Counts how often the module calls this factory. It stands in for the plugin factories
// (jwt(), mcp(), oauthProvider(), ...) that a real config builds on every call.
export default defineServerAuth(() => {
  const counter = globalThis as { __authFactoryCalls?: number }
  counter.__authFactoryCalls = (counter.__authFactoryCalls ?? 0) + 1
  return { emailAndPassword: { enabled: true } }
})
