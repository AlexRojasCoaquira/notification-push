// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  plugins: ['@/plugins/firebase'],
    vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  ssr: false,
})
