import { admin } from 'better-auth/plugins'

export default defineServerAuth(() => ({
  plugins: [admin()],
}))
