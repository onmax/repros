<!-- Two root nodes, so Vue SSR wraps each row in fragment comments like most component-heavy pages. -->
<template>
  <dt>Row {{ n }}</dt>
  <dd>Value {{ n }}</dd>
</template>

<script setup lang="ts">
defineProps<{ n: number }>()
</script>
