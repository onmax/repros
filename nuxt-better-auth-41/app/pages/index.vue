<script setup lang="ts">
// This tests that plugin-injected session fields are properly typed
const { session } = useUserSession()

// BUG: Before fix, activeOrganizationId shows type error:
// "Property 'activeOrganizationId' does not exist on type 'AuthSession'"
// The organization plugin adds this field but TypeScript doesn't know about it
const orgId = computed(() => session.value?.activeOrganizationId)
</script>

<template>
  <div>
    <p>Active Org: {{ orgId }}</p>
  </div>
</template>
