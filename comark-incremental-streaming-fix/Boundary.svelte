<script>
  let { component: Component, ...props } = $props()
</script>

<svelte:boundary>
  <Component {...props} />
  {#snippet pending()}<p>Loading</p>{/snippet}
  {#snippet failed(error)}<p role="alert">{String(error)}</p>{/snippet}
</svelte:boundary>
