<template>
  <div>
    <h1>Page: a:b (colon)</h1>
    <p>Route path: {{ $route.path }}</p>
    <p>Current URL: {{ url }}</p>
    <nav>
      <NuxtLink to="/">Home</NuxtLink> |
      <NuxtLink to="/ç">ç</NuxtLink> |
      <NuxtLink to="/文档">文档</NuxtLink> |
      <NuxtLink to="/a:b">a:b</NuxtLink> |
      <NuxtLink to="/a&b">a&b</NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
const url = ref('')
onMounted(() => {
  url.value = window.location.href
})
</script>
