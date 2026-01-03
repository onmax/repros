<script setup lang="ts">
const { signIn } = useUserSession()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    const result = await signIn.email({ email: email.value, password: password.value })
    if (result.error) {
      error.value = result.error.message || 'Login failed'
    } else {
      await navigateTo('/app')
    }
  } catch (e: any) {
    error.value = e.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit" :disabled="loading">{{ loading ? 'Loading...' : 'Login' }}</button>
    </form>
    <p v-if="error" style="color: red">{{ error }}</p>
    <p>Don't have an account? <NuxtLink to="/signup">Sign up</NuxtLink></p>
  </div>
</template>
