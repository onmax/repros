import { createApp, defineComponent, h, nextTick, ref } from 'vue'
import { useCollection } from './node_modules/reka-ui/dist/Collection/Collection.js'

export async function verifyCollectionContract() {
  const owners = {}
  const enabled = ref(true)
  const Provider = defineComponent({
    props: ['name'],
    setup(props) {
      const collection = useCollection({ isProvider: true })
      owners[props.name] = collection
      const item = (value, disabled = false) => h(collection.CollectionItem, { value }, () =>
        h('div', { id: `${props.name}-${value}`, 'data-disabled': disabled ? '' : undefined }, value))
      return () => h(collection.CollectionSlot, {}, () => h('section', { id: props.name }, [
        enabled.value ? item('enabled') : null,
        item('disabled', true),
        props.name === 'outer' ? h(Provider, { name: 'inner' }) : null,
      ]))
    },
  })
  const host = document.createElement('div')
  document.body.append(host)
  const app = createApp({ render: () => h(Provider, { name: 'outer' }) })
  app.mount(host)
  try {
    await nextTick()
    const outer = owners.outer
    const inner = owners.inner
    const lookup = (owner, element, includeDisabled = false) => owner.getItem
      ? owner.getItem(element, includeDisabled)
      : owner.getItems(includeDisabled).find(item => item.ref === element)
    const element = document.getElementById('outer-enabled')
    const disabled = document.getElementById('outer-disabled')
    const nested = document.getElementById('inner-enabled')
    const result = {
      hasDirectLookup: typeof outer.getItem === 'function',
      enabled: lookup(outer, element)?.value,
      identityPreserved: lookup(outer, element) === outer.getItems().find(item => item.ref === element),
      disabledExcluded: lookup(outer, disabled) === undefined,
      disabledIncluded: lookup(outer, disabled, true)?.value,
      unregisteredExcluded: lookup(outer, document.createElement('div')) === undefined,
      nestedExcluded: lookup(outer, nested) === undefined,
      nestedIncluded: lookup(inner, nested)?.value,
    }
    element.remove()
    result.detachedRegistered = lookup(outer, element)?.value
    document.getElementById('outer').prepend(element)
    enabled.value = false
    await nextTick()
    result.unmountedExcluded = lookup(outer, element) === undefined
    return result
  } finally {
    app.unmount()
    host.remove()
  }
}
