<script setup>
const wasPrerendered = useState(() => import.meta.prerender)
</script>

<template>
  <div style="padding: 2rem;">
    <h1>ç Page (C-cedilla)</h1>
    <p>This page has a c-cedilla character in the filename.</p>
    <p>Route: {{ $route.path }}</p>
    <p>Was prerendered: {{ wasPrerendered }}</p>
    <NuxtLink to="/">Back to home</NuxtLink>
  </div>
</template>
