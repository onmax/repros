<template>
  <div>
    <h1>Multiple Client Components Test (#30767 regression check)</h1>
    <p>Each counter should be independent and teleport to correct location.</p>
    
    <div style="display: flex; gap: 2rem; margin: 2rem 0;">
      <div style="border: 1px solid blue; padding: 1rem;">
        <h3>First</h3>
        <Counter id="A" nuxt-client />
      </div>
      
      <div style="border: 1px solid green; padding: 1rem;">
        <h3>Second</h3>
        <Counter id="B" nuxt-client />
      </div>
      
      <div style="border: 1px solid red; padding: 1rem;">
        <h3>Third</h3>
        <Counter id="C" nuxt-client />
      </div>
    </div>
    
    <p><strong>Test:</strong></p>
    <ol>
      <li>Click each + button - counters should increment independently</li>
      <li>Navigate to About, then back to Multi</li>
      <li>Each counter should reset to 0 and still work independently</li>
      <li>No counter should appear in wrong box</li>
    </ol>
  </div>
</template>
