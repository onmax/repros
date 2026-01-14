<script setup lang="ts">
const { data } = await useAsyncData('test', () => Promise.resolve({ foo: 'bar' }))
</script>

<template>
  <div>
    <h1>Home</h1>
    <!-- v-once with slot content triggers the bug (not props) -->
    <DataDisplay v-once>
      <div>{{ data?.foo }}</div>
    </DataDisplay>
    <NuxtLink to="/cart" id="to-cart">Go to Cart</NuxtLink>
  </div>
</template>
