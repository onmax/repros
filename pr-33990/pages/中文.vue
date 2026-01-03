<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div style="padding: 2rem; font-family: system-ui">
    <h1>中文 Page (Chinese)</h1>
    <p>Route path: {{ route.path }}</p>
    <p>✓ This page rendered successfully!</p>
    <NuxtLink to="/" style="display: block; margin-top: 1rem">← Back to home</NuxtLink>
  </div>
</template>
