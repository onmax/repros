import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { posts } from '#custom/tables'

export const comments = sqliteTable('comments', {
  id: text('id').primaryKey(),
  postId: text('post_id').references(() => posts.id),
  body: text('body').notNull(),
})
