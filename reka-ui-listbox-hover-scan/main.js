import { verifyCollectionContract } from './contract.js'
import { createApp, h, nextTick } from 'vue'
import { ListboxRoot, ListboxContent, ListboxItem } from 'reka-ui'

const size = Number(new URLSearchParams(location.search).get('size') || 1000)
let lastHighlight
const app = createApp({
  render: () => h(ListboxRoot, {
    highlightOnHover: true,
    onHighlight: item => { lastHighlight = item?.value },
  }, () => h(ListboxContent, {}, () => Array.from({ length: size }, (_, i) =>
    h(ListboxItem, { value: `item-${i}`, key: i }, () => `Item ${i}`),
  ))),
})
app.mount('#app')
await nextTick()
await new Promise(resolve => setTimeout(resolve, 30))
window.fixture = { verifyCollectionContract, nextTick, size, get lastHighlight() { return lastHighlight } }
