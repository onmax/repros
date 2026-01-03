<script setup lang="ts">
const { user } = useAuth()
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Auth Test - Home</h1>

    <div v-if="user.isLoggedIn" class="space-y-4">
      <p>Welcome, {{ user.name }}!</p>
      <p>Email: {{ user.email }}</p>
      <p>Role: {{ user.role }}</p>
      <p>Admin: {{ user.isAdmin }}</p>
      <p>Founder: {{ user.isFounder }}</p>

      <div class="space-x-2">
        <a href="/app" class="underline text-blue-600">Go to App</a>
        <a href="/admin" class="underline text-blue-600">Go to Admin</a>
      </div>
    </div>

    <div v-else class="space-y-4">
      <p>Not logged in</p>
      <a href="/login" class="underline text-blue-600">Login</a>
      <span class="mx-2">|</span>
      <a href="/signup" class="underline text-blue-600">Signup</a>
    </div>
  </div>
</template>
