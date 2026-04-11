import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const layerPosts = sqliteTable('layer_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull()
})
