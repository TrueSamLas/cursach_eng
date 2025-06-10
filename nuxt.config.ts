// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
		head: {
			title: 'AlphaBet',
			viewport: 'width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
			meta: [
				{ name: 'theme-color', content: '#ff8800' },
			],
			link: [
				{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
				{ rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
				{ rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { rel: 'icon', href: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			],
		},
	},
  compatibilityDate: '2025-01-31',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/supabase',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
  ],
  css: ['~/styles/main.css'],
  supabase: {
    redirect: false,
  },
  pwa: {
		registerType: 'autoUpdate',
		client: {
			installPrompt: true,
			periodicSyncForUpdates: 3600,
		},
		manifest: {
			name: 'AlphaBet',
			short_name: 'AlphaBet',
			description: 'Индивидуальный словарь с играми и тренировками для запоминания слов и выражений',
			start_url: '/',
			display: 'standalone',
			theme_color: '#ff8800',
			background_color: '#ffffff',
			icons: [
				{
					src: '/pwa-192x192.png',
					sizes: '192x192',
					type: 'image/png',
					purpose: 'any',
				},
				{
					src: '/pwa-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'any',
				},
				{
					src: '/pwa-maskable-192x192.png',
					sizes: '192x192',
					type: 'image/png',
					purpose: 'maskable',
				},
				{
					src: '/pwa-maskable-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'maskable',
				},
			],
		},
		workbox: {
			navigateFallback: null,
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
		},
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
		// devOptions: {
		// 	enabled: true,
		// 	suppressWarnings: true,
		// 	type: 'module',
		// },
	},
})