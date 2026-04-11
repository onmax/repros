<template>
  <h2>Hello from admin.vue</h2>
  <NuxtPage />
</template>

<script setup lang="ts">
definePageMeta({
  path: '/@admin',
  layout: {
    name: 'admin',
  },
})
</script>
