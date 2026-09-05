<script setup lang="ts">
useHead({ title: 'Home' })

async function go() {
  await navigateTo('/target')
  console.log('document.title after navigateTo:', document.title)
}
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <button @click="go">Go to Target (await navigateTo)</button>
  </div>
</template>
