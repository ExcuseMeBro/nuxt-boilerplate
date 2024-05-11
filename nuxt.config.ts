// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
      enabled: true,

      timeline: {
        enabled: true,
      },
    },
    css: ['~/assets/css/main.css'],
    modules: ['@nuxt/ui', '@nuxtjs/color-mode', "@nuxtjs/eslint-module", "@nuxt/eslint"],
    plugins: [],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        public: {
            baseURL: process.env.NUXT_PUBLIC_API_URL || 'https://api.example.com/',
        },
    },
})