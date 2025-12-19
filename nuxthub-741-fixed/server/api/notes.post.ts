import { db, schema } from 'hub:db'

export default defineEventHandler(async (event) => {
  const { content } = await readBody(event)
  if (!content) throw createError({ statusCode: 400, message: 'Content required' })

  const result = await db.insert(schema.notes).values({ content, createdAt: new Date() }).returning()
  return result[0]
})
