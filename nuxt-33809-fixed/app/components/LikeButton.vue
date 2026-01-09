<script setup>
const count = ref(0)
</script>

<template>
  <button @click="count++" style="padding: 0.5rem 1rem; font-size: 1rem;">
    Like ({{ count }})
  </button>
</template>
