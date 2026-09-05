<template>
  <div>
    <h1>Client-only Auth Test</h1>
    <p v-if="loggedIn">Logged in as {{ user?.email }}</p>
    <p v-else>Not logged in</p>
  </div>
</template>

<script setup lang="ts">
const { loggedIn, user } = useUserSession()
</script>
