<script setup lang="ts">
if (import.meta.server) {
  const event = useRequestEvent()!
  await queryCollectionNavigation(event, 'docs')
}
</script>

<template>
  <div>docs</div>
</template>
