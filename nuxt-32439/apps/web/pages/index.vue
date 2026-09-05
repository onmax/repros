<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <main>
    <p>query preview: {{ route.query.preview }}</p>
    <div
      :style="{ backgroundColor: route.query.preview === 'true' ? 'red' : 'blue' }"
    >
      expected red when ?preview=true
    </div>
  </main>
</template>
