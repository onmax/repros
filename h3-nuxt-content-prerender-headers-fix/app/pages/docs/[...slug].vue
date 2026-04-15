<script setup lang="ts">
import { queryCollectionNavigation } from '@nuxt/content/server'

let navigation: unknown = null

if (import.meta.server) {
  const event = useRequestEvent()!
  navigation = await queryCollectionNavigation(event, 'docs')
}
</script>

<template>
  <pre>{{ JSON.stringify(navigation, null, 2) }}</pre>
</template>
