<script setup lang="ts">
// PR #29 pattern: email templates receive config as props (no env imports)
defineProps<{
  userEmail: string
  userName: string
  baseUrl?: string
}>()
</script>

<template>
  <div>
    <h1>Welcome {{ userName }}!</h1>
    <p>Your email: {{ userEmail }}</p>
    <p>Base URL: {{ baseUrl }}</p>
  </div>
</template>
