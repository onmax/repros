<script setup lang="ts">
const observed = useState<string>('observed-layout')
</script>

<template>
  <p id="observed-layout">observed={{ observed }}</p>
</template>
