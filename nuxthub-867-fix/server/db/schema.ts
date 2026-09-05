import { pgTable, serial, text } from 'drizzle-orm/pg-core'

export const reproUsers = pgTable('repro_users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull()
})
