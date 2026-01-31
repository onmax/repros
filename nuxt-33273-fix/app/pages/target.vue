<template>
  <div>
    <h1>Redirect Target</h1>
    <p>Callback: {{ route.query.callback }}</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
