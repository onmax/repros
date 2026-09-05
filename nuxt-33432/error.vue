<template>
  <div>
    <h1>Error Page</h1>
    <p>Status: {{ error?.statusCode }}</p>
    <p>Message: {{ error?.message }}</p>
    <p>Status Message: {{ error?.statusMessage }}</p>
  </div>
</template>

<script setup lang="ts">
const error = useError()
</script>
