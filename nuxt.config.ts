import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@nuxt/image', '@primevue/nuxt-module'],
    css: ['@/assets/scss/style.scss'],
    app: {
        baseURL: process.env.NUXT_APP_BASE_URL || '/',
        head: {
            link: [
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: `${process.env.NUXT_APP_BASE_URL || '/'}favicon.ico`,
                },
            ],
        },
    },
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
            @import "@/assets/scss/main.scss";
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
