<script setup lang="ts">
const { signUp } = useUserSession()
const email = ref('')
const password = ref('')
const name = ref('')
const error = ref('')
const loading = ref(false)

async function handleSignup() {
  error.value = ''
  loading.value = true
  try {
    const result = await signUp.email({
      email: email.value,
      password: password.value,
      name: name.value
    })
    if (result.error) {
      error.value = result.error.message || 'Signup failed'
    } else {
      await navigateTo('/app')
    }
  } catch (e: any) {
    error.value = e.message || 'Signup failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSignup">
      <input v-model="name" type="text" placeholder="Name" required>
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit" :disabled="loading">{{ loading ? 'Loading...' : 'Sign Up' }}</button>
    </form>
    <p v-if="error" style="color: red">{{ error }}</p>
    <p>Already have an account? <NuxtLink to="/login">Login</NuxtLink></p>
  </div>
</template>
