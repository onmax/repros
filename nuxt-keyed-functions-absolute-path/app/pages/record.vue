<script setup lang="ts">
const { data: record } = await useAsyncData(() => Promise.resolve({ status: 'ok' }))
const views = useState(() => 0)
</script>

<template>
  <pre>{{ record }} {{ views }}</pre>
</template>
