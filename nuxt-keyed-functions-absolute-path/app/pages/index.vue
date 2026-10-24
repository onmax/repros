<script setup lang="ts">
const { data: report } = await useAsyncData(() => Promise.resolve({ status: 'ok' }))
</script>

<template>
  <pre>{{ report }}</pre>
</template>
