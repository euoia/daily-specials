// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["normalize.css/normalize.css", "~/app.scss"],
  app: {
    head: {
      style: ["@page { size: A5 }>"]
    }
  }
});
