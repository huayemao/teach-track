// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@element-plus/nuxt", "@vueuse/nuxt"],
  vite: {
    define: {
      "process.env": process.env,
      "process.client": process.client,
      "process.server": process.server,
    },
  },
  css: ["@/assets/css/tailwind.css"],
  ssr: false,
  extends: ["@shuriken-ui/nuxt"],
});
