import { users } from '../database/schema'

export default defineEventHandler(async () => {
  return useDrizzle().select().from(users).all()
})
