import { adminClient } from 'better-auth/client/plugins'
import { defineClientAuth } from '../../../nuxt/better-auth/src/runtime/config'

export default defineClientAuth({
  plugins: [adminClient()],
})
