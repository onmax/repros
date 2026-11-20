import type { NuxtModule } from '@nuxt/schema'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {}

const module: NuxtModule<ModuleOptions> = defineNuxtModule<ModuleOptions>({
  // Nuxt runs onInstall only for modules whose meta has both a name and a version.
  meta: { name: 'repro-module', version: '1.0.0', configKey: 'reproModule' },
  onInstall(nuxt) {
    // A real module scaffolds config files here, for example `auth.config.ts`.
    writeFileSync(join(nuxt.options.rootDir, 'ONINSTALL_RAN'), 'onInstall ran\n')
  },
  setup() {},
})

export default module
