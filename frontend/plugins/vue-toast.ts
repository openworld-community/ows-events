import Toast, { type PluginOptions } from 'vue-toastification';
import { useToast } from 'vue-toastification';
import ErrorToastVue from '~/components/common/ErrorToast.vue';

export default defineNuxtPlugin((nuxtApp) => {
	const options: PluginOptions = {};
	nuxtApp.vueApp.use(Toast, options);

	const useErrorToast = useToast();
	const errorToast = (errorMessage: string) => {
		return useErrorToast(
			{
				component: ErrorToastVue,
				props: { error: errorMessage }
			},
			{
				toastClassName: 'errorToast',
				icon: false,
				closeButton: false,
				timeout: false
			}
		);
	};

	return { provide: { useToast, errorToast } };
});
