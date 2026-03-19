import { buildNuxt, loadNuxt } from '@nuxt/kit'
import { describe, expect, it } from 'vitest'

describe('basic fixture', () => {
  const rootDir = new URL('./fixture', import.meta.url).pathname

  it('builds the fixture with nuxt kit directly', async () => {
    const nuxt = await loadNuxt({
      cwd: rootDir,
      dev: false,
      overrides: {
        buildDir: `${rootDir}/.nuxt/test/direct`,
        nitro: {
          output: {
            dir: `${rootDir}/.nuxt/test/direct/output`,
          },
        },
      },
    })
    await buildNuxt(nuxt)
    await nuxt.close()
    expect(true).toBe(true)
  })
})
