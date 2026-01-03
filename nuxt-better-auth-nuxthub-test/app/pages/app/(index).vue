<script setup lang="ts">
const { user, signOut } = useUserSession()
const content = ref('')
const testData = ref<any[]>([])
const loading = ref(false)
const error = ref('')

async function loadData() {
  try {
    const data = await $fetch('/api/test-data')
    testData.value = data
  } catch (e: any) {
    error.value = 'Failed to load data'
  }
}

async function saveData() {
  if (!content.value) return
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/test-data', {
      method: 'POST',
      body: { content: content.value }
    })
    content.value = ''
    await loadData()
  } catch (e: any) {
    error.value = 'Failed to save data'
  } finally {
    loading.value = false
  }
}

async function handleLogout() {
  await signOut()
  await navigateTo('/')
}

onMounted(() => loadData())
</script>

<template>
  <div>
    <h1>Protected App Page</h1>
    <p>Welcome {{ user?.name || user?.email }}!</p>
    <p>Role: {{ user?.role }}</p>
    <button @click="handleLogout">Logout</button>

    <h2>Test NuxtHub Database</h2>
    <form @submit.prevent="saveData">
      <input v-model="content" placeholder="Enter some data" required>
      <button type="submit" :disabled="loading">{{ loading ? 'Saving...' : 'Save' }}</button>
    </form>
    <p v-if="error" style="color: red">{{ error }}</p>

    <h3>Your Data:</h3>
    <ul>
      <li v-for="item in testData" :key="item.id">
        {{ item.content }} ({{ new Date(item.createdAt).toLocaleString() }})
      </li>
    </ul>
  </div>
</template>
