<script setup lang="ts">
const emit = defineEmits<{
  updateCriteria: [criteria: string[]]
}>()

onMounted(() => {
  emit('updateCriteria', ['mount-emit-1'])
  window.setTimeout(() => emit('updateCriteria', ['mount-emit-2']), 150)
})
</script>

<template>
  <button type="button" @click="emit('updateCriteria', ['manual-click'])">
    Emit criteria update
  </button>
</template>
