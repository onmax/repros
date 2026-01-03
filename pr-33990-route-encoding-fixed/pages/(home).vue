<script setup lang="ts">
const routes = [
  { name: 'Route with ç', path: '/prerender/ç' },
  { name: 'Route with 测试', path: '/测试' },
  { name: 'Route with colon خاص:جديد', path: '/خاص:جديد' },
  { name: 'Route with &', path: '/non-ascii/a&b' },
  { name: 'Route with backslash', path: '/non-ascii/a\\b' }
]
</script>

<template>
  <div>
    <h1>PR #33990 Test - Special Character Routes</h1>
    <p>Click links to test navigation to routes with special characters:</p>
    <ul>
      <li v-for="route in routes" :key="route.path">
        <NuxtLink :to="route.path">{{ route.name }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
