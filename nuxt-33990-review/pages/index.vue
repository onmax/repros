<script setup>
const results = ref([])

const testCases = [
  { name: 'Chinese chars', path: '/测试', label: '测试' },
  { name: 'French chars', path: '/café', label: 'café' },
  { name: 'Latin c-cedilla', path: '/prerender/ç', label: 'ç' },
  { name: 'Chinese nested', path: '/文档/介绍', label: '文档/介绍' },
  { name: 'Arabic with colon', path: '/خاص:جديد', label: 'خاص:جديد' },
  { name: 'Ampersand', path: '/a&b', label: 'a&b' },
  { name: 'Backslash', path: '/a\\b', label: 'a\\b' },
  { name: 'Accented e', path: '/café/évènement', label: 'café/évènement' },
]

async function testNavigation(path) {
  try {
    await navigateTo(path)
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

onMounted(async () => {
  for (const test of testCases) {
    const result = await testNavigation(test.path)
    results.value.push({ ...test, ...result })
    await new Promise(resolve => setTimeout(resolve, 100))
  }
})
</script>

<template>
  <div style="padding: 2rem; font-family: monospace;">
    <h1>Nuxt PR #33990 - Unicode Route Test</h1>
    <p>Testing navigation to pages with unicode and special characters</p>

    <h2>Manual Navigation Links</h2>
    <ul>
      <li><NuxtLink to="/测试">Go to 测试 page</NuxtLink></li>
      <li><NuxtLink to="/café">Go to café page</NuxtLink></li>
      <li><NuxtLink to="/prerender/ç">Go to ç page</NuxtLink></li>
      <li><NuxtLink to="/文档/介绍">Go to 文档/介绍 page</NuxtLink></li>
      <li><NuxtLink to="/خاص:جديد">Go to خاص:جديد page</NuxtLink></li>
      <li><NuxtLink to="/a&b">Go to a&amp;b page</NuxtLink></li>
      <li><NuxtLink to="/a\b">Go to a\b page</NuxtLink></li>
      <li><NuxtLink to="/café/évènement">Go to café/évènement page</NuxtLink></li>
    </ul>

    <h2>Automated Test Results</h2>
    <div v-if="results.length === 0">Running tests...</div>
    <table v-else border="1" cellpadding="8" style="border-collapse: collapse;">
      <thead>
        <tr>
          <th>Test Case</th>
          <th>Path</th>
          <th>Status</th>
          <th>Error</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in results" :key="result.path">
          <td>{{ result.name }}</td>
          <td>{{ result.path }}</td>
          <td :style="{ color: result.success ? 'green' : 'red' }">
            {{ result.success ? '✓ PASS' : '✗ FAIL' }}
          </td>
          <td>{{ result.error || '-' }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Expected Behavior</h2>
    <p>All navigation should work without 404 errors</p>
  </div>
</template>
