<script setup lang="ts">
const multipart = useMultipartUpload('/api/blob/multipart')
</script>

<template>
  <div>local repro {{ typeof multipart }}</div>
</template>
