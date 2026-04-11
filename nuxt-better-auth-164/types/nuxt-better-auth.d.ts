import '#nuxt-better-auth'

declare module '#nuxt-better-auth' {
  interface AuthUser {
    role: 'user' | 'admin'
  }
}
