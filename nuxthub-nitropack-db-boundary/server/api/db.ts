import { db, schema } from '@nuxthub/db'

export default eventHandler(() => {
  return {
    dbType: typeof db,
    schemaKeys: Object.keys(schema),
  }
})
