<script setup lang="ts">
const { user, signUp, updateUser, fetchSession } = useUserSession()
</script>

<template>
  <div style="max-width: 600px; margin: 2rem auto; font-family: sans-serif;">
    <h1>nuxt-better-auth #108</h1>

    <p><strong>Name:</strong> {{ user?.name ?? 'Not logged in' }}</p>

    <div style="display: flex; gap: 0.5rem; margin: 1rem 0;">
      <button @click="signUp.email({ email: 'test@test.com', password: 'password123', name: 'Original' })">
        Sign Up
      </button>
      <button @click="updateUser({ name: 'Updated' })">
        Update Name
      </button>
      <button @click="fetchSession({ force: true })">
        Refresh Session
      </button>
    </div>

    <ol>
      <li>Click "Sign Up" — name shows "Original"</li>
      <li>Click "Update Name" — name changes to "Updated"</li>
      <li>Click "Refresh Session" — name reverts to "Original" (bug!)</li>
    </ol>

    <p><strong>Expected:</strong> Name stays "Updated" after refresh.</p>
    <p><strong>Actual:</strong> Name reverts because <code>updateUser()</code> only patches local state, never persists to server.</p>
  </div>
</template>
