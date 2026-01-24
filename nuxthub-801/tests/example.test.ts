import { describe, it, expect } from 'vitest'
import { setup } from '@nuxt/test-utils'

describe('example', async () => {
  await setup({})

  it('should pass', () => {
    expect(1 + 1).toBe(2)
  })
})
