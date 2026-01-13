<script setup lang="ts">
defineProps<{ data: { foo: string } | null }>()
</script>

<template>
  <div v-once id="v-once-content">
    Data: {{ data?.foo }}
  </div>
</template>
