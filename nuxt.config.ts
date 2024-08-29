// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.VUE_APP_API_BASE_URL || 'http://localhost:8000',
    },
  },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },
});