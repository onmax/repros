import { db } from 'hub:db'
import { projects } from 'hub:db:schema'

export default defineEventHandler(async () => {
  // Query a project
  const project = await db.query.projects.findFirst()

  // Hover over 'styles' in VSCode - should be Style[] but shows 'any'
  const styles = project?.styles

  // This should show type error but doesn't because styles is 'any'
  // @ts-expect-error - styles should be Style[] not allow number
  const test: number = styles

  return { project, styles }
})
