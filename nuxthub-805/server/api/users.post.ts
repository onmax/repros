import { users } from '../database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return db.insert(users).values({ name: body.name, email: body.email }).returning().get()
})
