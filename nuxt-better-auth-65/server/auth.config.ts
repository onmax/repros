import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

export default defineServerAuth(() => ({
  appName: 'Test PR #65',
  emailAndPassword: { enabled: true },
}))
