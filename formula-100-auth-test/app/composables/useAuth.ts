import type { RouteLocationRaw } from 'vue-router'

type User = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image?: string | null
  role?: string | null
  banned?: boolean | null
  createdAt: Date
  updatedAt: Date
} & ({
  isLoggedIn: false
  isAdmin: false
  isFounder: false
  isUser: false
} | {
  isLoggedIn: true
  isAdmin: boolean
  isFounder: boolean
  isUser: boolean
})

const defaultUser: User = {
  isLoggedIn: false,
  banned: false,
  createdAt: new Date(),
  email: '',
  emailVerified: false,
  id: '00',
  name: 'Guest',
  image: undefined,
  updatedAt: new Date(),
  isAdmin: false,
  isFounder: false,
  isUser: false,
  role: 'guest',
}

export function useAuth() {
  const { session, user: rawUser, signIn, signUp, signOut: moduleSignOut, client, loggedIn, fetchSession } = useUserSession()

  const user = computed<User>(() => {
    if (!rawUser.value || !loggedIn.value) return defaultUser

    const role = (rawUser.value.role || 'user') as string
    return {
      ...rawUser.value,
      isLoggedIn: true,
      isAdmin: role === 'admin',
      isFounder: role === 'founder',
      isUser: role === 'user',
    }
  })

  async function signOut({ redirectTo }: { redirectTo?: RouteLocationRaw } = {}) {
    await moduleSignOut()
    if (redirectTo) await navigateTo(redirectTo)
  }

  return { session, user, signIn, signUp, signOut, client, fetchSession }
}
