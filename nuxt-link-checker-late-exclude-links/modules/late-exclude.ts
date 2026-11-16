import { defineNuxtModule } from 'nuxt/kit'

// A module that can only list its excludes once the app's route rules are final.
export default defineNuxtModule({
  setup(_, nuxt) {
    nuxt.hook('modules:done', () => {
      const options = nuxt.options as { linkChecker?: { excludeLinks?: (string | RegExp)[] } }
      options.linkChecker ??= {}
      options.linkChecker.excludeLinks = [...options.linkChecker.excludeLinks ?? [], '/Excluded-By-Module']
    })
  },
})
