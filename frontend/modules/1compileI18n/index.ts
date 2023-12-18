import { createResolver, defineNuxtModule, addTemplate } from '@nuxt/kit';
import * as fs from 'fs/promises';
export default defineNuxtModule({
	meta: {
		// Usually the npm package name of your module
		name: '@il112/compileI18n',
		// The key in `nuxt.config` that holds your module options
		configKey: 'sample',
		// Compatibility constraints
		compatibility: {
			// Semver version of supported nuxt versions
			nuxt: '^3.0.0'
		}
	},
	hooks: {},
	async setup() {
		// @ts-ignore
		const { resolve } = createResolver(import.meta.url);
		const translationsDir = resolve('../../i18n/locales/');
		const locales = await fs.readdir(translationsDir);
		for (const localeDir of locales) {
			const localeFilesPath = resolve(translationsDir, localeDir);
			const localeFiles = await fs.readdir(localeFilesPath);
			const dataPromise = localeFiles.reduce(async (accum, fileName) => {
				const resolvedAccum = await accum;
				const filePath = resolve(localeFilesPath, fileName);
				const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
				const fileData = await import(filePath);
				return {
					...resolvedAccum,
					[fileNameWithoutExtension]: fileData
				};
			}, await {});
			const data = await dataPromise;
			addTemplate({
				filename: `i18n/${localeDir}.json`,
				getContents: () => JSON.stringify(data),
				write: true
			});
		}
	}
});
