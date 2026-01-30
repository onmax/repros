export default defineEventHandler(async () => {
  const users = await db.select().from(schema.users).all()
  return users.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
  }))
})
