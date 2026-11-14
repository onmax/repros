// Each line reads an endpoint that one plugin in server/auth.config.ts adds.
export default defineEventHandler((event) => {
  const api = serverAuth(event).api
  return {
    createUser: typeof api.createUser, // admin()
    hasPermission: typeof api.hasPermission, // organization()
    signInAnonymous: typeof api.signInAnonymous, // anonymous()
    getSession: typeof api.getSession, // core, control
  }
})
