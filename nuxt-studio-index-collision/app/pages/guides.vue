<script setup lang="ts">
const page = await queryCollection('guides').path('/guides').first()
const extraGuide = await queryCollection('guides').path('/guides/example').first()

if (!page) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Guides index page not found',
  })
}
</script>

<template>
  <main>
    <h1>Guides Page</h1>
    <p>This route renders `content/guides/index.md` from the prefixed collection.</p>
    <ContentRenderer :value="page" />
    <section v-if="extraGuide">
      <h2>Extra Guide</h2>
      <ContentRenderer :value="extraGuide" />
    </section>
  </main>
</template>
