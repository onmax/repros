<script setup lang="ts">
const { client } = useAuth()

const email = ref('test@example.com')
const password = ref('password123')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true

  const result = await client.signIn.email({
    email: email.value,
    password: password.value,
  })

  loading.value = false

  if (result.error) {
    error.value = result.error.message
  } else {
    const { fetchSession } = useAuth()
    await fetchSession({ force: true })
    await navigateTo('/app')
  }
}
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Login</h1>

    <form @submit.prevent="handleLogin" class="space-y-4 max-w-sm">
      <div>
        <label class="block mb-1">Email</label>
        <input
          v-model="email"
          type="email"
          class="border p-2 w-full"
          required
        />
      </div>

      <div>
        <label class="block mb-1">Password</label>
        <input
          v-model="password"
          type="password"
          class="border p-2 w-full"
          required
        />
      </div>

      <div v-if="error" class="text-red-600">
        {{ error }}
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <div class="mt-4">
        <a href="/signup" class="text-blue-600 underline">Need an account? Sign up</a>
      </div>
    </form>
  </div>
</template>
