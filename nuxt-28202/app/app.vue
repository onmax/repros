<script setup lang="ts">
const error = createError({
  cause: new Error('root cause'),
})

if (error.cause?.message !== 'root cause') {
  throw new Error('createError lost cause before rendering')
}

throw error
</script>
