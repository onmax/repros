<script setup lang="ts">
// Rolldown's inject only rewrites free identifiers, so code that imports
// from `#imports` still goes through nuxt:imports-transform.
import { useRoute } from '#imports'

const route = useRoute()
</script>

<template>
  <p id="route">{{ route.path }}</p>
</template>
