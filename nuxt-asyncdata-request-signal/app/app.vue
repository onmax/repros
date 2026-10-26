<script setup lang="ts">
// One server-side useFetch of an internal route. On Nitro 3 it becomes `new Request(url, { signal })`.
const { data } = await useFetch('/api/report')
</script>

<template>
  <p>{{ data?.items.length }} items</p>
</template>
