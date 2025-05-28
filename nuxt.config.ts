// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/image"],
  css: ["@/assets/scss/style.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "./assets/scss/variables.scss" as *;
          `,
        },
      },
    },
  },
});
