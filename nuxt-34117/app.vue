<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
export default defineNuxtComponent({
  asyncData: () => ({ count: 0 }),
  methods: {
    increment() { this.count++ }
  }
})
</script>
