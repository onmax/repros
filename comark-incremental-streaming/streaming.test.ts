import { expect, it } from 'vitest'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { MarkdownClient } from '@comark/react/components/MarkdownClient'
import { Markdown } from '@comark/svelte'
import { MarkdownAsync } from '@comark/svelte/async'
import { render } from 'vitest-browser-svelte'
import type { ComarkPlugin } from 'comark'
import Boundary from './Boundary.svelte'

const initial = 'First\n\nSecond\n\nThird'
const appended = `${initial} grows`

for (const [name, component] of [
  ['React MarkdownClient', MarkdownClient],
  ['Svelte Markdown', Markdown],
  ['Svelte MarkdownAsync', MarkdownAsync],
] as const) {
  it(`${name} skips completed blocks on append`, async () => {
    const inputs: string[] = []
    const plugins: ComarkPlugin[] = [{
      name: 'observe-parser-input',
      pre(state) { inputs.push(state.markdown) },
    }]
    const container = document.createElement('div')
    document.body.append(container)
    let update: (value: string, streaming: boolean) => Promise<void>
    let dispose: () => Promise<void>
    if (name === 'React MarkdownClient') {
      const root = createRoot(container)
      update = async (value, streaming) => {
        root.render(createElement(MarkdownClient, { value, streaming, plugins }))
      }
      dispose = async () => root.unmount()
    } else {
      const screen = render(Boundary, {
        target: container,
        props: { component, value: initial, streaming: true, plugins },
      })
      update = async (value, streaming) => { await screen.rerender({ value, streaming }) }
      dispose = async () => { await screen.unmount() }
    }
    try {
      if (name === 'React MarkdownClient') await update(initial, true)
      await expect.poll(() => container.textContent).toContain('Third')
      expect(inputs).toEqual([initial])
      await update(appended, true)
      await expect.poll(() => container.textContent).toContain('Third grows')
      expect(container.textContent).toContain('First')
      expect(container.textContent).toContain('Second')
      expect(inputs).toHaveLength(2)
      const appendInput = inputs[1]
      console.log(JSON.stringify({ component: name, expectedAppendInput: '\nThird grows', actualAppendInput: appendInput }))
      expect.soft(appendInput).toBe('\nThird grows')
      await update(appended, false)
      await expect.poll(() => inputs.length).toBe(3)
      expect(inputs[2]).toBe(appended)
      console.log(`${name}: full source parsed on completion`)
    } finally {
      await dispose()
      container.remove()
    }
  })
}
