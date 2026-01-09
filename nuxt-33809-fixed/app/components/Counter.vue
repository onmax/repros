<script setup lang="ts">
const props = defineProps<{ id: string }>()
const count = ref(0)
</script>

<template>
  <div class="counter">
    <span>Counter {{ id }}: {{ count }}</span>
    <button @click="count++">+</button>
  </div>
</template>
