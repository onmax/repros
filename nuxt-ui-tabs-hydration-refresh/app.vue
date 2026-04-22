<script setup lang="ts">
const model = ref('three')
const items = ref(
  import.meta.client
    ? [
        { label: 'One', value: 'one', content: 'One panel' },
        { label: 'Two', value: 'two', content: 'Two panel' },
        { label: 'Three', value: 'three', content: 'Three panel' },
      ]
    : [{ label: 'Three', value: 'three', content: 'Three panel' }],
)
const active = ref<string[]>([])

onMounted(async () => {
  await nextTick()
  active.value = Array.from(document.querySelectorAll<HTMLElement>('[role="tab"][data-state="active"]'))
    .map(el => el.textContent?.trim() ?? '')
})
</script>

<template>
  <UApp>
    <UTabs v-model="model" :items="items" />
    <pre>{{ { model, active } }}</pre>
  </UApp>
</template>
