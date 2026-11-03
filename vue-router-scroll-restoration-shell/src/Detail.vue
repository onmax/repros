<template>
  <h1>Item {{ $route.params.id }}</h1>
  <p v-for="i in 5" :key="i" style="height: 50px">Line {{ i }}</p>
</template>
