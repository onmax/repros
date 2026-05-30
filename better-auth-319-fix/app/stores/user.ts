export const useUserStore = defineStore('user', () => {
  const { user, client: authClient, fetchSession, ...restOfUserSession } = useUserSession()

  return {
    user,
    authClient,
    fetchSession,
    ...restOfUserSession,
  }
})
