// Fixed: serverAuth() works without H3Event
export default defineTask({
  meta: { name: 'db:seed', description: 'Seed database with test users' },
  async run() {
    const auth = serverAuth()

    // This now works - no H3Event needed
    await auth.api.signUpEmail({ body: { name: 'Admin', email: 'admin@test.com', password: 'test123' } })

    console.log('Seeded admin user successfully')
    return { result: 'success' }
  },
})
