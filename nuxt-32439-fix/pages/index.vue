<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <h1>Query Params Hydration Bug</h1>
    <p>Query preview: {{ route.query.preview }}</p>
    <div :class="route.query.preview === 'true' ? 'preview-mode' : 'normal-mode'">
      This should have red background when ?preview=true
    </div>
  </div>
</template>

<style scoped>
.preview-mode {
  background: red;
  padding: 20px;
  color: white;
}
.normal-mode {
  background: blue;
  padding: 20px;
  color: white;
}
</style>
