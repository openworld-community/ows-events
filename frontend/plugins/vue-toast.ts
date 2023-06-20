import Toast, { type PluginOptions } from 'vue-toastification';
import { useToast } from 'vue-toastification';

export default defineNuxtPlugin((nuxtApp) => {
	const options: PluginOptions = {};
	nuxtApp.vueApp.use(Toast, options);
	const errorToast = useToast();

	return { provide: { useToast, errorToast } };
});
