<script setup lang="ts">
defineProps<{
  error: {
    cause?: Error
  }
}>()
</script>

<template>
  <p id="cause">
    cause: {{ error.cause?.message ?? 'missing' }}
  </p>
</template>
