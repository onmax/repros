import { addTemplate, defineNuxtModule } from 'nuxt/kit'

// Minimal module that registers a .mjs alias (same pattern as nuxt-better-auth)
export default defineNuxtModule({
  setup(_options, nuxt) {
    const template = addTemplate({
      filename: 'custom/tables.mjs',
      getContents: () => `
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})
`,
      write: true,
    })
    nuxt.options.alias['#custom/tables'] = template.dst
  },
})
