<template>
  <div>
    <h1>better-auth-6613</h1>
    <p>POST /api/test to trigger bug</p>
    <button @click="test">Test</button>
    <pre>{{ result }}</pre>
  </div>
</template>

<script setup>
const result = ref('')
async function test() {
  result.value = await $fetch('/api/test', { method: 'POST' })
}
</script>
