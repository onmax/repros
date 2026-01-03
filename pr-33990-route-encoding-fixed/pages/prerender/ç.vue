<script setup lang="ts">
const wasPrerendered = useState(() => import.meta.prerender)
</script>

<template>
  <div>
    <h1>Route: /prerender/ç</h1>
    <p>Should be prerendered: {{ wasPrerendered }}</p>
    <p>Route accessed successfully with special char 'ç'</p>
    <NuxtLink to="/">Back home</NuxtLink>
  </div>
</template>
