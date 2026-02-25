import { createJiti } from "file:///Users/maxi/repros/nuxt-route-rules-ci-repro/node_modules/.pnpm/jiti@2.6.1/node_modules/jiti/lib/jiti.mjs";

const jiti = createJiti(import.meta.url, {
  "interopDefault": true,
  "alias": {
    "@nuxthub/core": "/Users/maxi/repros/nuxt-route-rules-ci-repro"
  },
  "transformOptions": {
    "babel": {
      "plugins": []
    }
  }
})

/** @type {import("/Users/maxi/repros/nuxt-route-rules-ci-repro/src/module.js")} */
const _module = await jiti.import("/Users/maxi/repros/nuxt-route-rules-ci-repro/src/module.ts");

export default _module?.default ?? _module;