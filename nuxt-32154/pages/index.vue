<script setup lang="ts">
const { data } = await useAsyncData('test', () => Promise.resolve({ foo: 'bar' }))
</script>

<template>
  <div>
    <h1>Home</h1>
    <!-- Wrapping v-once data in component triggers the bug -->
    <DataDisplay :data="data" />
    <br>
    <NuxtLink to="/cart" id="to-cart">Go to Cart</NuxtLink>
  </div>
</template>
