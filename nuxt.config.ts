import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,
  target: "static",
  app: {
    head: {
      title: "Gofer | Campus food delivery, by students, for students.",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { 
          name: "description", 
          content: "Campus food delivery, by students, for students." 
        },
        { name: "author", content: "Gofer" },
        
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://Gofer.africa/' },
        { property: 'og:title', content: 'Gofer | Campus food delivery, by students, for students.' },
        { 
          property: 'og:description', 
          content: 'Campus food delivery, by students, for students.' 
        },
        { property: 'og:image', content: 'https://Gofer.africa/icon.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        
        // Twitter
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://Gofer.africa/' },
        { property: 'twitter:title', content: 'Gofer | Campus food delivery, by students, for students.' },
        { 
          property: 'twitter:description', 
          content: 'Campus food delivery, by students, for students.' 
        },
        { property: 'twitter:image', content: 'https://Gofer.africa/icon.png' }
      ],
      link: [
        { rel: 'canonical', href: 'https://gofer.africa/' },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Lexend+Tera:wght@100..900&family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap'
        }
      ]
    },
    pageTransition: { 
      name: 'page', 
      mode: 'out-in'
    }
  },
  
  build: {
    transpile: ['vuedraggable', 'marked', 'dompurify', 'lucide-vue-next']
  },
  
  // Remove problematic modules and keep only essential ones
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
  ],
  
  css: ["/assets/css/main.css"],

  tailwindcss: {
    cssPath: "@/assets/css/main.css",
  },

    plugins: ["@/plugins/aos.client.ts"],
  
  transpile: [
    '@vueuse/motion'
  ],

  axios: {
    timeout: 10000,
  },
  
  // Set public runtime config
  runtimeConfig: {
    public: {
      siteUrl: 'https://Gofer.africa',
    }
  },

  // Disable prerendering to avoid the SSR errors
  nitro: {
    prerender: {
      enabled: false
    }
  },

  compatibilityDate: "2025-02-01",
});