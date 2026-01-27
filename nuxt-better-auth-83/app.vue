<template>
  <div>
    <h1>nuxt-better-auth #83 repro</h1>
    <pre>{{ JSON.stringify(session, null, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
const { session } = useAuth()
</script>
