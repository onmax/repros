import { useDrizzle } from 'hub:db'
import { todos } from '../database/schema'

export default defineEventHandler(async () => {
  return useDrizzle().select().from(todos).all()
})
