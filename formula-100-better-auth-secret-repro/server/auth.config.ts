import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

export default defineServerAuth(({ runtimeConfig }) => {
  return {
    secret: runtimeConfig.sessionSecret || 'formula-100-session-secret-only',
    emailAndPassword: {
      enabled: true,
      disableSignUp: true,
    },
  }
})
