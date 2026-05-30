import { admin } from 'better-auth/plugins'
import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

export default defineServerAuth({
  appName: 'Better Auth #318 Repro',
  emailAndPassword: { enabled: true },
  plugins: [admin()],
})
