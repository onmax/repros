import { db, schema } from 'hub:db'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const body = await readBody(event)

  const [record] = await db.insert(schema.testData).values({
    userId: session.user.id,
    content: body.content,
    createdAt: new Date(),
  }).returning()

  return record
})
