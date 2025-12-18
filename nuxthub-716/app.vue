<template>
  <div p-8>
    <h1 text-2xl font-bold mb-4>NuxtHub KV Test</h1>
    <form @submit.prevent="write" flex gap-2 mb-4>
      <input v-model="key" placeholder="key" border p-2 rounded />
      <input v-model="value" placeholder="value" border p-2 rounded />
      <button type="submit" bg-blue-500 text-white px-4 py-2 rounded>Write</button>
    </form>
    <form @submit.prevent="read" flex gap-2 mb-4>
      <input v-model="readKey" placeholder="key to read" border p-2 rounded />
      <button type="submit" bg-green-500 text-white px-4 py-2 rounded>Read</button>
    </form>
    <pre v-if="result" bg-gray-100 p-4 rounded>{{ result }}</pre>
  </div>
</template>

<script setup lang="ts">
const key = ref('')
const value = ref('')
const readKey = ref('')
const result = ref<any>(null)

async function write() {
  result.value = await $fetch(`/api/kv/${key.value}`, { method: 'POST', body: { value: value.value } })
}
async function read() {
  result.value = await $fetch(`/api/kv/${readKey.value}`)
}
</script>
