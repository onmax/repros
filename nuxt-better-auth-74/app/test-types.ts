// Type test: AuthUser should include `role` from admin() plugin

export function testAdminPluginTypes() {
  const user = {} as import('#nuxt-better-auth').AuthUser

  // role IS being inferred from admin plugin (as string | null | undefined)
  const _role = user.role
  console.log(_role)

  return user
}
