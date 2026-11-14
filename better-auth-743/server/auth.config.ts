import { apiKey } from '@better-auth/api-key'
import { defineServerAuth } from '@nuxtjs/better-auth/config'

export default defineServerAuth({
  emailAndPassword: { enabled: true },
  plugins: [apiKey({ enableSessionForAPIKeys: true })],
})
