<template>
  <div>
    <h1>Prerendered Page</h1>
    <p v-if="pending">Loading...</p>
    <p v-else>Data: {{ data }}</p>
    <NuxtLink to="/no-ssr">Back to no-ssr page</NuxtLink>
  </div>
</template>

<script setup>
const { data, pending } = await useAsyncData('test-data', async () => {
  return 'Hello from useAsyncData!'
})
</script>
