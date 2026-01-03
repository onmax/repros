import { desc, tables } from '../../utils/database'

export async function getAllFounders() {
  return db.query.founders.findMany({
    orderBy: [desc(tables.founders.createdAt)],
  })
}
