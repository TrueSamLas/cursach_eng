// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-31',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase'],
  supabase: {
	redirect: false,
	},
})