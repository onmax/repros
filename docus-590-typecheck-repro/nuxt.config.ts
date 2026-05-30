import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  extends: ["docus"],
  site: {
    name: "Docus Typecheck Repro",
    url: "https://example.com"
  },
  devtools: {
    enabled: false
  }
});
