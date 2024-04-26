import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';
import { searchForWorkspaceRoot } from 'vite';
import { VITE_GOOGLE_OAUTH_KEY } from './constants/url';

const isTest = import.meta.env.VITE_STAGE == 'test' || process.env.VITE_STAGE == 'test';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {
		enabled: isTest
	},
	build: {
		analyze: isTest
	},
	logLevel: isTest ? 'verbose' : 'info',
	debug: isTest,
	modules: [
		'nuxt-icons',
		'nuxt-vue3-google-signin',
		'@nuxtjs/i18n',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'nuxt-gtag',
		'radix-vue/nuxt',
		'@nuxtjs/robots',
		[
			'nuxt-viewport',
			{
				breakpoints: {
					mobile: 375,
					tablet: 768,
					desktop: 1440
				}
			}
		]
	],
	routeRules: {
		'/': { redirect: '/ru', ssr: true }
	},
	i18n: {
		debug: false,
		locales: [
			{ code: 'ru', name: 'Russian', iso: 'ru-RU', dir: 'ltr', file: 'ru-RU.json' },
			{ code: 'en', name: 'English', iso: 'en-GB', dir: 'ltr', file: 'en-GB.json' }
		],
		lazy: true,
		langDir: '.nuxt/i18n',
		strategy: 'prefix',
		//
		defaultLocale: 'ru',
		detectBrowserLanguage: false,
		vueI18n: './i18n.config.ts'
	},
	// https://nuxt.com/modules/gtag
	gtag: {
		id: import.meta.env.VITE_GTAG_ID || process.env.VITE_GTAG_ID || ''
	},
	// На случай добавления скриптов:
	// app: {
	// 	head: {
	// 		script: [
	// 			{
	// 				async: true,
	// 				src: `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GTAG_ID || process.env.VITE_GTAG_ID || ''}`
	// 			},
	// 			{
	// 				children: `window.dataLayer = window.dataLayer || [];
	// 							function gtag(){dataLayer.push(arguments);}
	// 							gtag('js', new Date());
	// 							gtag('config', ${import.meta.env.VITE_GTAG_ID || process.env.VITE_GTAG_ID || ''});`,
	// 			}
	// 		]
	// 	}
	// },
	typescript: { strict: false },
	nitro: {
		devProxy: {
			'/api': 'http://backend:7080/api',
			'/image': 'http://backend:7080/image'
		}
	},
	vite: {
		server: {
			watch: {
				usePolling: true
			},
			hmr: {
				// нужно пока комментить, если фронт не через докер
				protocol: 'ws',
				clientPort: 80
			},
			fs: {
				allow: [searchForWorkspaceRoot(process.cwd()), '/app/common']
			}
		},
		plugins: [
			// плагин выдает ошибку из-за компонента /node_modules/nuxt/dist/app/components/nuxt-root.vue
			// убрал пока не пойму нужен ли он вообще на самом деле
			// vue(),
			vueJsx()
		],
		logLevel: isTest ? 'info' : 'warn',
		resolve: { alias: { '@common': fileURLToPath(new URL('../common', import.meta.url)) } }
	},
	// watcher:
	// на винде очень долго стартует дев-сервер, проблема недавняя
	// один из авторов Нукста на ГХ посоветовал такое решение
	// если у кого-то от этой настройки наоборот что-то ломается, то скажите - что-нибудь придумаем
	// appManifest:
	// Почему-то при билде накст генерит разные buildId для appManifest и entry, пробую отключить
	// (могут сломаться редиректы по языкам)
	experimental: { watcher: 'chokidar', appManifest: false },
	googleSignIn: {
		clientId: VITE_GOOGLE_OAUTH_KEY
	},
	app: {
		head: {
			link: [
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap'
				}
			]
		}
	}
});
