import { camelize, hyphenate, capitalize, toHandlerKey } from '@vue/shared'
import { reactive, ref, effect, stop } from '@vue/reactivity'
import { createRenderer, h, inject, hasInjectionContext } from '@vue/runtime-core'

export function exerciseUsedExports() {
  const strings = () => [
    camelize('hello-world'),
    hyphenate('helloWorld'),
    capitalize('world'),
    toHandlerKey('click'),
  ]
  const count = ref(1)
  const state = reactive({ count: 1 })
  let effectRuns = 0
  let observed
  const runner = effect(() => {
    effectRuns++
    observed = state.count
  })
  state.count++
  stop(runner)
  state.count++
  count.value++
  const values = [...reactive([1, 2, 3])]
  const custom = Symbol('custom')
  const symbols = reactive({ [Symbol.iterator]: 1, [custom]: 1 })
  const symbolRuns = [0, 0, 0, 0]
  const readers = [
    () => symbols[Symbol.iterator],
    () => Symbol.iterator in symbols,
    () => symbols[custom],
    () => custom in symbols,
  ]
  const symbolEffects = readers.map((read, index) => effect(() => {
    symbolRuns[index]++
    read()
  }))
  symbols[Symbol.iterator]++
  symbols[custom]++
  symbolEffects.forEach(stop)

  const renderer = createRenderer({
    insert: (node, parent) => parent.children.push(node),
    remove: () => {},
    createElement: type => ({ type, children: [], text: '' }),
    createText: text => ({ text }),
    createComment: text => ({ text }),
    setText: (node, text) => { node.text = text },
    setElementText: (node, text) => { node.text = text },
    parentNode: () => null,
    nextSibling: () => null,
    patchProp: () => {},
  })
  const contexts = []
  const Component = {
    setup() {
      contexts.push(hasInjectionContext())
      const value = inject('token', 'fallback')
      return () => h('p', value)
    },
  }
  // A vnode rendered without createApp exercises emptyAppContext.
  const bare = { children: [] }
  renderer.render(h(Component), bare)
  const mounted = { children: [] }
  const app = renderer.createApp(Component)
  app.provide('token', 'provided')
  app.mount(mounted)
  const rendered = [bare.children[0].text, mounted.children[0].text]
  renderer.render(null, bare)
  app.unmount()
  return {
    strings: [strings(), strings()],
    count: count.value,
    effectRuns,
    observed,
    values,
    symbolRuns,
    contexts,
    rendered,
    outsideContext: hasInjectionContext(),
  }
}
