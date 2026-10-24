<script setup lang="ts">
definePageMeta({ reproLabel: 'index' })

// No explicit keys. nuxt:compiler:keyed-functions adds one to each call.
const state = useState(() => 'repro-state')
const { data: asyncValue } = await useAsyncData(() => Promise.resolve('repro-async'))
const { data: fetched } = await useFetch('/api/repro')
</script>

<template>
  <main>
    <p id="state">{{ state }}</p>
    <p id="async">{{ asyncValue }}</p>
    <p id="fetch">{{ fetched }}</p>
    <FromImports />
  </main>
</template>
