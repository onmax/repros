import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

export default defineServerAuth(() => {
  return {
    appName: 'Test App',
    emailAndPassword: {
      enabled: true,
    },
  }
})
