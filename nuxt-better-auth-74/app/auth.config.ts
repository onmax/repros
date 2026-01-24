import { adminClient } from 'better-auth/client/plugins'

export default defineAppAuthClient(() => ({
  plugins: [adminClient()],
}))
