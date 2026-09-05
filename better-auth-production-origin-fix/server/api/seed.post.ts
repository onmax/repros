export default defineEventHandler(async (event) => {
  await serverAuth(event).api.signUpEmail({
    body: { name: 'Example User', email: 'repro@example.test', password: 'public-repro-password123!' },
  })
  return { seeded: true }
})
