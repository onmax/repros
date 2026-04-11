import routeRulesMatcher from '#build/route-rules.mjs'

const app = document.querySelector('#app')
app.textContent = JSON.stringify(routeRulesMatcher('/'))
