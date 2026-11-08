import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { defineDatabase } from "vite-hub/database"

const notes = sqliteTable("notes", { id: text("id").primaryKey() })

export default defineDatabase({ schema: { notes } })
