import vueJsx from '@vitejs/plugin-vue-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import { fileURLToPath, URL } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/plausible'],
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
		domain: 'poster-peredelano.orby-tech.space',
		apiHost: 'http://metrics.orby-tech.space/js/script.js'
	},
	typescript: { strict: true },
	vite: {
		server: {
			watch: {
				usePolling: true
			}
		},
		plugins: [
			// плагин выдает ошибку из-за компонента /node_modules/nuxt/dist/app/components/nuxt-root.vue
			// убрал пока не пойму нужен ли он вообще на самом деле
			// vue(),
			vueJsx(),
			createSvgIconsPlugin({
				iconDirs: [path.resolve(process.cwd(), 'assets/img/icon')],
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
