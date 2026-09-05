// Issue: serverAuth requires H3Event, can't be used in Nitro tasks
export default defineTask({
  meta: { name: 'db:seed', description: 'Seed database with test users' },
  async run() {
    // This fails - no H3Event available in task context
    // const auth = await serverAuth(???)
    // await auth.api.signUpEmail({ body: { name: 'Admin', email: 'admin@test.com', password: 'test123' } })

    console.log('Cannot seed: serverAuth requires H3Event which is not available in tasks')
    return { result: 'failed' }
  },
})
