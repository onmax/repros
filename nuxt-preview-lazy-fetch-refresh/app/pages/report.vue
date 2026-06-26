<script setup lang="ts">
type Row = {
  request: number
  criteria: string[]
  at: string
}

const route = useRoute()
const isChildRoute = computed(() => route.matched.length > 1)

const criteria = ref<string[]>(['initial-criterion'])
const interval = ref<'month' | 'week'>('month')
const sortMode = ref<'created' | 'updated'>('created')

const body = computed(() => ({
  ownerId: 1,
  mode: 'preview-refresh-repro',
  from: '2026-01-01',
  to: '2026-12-31',
  interval: interval.value,
  groupBy: 'month',
  sortMode: sortMode.value,
  criteria: criteria.value,
}))

const { data: rowData, status } = await useLazyFetch<Row[]>('/api/report', {
  method: 'POST',
  body,
  onRequest(ctx) {
    console.groupCollapsed('[useLazyFetch] REQUEST')
    console.log('url', ctx.request)
    console.log('body', body.value)
    console.trace()
    console.groupEnd()
  },
  default: () => [],
})

function onUpdateCriteria(nextCriteria: string[]) {
  criteria.value = nextCriteria
}
</script>

<template>
  <div>
    <NuxtPage v-if="isChildRoute" />

    <main v-show="!isChildRoute">
      <h1>Report parent route</h1>

      <p>Status: {{ status }}</p>
      <p>Criteria: {{ criteria.join(', ') }}</p>

      <NoisyControls @update-criteria="onUpdateCriteria" />

      <p>
        <NuxtLink to="/report/child">
          Leave visible page
        </NuxtLink>
      </p>

      <pre>{{ rowData }}</pre>
    </main>
  </div>
</template>
