<script lang="ts" setup>
import './assets/less/app.less';
import 'vue-final-modal/style.css';
import 'vue-toastification/dist/index.css';
import { ModalsContainer } from 'vue-final-modal';
import { CookieNameEnum, LocalStorageEnum } from './constants/enums/common';
import { TOKEN_MAX_AGE_SECONDS } from './constants/defaultValues/time';
import type { ComputedRef } from 'vue';
import { getRouteName } from './utils';

const { locale, locales, t } = useI18n();

const viewport = useViewport();

const mobile = computed(() => viewport.isLessThan('tablet'));
const tablet = computed(
	() => viewport.isGreaterOrEquals('tablet') && viewport.isLessThan('desktop')
);
const desktop = computed(() => viewport.isGreaterOrEquals('desktop'));

const config = useRuntimeConfig();

//Set weserv baseUrl to current environment baseUrl
const img = useImage();
img.options.providers.weserv.defaults.baseURL = config.public.baseUrl;

provide('mobile', mobile as ComputedRef<boolean>);
provide('tablet', tablet as ComputedRef<boolean>);
provide('desktop', desktop as ComputedRef<boolean>);
const route = useRoute();

const getPath = (path: string) => {
	const localeLength = locale.value.length;
	return path.slice(localeLength + 1);
};

const langRefs = locales.value.map((it) => ({
	rel: 'alternate',
	hreflang: it.code,
	href: `https://${config.public.domain}/${it.code}${getPath(route.path)}`
}));
useHead({
	link: [
		{
			rel: 'icon',
			type: 'image/ico',
			href: '/favicon.ico'
		},
		{
			rel: 'alternate',
			hreflang: 'x-default',
			href: `https://${config.public.domain}/ru${getPath(route.path)}`
		},
		...langRefs
	],
	title: `${t('meta.default_title.first')} | ${t('meta.default_title.second')}`,
	meta: [
		{
			name: 'keywords',
			content: t('meta.default_keywords')
		},
		{
			name: 'description',
			content: t('meta.default_description')
		},
		// viewport-fit=cover - фикс для IPhone - убирает рамки при горизонтальном просмотре
		{ name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }
	],
	htmlAttrs: {
		lang: () => locale.value
	}
});

if (process.client) {
	const { gtag } = useGtag();
	const pageTitle = getRouteName(route.name as string);
	gtag('event', 'page_view', {
		page_title: pageTitle
	});
}

useCookie(CookieNameEnum.LOCALE, { maxAge: TOKEN_MAX_AGE_SECONDS }).value = locale.value;

//TODO ALL_TIMEZONES перенесены в sessionStorage, ниже функция для очистки их в localStorage у пользователей
onMounted(() => localStorage.removeItem(LocalStorageEnum.TIMEZONES));
</script>
<template>
	<NuxtLayout>
		<ModalsContainer />
		<NuxtPage />
	</NuxtLayout>
</template>

<style lang="less" scoped>
//
</style>
