import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@nuxt/image', '@primevue/nuxt-module'],
    css: ['@/assets/scss/style.scss'],
    build: {
        transpile: ['@vueform/slider'],
    },
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
            apiProductsEndpoint: process.env.NUXT_PUBLIC_API_PRODUCTS_ENDPOINT,
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
            @use "@/assets/scss/variables.scss" as *;
            @use "@/assets/scss/mixins.scss" as *;
            @use "@/assets/scss/placeholders.scss" as *;
          `,
                },
            },
        },
    },
    components: [
        {
            path: '~/components/icons',
            pathPrefix: false,
        },
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    primevue: {
        components: {
            include: ['Dropdown'],
        },
    },
})
