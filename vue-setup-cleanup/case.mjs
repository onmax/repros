import assert from 'node:assert/strict'
import { createRenderer, defineComponent, getCurrentInstance, h, nextTick, shallowRef } from 'vue'

const control = process.argv.includes('--control')
const expectBug = process.argv.includes('--expect-bug')
const slotWarning = 'Slot "default" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.'
const warnings = []
console.warn = (...args) => warnings.push(args.join(' '))

// The host stores nodes in memory instead of using a browser DOM.
function remove(node) {
  const siblings = node.parent?.children
  if (siblings) siblings.splice(siblings.indexOf(node), 1)
}

const host = {
  createElement: type => ({ type, children: [] }),
  createText: text => ({ text }),
  createComment: text => ({ comment: text }),
  insert(node, parent, anchor) {
    remove(node)
    node.parent = parent
    const index = anchor ? parent.children.indexOf(anchor) : -1
    if (index < 0) parent.children.push(node)
    else parent.children.splice(index, 0, node)
  },
  remove,
  setText(node, text) { node.text = text },
  setElementText(node, text) { node.text = text },
  parentNode: node => node.parent,
  nextSibling: node => node.parent?.children[node.parent.children.indexOf(node) + 1],
  patchProp() {},
}

const key = shallowRef(0)
const fail = shallowRef(false)
const SlotChild = defineComponent({
  setup(_, { slots }) {
    return () => h('a', null, slots.default())
  },
})
const Navigation = defineComponent({
  setup() {
    return () => h(SlotChild, { key: key.value }, { default: () => 'Overview' })
  },
})
const Broken = defineComponent({
  name: 'Broken',
  setup() {
    throw new Error('setup failed')
  },
})
const Failure = defineComponent({
  setup() {
    return () => fail.value ? h(Broken) : null
  },
})
const Root = defineComponent({
  setup() {
    return () => h('div', null, [h(Navigation), h(Failure)])
  },
})
createRenderer(host).createApp(Root).mount({ children: [] })

key.value++
await nextTick()
const before = warnings.filter(warning => warning.includes(slotWarning)).length

if (!control) {
  fail.value = true
  await assert.rejects(nextTick(), { message: 'setup failed' })
}
const leaked = getCurrentInstance()?.type.name

key.value++
await nextTick()
const after = warnings.filter(warning => warning.includes(slotWarning)).length
console.log(JSON.stringify({ before, leaked: leaked ?? null, after, warnings }, null, 2))

assert.equal(before, 0, 'the slot must start without warnings')
if (expectBug && !control) {
  assert.equal(leaked, 'Broken')
  assert.equal(after, 1, 'expected the exact false slot warning')
} else {
  assert.equal(after, 0, 'a slot called inside render must not warn')
  assert.equal(leaked, undefined, 'setup must restore currentInstance on error')
}
