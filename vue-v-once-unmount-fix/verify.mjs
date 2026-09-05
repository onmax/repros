// Authored by an AI agent on behalf of onmax; not human-reviewed.
import assert from 'node:assert/strict'
import { Window } from 'happy-dom'

process.env.NODE_ENV = 'development'
const window = new Window()
for (const key of ['document', 'Element', 'SVGElement']) {
  globalThis[key] = window[key]
}
globalThis.window = window

// Vue captures document during import, so install the DOM first.
const { createApp, h, nextTick, onUnmounted, ref, version } = await import('vue')

async function unmountCount(rerender) {
  let unmounted = 0
  const count = ref(0)
  const Child = {
    setup() {
      onUnmounted(() => unmounted++)
      return () => h('div', 'hello')
    },
  }
  const app = createApp({
    components: { Child },
    setup: () => ({ count }),
    template: '<div><Child v-once />{{ count }}</div>',
  })
  const host = window.document.createElement('div')
  app.mount(host)
  try {
    assert.equal(host.textContent, 'hello0')
    if (rerender) {
      count.value++
      await nextTick()
      assert.equal(host.textContent, 'hello1')
    }
  } finally {
    app.unmount()
  }
  return unmounted
}

try {
  console.log(`Node ${process.version}; Vue ${version}; happy-dom 20.12.0`)
  const control = await unmountCount(false)
  console.log(`Control: unmount without rerender. Expected 1 hook call; actual ${control}.`)
  assert.equal(control, 1, 'The control must unmount the child')

  const actual = await unmountCount(true)
  console.log(`Repro: rerender, then unmount. Expected 1 hook call; actual ${actual}.`)
  if (process.argv.includes('--fixed')) {
    assert.equal(actual, 1, 'The v-once child must unmount after a rerender')
    console.log('FIXED: the v-once child unmount hook runs after a parent rerender.')
  } else {
    assert.equal(actual, 0, 'Bug no longer reproduced: expected the child unmount hook to be skipped')
    console.log('REPRODUCED: rerendering makes Vue skip the v-once child unmount hook.')
  }
} finally {
  await window.happyDOM.close()
}
