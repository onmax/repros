import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('route-rules runtime import reproduction', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/plain', import.meta.url)),
    dev: true
  })

  it('boots dev server and serves the home page', async () => {
    const html = await $fetch<string>('/')
    expect(html).toContain('plain')
  })
})
