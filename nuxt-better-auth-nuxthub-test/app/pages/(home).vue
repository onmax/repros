<script setup lang="ts">
const { user, fetchSession } = useUserSession()

onMounted(() => fetchSession())
</script>

<template>
  <div>
    <h1>Home</h1>
    <div v-if="user">
      <p>Welcome {{ user.name || user.email }}!</p>
      <p>Role: {{ user.role }}</p>
    </div>
    <div v-else>
      <p>Not logged in</p>
    </div>
  </div>
</template>
