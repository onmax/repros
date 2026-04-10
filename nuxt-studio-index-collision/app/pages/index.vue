<script setup lang="ts">
const page = await queryCollection('marketing').path('/').first()

if (!page) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Marketing index page not found',
  })
}
</script>

<template>
  <main>
    <h1>Root Page</h1>
    <p>This route renders `content/index.md` from the root collection.</p>
    <ContentRenderer :value="page" />
  </main>
</template>
