<script setup lang="ts">
const { user, signUp, updateUser, fetchSession } = useUserSession()
</script>

<template>
  <div style="max-width: 600px; margin: 2rem auto; font-family: sans-serif;">
    <h1>nuxt-better-auth #108 (fix)</h1>

    <p><strong>Name:</strong> {{ user?.name ?? 'Not logged in' }}</p>

    <div style="display: flex; gap: 0.5rem; margin: 1rem 0;">
      <button @click="signUp.email({ email: 'test@test.com', password: 'password123', name: 'Original' })">
        Sign Up
      </button>
      <button @click="await updateUser({ name: 'Updated' })">
        Update Name
      </button>
      <button @click="fetchSession({ force: true })">
        Refresh Session
      </button>
    </div>

    <ol>
      <li>Click "Sign Up" — name shows "Original"</li>
      <li>Click "Update Name" — name changes to "Updated"</li>
      <li>Click "Refresh Session" — name stays "Updated" (fixed!)</li>
    </ol>

    <p><strong>Fix:</strong> <code>updateUser()</code> now calls <code>client.updateUser()</code> to persist changes to the server, with optimistic local update and rollback on error.</p>
  </div>
</template>
