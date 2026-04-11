<script setup lang="ts">
const { user, signOut } = useUserSession()
const route = useRoute()

watch(user, async (nextUser, previousUser) => {
  if (!nextUser && previousUser)
    await navigateTo(`/dashboard?from=${route.path.slice(1) || 'root'}`, { replace: true })
})
</script>

<template>
  <div style="max-width: 400px; margin: 50px auto">
    <h1>Dashboard</h1>
    <p>Logged in as: {{ user?.email }}</p>
    <button @click="signOut()">Sign out</button>
  </div>
</template>
