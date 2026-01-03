<script setup lang="ts">
const { client } = useAuth()

const name = ref('Test User')
const email = ref('test@example.com')
const password = ref('password123')
const error = ref('')
const loading = ref(false)

async function handleSignup() {
  error.value = ''
  loading.value = true

  const result = await client.signUp.email({
    name: name.value,
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
    <h1 class="text-2xl font-bold mb-4">Sign Up</h1>

    <form @submit.prevent="handleSignup" class="space-y-4 max-w-sm">
      <div>
        <label class="block mb-1">Name</label>
        <input
          v-model="name"
          type="text"
          class="border p-2 w-full"
          required
        />
      </div>

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
          minlength="8"
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
        {{ loading ? 'Creating account...' : 'Sign Up' }}
      </button>

      <div class="mt-4">
        <a href="/login" class="text-blue-600 underline">Already have an account? Login</a>
      </div>
    </form>
  </div>
</template>
