import { defineServerAuth } from '@onmax/nuxt-better-auth/server'

export default defineServerAuth(() => ({
  secret: 'test-secret-key',
  emailAndPassword: {
    enabled: true
  }
}))
