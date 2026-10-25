// Whether serverAuth() returned the same Better Auth instance as on the previous request.
export default defineEventHandler((event) => {
  const auth = serverAuth(event)
  const state = globalThis as { __lastAuth?: unknown }
  const same = state.__lastAuth === auth
  state.__lastAuth = auth
  return { same }
})
