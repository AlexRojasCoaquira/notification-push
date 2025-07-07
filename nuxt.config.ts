// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'icon', type: 'image/png', href: '/icons/crear.png' },
        { rel: 'apple-touch-icon', href: '/icons/crear.png' }
      ]
    }
  },
  modules: ['@vite-pwa/nuxt'],
  css: ['~/assets/css/main.css'],
  plugins: ['@/plugins/firebase'],
    vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  ssr: false,
})
