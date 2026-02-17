declare module '#nuxt-better-auth' {
  interface AuthUser {
    role?: 'user' | 'admin'
    internalCode?: string | null
  }
}

export {}
