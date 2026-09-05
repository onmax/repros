import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export function modulePath(path) {
  if (process.env.REPRO_SOURCE_ROOT)
    return join(process.env.REPRO_SOURCE_ROOT, 'src/runtime', `${path}.ts`)
  return join(dirname(fileURLToPath(import.meta.resolve('@nuxtjs/better-auth'))), 'runtime', `${path}.js`)
}
const fixture = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
export const expectFixed = process.env.REPRO_EXPECT_FIXED === '1' || fixture.repro?.expectedFixed === true
