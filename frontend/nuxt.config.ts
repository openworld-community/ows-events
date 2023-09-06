import vueJsx from '@vitejs/plugin-vue-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import { fileURLToPath, URL } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/plausible'],
	routeRules: {
		'/': {redirect: '/ru'}
	},
	i18n: {
		// debug: true,
		experimental: {
			jsTsFormatResource: true
		},
		locales: [
			{ code: 'ru', name: 'Russian', iso: 'ru-RU', dir: 'ltr', file: 'ru-RU.ts' },
			{ code: 'en', name: 'English', iso: 'en-US', dir: 'ltr', file: 'en-GB.ts' }
		],
		lazy: true,
		langDir: 'i18n',
		strategy: 'prefix',
		//
		defaultLocale: 'ru',
		detectBrowserLanguage: false,
		vueI18n: './i18n.config.ts'
	},
	// На случай добавления скриптов:
	// app: {
	// 	head: {
	// 		script: [
	// 			{
	// 				defer: true,
	// 				'data-domain': 'poster-peredelano.orby-tech.space',
	// 				src: 'http://metrics.orby-tech.space/js/script.js'
	// 			}
	// 		]
	// 	}
	// },
	//https://github.com/nuxt-modules/plausible#module-options
	plausible: {
		domain:
			import.meta.env.VITE_DOMAIN ||
			process.env.VITE_DOMAIN ||
			'poster-test-peredelano.orby-tech.space',
		apiHost: 'https://afisha-metrics.orby-tech.space'
	},
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
				usePolling: true},
			// hmr: {
			// 	// нужно пока комментить, если фронт не через докер
			// 	protocol: 'ws',
			// 	clientPort: 24678
			// }
		},
		plugins: [
			// плагин выдает ошибку из-за компонента /node_modules/nuxt/dist/app/components/nuxt-root.vue
			// убрал пока не пойму нужен ли он вообще на самом деле
			// vue(),
			vueJsx(),
			createSvgIconsPlugin({
				iconDirs: [path.resolve(process.cwd(), 'assets/icon')],
				symbolId: '[name]',
				inject: 'body-first'
			})
		],
		resolve: { alias: { '@common': fileURLToPath(new URL('../common', import.meta.url)) } }
	},
	// на винде очень долго стартует дев-сервер, проблема недавняя
	// один из авторов Нукста на ГХ посоветовал такое решение
	// если у кого-то от этой настройки наоборот что-то ломается, то скажите - что-нибудь придумаем
	experimental: { watcher: 'chokidar' }
});
