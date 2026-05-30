import { admin } from 'better-auth/plugins'
import { defineServerAuth } from '../../../nuxt/better-auth/src/runtime/config'

export default defineServerAuth({
  appName: 'Better Auth #318 Repro',
  emailAndPassword: { enabled: true },
  plugins: [admin()],
})
