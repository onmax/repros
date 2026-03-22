<script setup lang="ts">
const { user, signOut } = useUserSession()
</script>

<template>
  <div style="max-width: 400px; margin: 50px auto">
    <h1>Dashboard</h1>
    <p>Logged in as: {{ user?.email }}</p>
    <button @click="signOut()">Sign out</button>
  </div>
</template>
