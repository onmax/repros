<template>
  <h1>List</h1>
  <div v-for="i in 100" :key="i" style="height: 50px">
    <RouterLink :to="`/items/${i}`">Item {{ i }}</RouterLink>
  </div>
</template>
