<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

type TabItem = {
  label: string
  value: string
}

const root = ref<HTMLElement | null>(null)
const selectedTab = ref('third')
const domState = ref('')

const firstItems: TabItem[] = [
  { label: 'Third', value: 'third' }
]

const secondItems: TabItem[] = [
  { label: 'First', value: 'first' },
  { label: 'Second', value: 'second' },
  { label: 'Third', value: 'third' }
]

const items = ref<TabItem[]>(import.meta.server ? firstItems : secondItems)

function readDomState() {
  const tabs = Array.from(root.value?.querySelectorAll<HTMLElement>('[role="tab"]') || [])

  domState.value = JSON.stringify(tabs.map(tab => ({
    text: tab.textContent?.trim(),
    ariaSelected: tab.getAttribute('aria-selected'),
    dataState: tab.getAttribute('data-state')
  })), null, 2)
}

onMounted(async () => {
  await nextTick()
  await nextTick()
  readDomState()
})
</script>

<template>
  <main
    ref="root"
    style="font-family: sans-serif; padding: 32px; max-width: 900px; margin: 0 auto;"
  >
    <h1 style="font-size: 24px; margin-bottom: 12px;">
      UTabs active state repro
    </h1>

    <p style="margin-bottom: 12px;">
      This renders one tab on the server and three tabs on the client, then reads the tab DOM state after mount.
    </p>

    <p style="margin-bottom: 24px;">
      The selected value stays <code>third</code>.
    </p>

    <UTabs
      v-model="selectedTab"
      :items="items"
      value-key="value"
      label-key="label"
      color="neutral"
      variant="link"
      :content="false"
    />

    <div style="margin-top: 24px;">
      <p><strong>Expected:</strong> only Third should be active after the update.</p>
      <p><strong>Observed:</strong> the selected state can become wrong after the update.</p>
    </div>

    <div style="margin-top: 24px;">
      <p><strong>Current model:</strong> {{ selectedTab }}</p>
      <p><strong>Current items:</strong> {{ items.map(item => item.value).join(', ') }}</p>
    </div>

    <div style="margin-top: 24px;">
      <p><strong>Tab DOM state:</strong></p>
      <pre style="padding: 16px; background: #f5f5f5; border: 1px solid #ddd; border-radius: 8px; overflow: auto;">{{ domState }}</pre>
    </div>
  </main>
</template>
