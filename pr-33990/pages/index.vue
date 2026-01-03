<script setup lang="ts">
const router = useRouter()

const pages = [
  { name: 'Chinese (测试)', path: '/测试' },
  { name: 'French (ç)', path: '/ç' },
  { name: 'French (é)', path: '/é' },
  { name: 'Chinese (中文)', path: '/中文' },
  { name: 'Arabic with colon (خاص:جديد)', path: '/خاص:جديد' },
  { name: 'Ampersand (a&b)', path: '/a&b' },
  { name: 'Backslash (a\\b)', path: '/a\\b' }
]

const testNavigation = async (path: string) => {
  try {
    await router.push(path)
    console.log(`✓ Navigated to ${path}`)
  } catch (err) {
    console.error(`✗ Failed to navigate to ${path}:`, err)
  }
}
</script>

<template>
  <div style="padding: 2rem; font-family: system-ui">
    <h1>PR #33990 - Unicode Routes Test</h1>
    <p>Bug: Pages with unicode chars cause 404 on client navigation</p>

    <h2>Test Pages</h2>
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px">
      <div v-for="page in pages" :key="page.path" style="display: flex; gap: 1rem">
        <NuxtLink :to="page.path" style="flex: 1; padding: 0.5rem; border: 1px solid #ccc; text-decoration: none; color: blue">
          {{ page.name }}
        </NuxtLink>
        <a :href="page.path" target="_blank" style="padding: 0.5rem; border: 1px solid #ccc; text-decoration: none; color: green">
          Direct
        </a>
      </div>
    </div>

    <h3 style="margin-top: 2rem">Instructions</h3>
    <ol>
      <li>Click "Direct" links (SSR navigation) - should work</li>
      <li>Click page names (client navigation) - will 404 with bug</li>
      <li>Check browser console for navigation errors</li>
    </ol>
  </div>
</template>
