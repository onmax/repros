<script setup lang="ts">
const { user } = useUserSession()
const adminData = ref<any>(null)
const error = ref('')

async function testAdminAccess() {
  error.value = ''
  try {
    const data = await $fetch('/api/admin/test')
    adminData.value = data
  } catch (e: any) {
    error.value = e.statusMessage || 'Access denied'
  }
}

onMounted(() => testAdminAccess())
</script>

<template>
  <div>
    <h1>Admin Page</h1>
    <p>User: {{ user?.name || user?.email }}</p>
    <p>Role: {{ user?.role }}</p>

    <div v-if="error" style="color: red">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="adminData">
      <p style="color: green">{{ adminData.message }}</p>
      <pre>{{ adminData.user }}</pre>
    </div>
  </div>
</template>
