// Server code that applies NuxtHub migrations imports its helpers from `@nuxthub/core/db`.
import { applyDatabaseMigrations } from '@nuxthub/core/db'

export default () => {
  console.log(typeof applyDatabaseMigrations)
}
