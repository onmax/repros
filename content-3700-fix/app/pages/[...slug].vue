<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, async () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta(page.value.seo)
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
</template>
