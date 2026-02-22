<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <main>
    <p data-testid="query">query preview: {{ route.query.preview }}</p>
    <div
      data-testid="mode"
      :style="{ backgroundColor: route.query.preview === 'true' ? 'red' : 'blue' }"
    >
      expected red when ?preview=true
    </div>
  </main>
</template>
