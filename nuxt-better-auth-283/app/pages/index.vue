<script setup lang="ts">
const signIn = useSignIn('email')
const signUp = useSignUp('email')
const form = reactive({ name: 'Test', email: 'test@test.com', password: 'password123' })

async function handleSignUp() {
  await signUp.execute(form)
  if (signUp.status.value === 'success')
    await navigateTo('/dashboard')
}

async function handleSignIn() {
  await signIn.execute({ email: form.email, password: form.password })
  if (signIn.status.value === 'success')
    await navigateTo('/dashboard')
}
</script>

<template>
  <div style="max-width: 400px; margin: 50px auto">
    <h1>Login</h1>
    <input v-model="form.email" placeholder="Email"><br>
    <input v-model="form.password" type="password" placeholder="Password"><br><br>
    <button @click="handleSignIn">Sign in</button>
    <button @click="handleSignUp">Sign up</button>
  </div>
</template>
