<script setup lang="ts">
const { user, signOut } = useAuth()
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">App Page (Protected)</h1>

    <p class="mb-2">This page requires authentication (routeRules: auth: 'user')</p>
    <p class="mb-4">User: {{ user.name }} ({{ user.email }})</p>

    <button
      @click="signOut({ redirectTo: '/' })"
      class="bg-red-600 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  </div>
</template>
