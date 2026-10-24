<script setup lang="ts">
const { data: item } = await useAsyncData(() => Promise.resolve({ status: 'ok' }))
</script>

<template>
  <pre>{{ item }}</pre>
</template>
