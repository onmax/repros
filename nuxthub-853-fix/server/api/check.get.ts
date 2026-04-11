import { db, schema } from '@nuxthub/db'

export default eventHandler(async () => {
  const count = await db.select().from(schema.todos)
  return { rows: count.length }
})
