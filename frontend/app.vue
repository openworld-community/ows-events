<script lang="ts" setup>
import './assets/less/app.less';
import 'vue-final-modal/style.css';
import 'vue-toastification/dist/index.css';
import 'virtual:svg-icons-register';
import { ModalsContainer } from 'vue-final-modal';
import { RouteNameEnum } from './constants/enums/route';
import { CookieNameEnum } from './constants/enums/common';
import { TOKEN_MAX_AGE_SECONDS } from './constants/defaultValues/time';
import { isDevelopmentMode } from './constants/common';

const { locale, t } = useI18n();

const route = useRoute();

const viewport = useViewport();

const mobile = computed(() => viewport.isLessThan('tablet'));
const tablet = computed(
	() => viewport.isGreaterOrEquals('tablet') || viewport.isLessThan('desktop')
);
const desktop = computed(() => viewport.isGreaterOrEquals('desktop'));

provide('mobile', mobile);
provide('tablet', tablet);
provide('desktop', desktop);

useHead({
	title: t('meta.default_title'),
	meta: [
		{ name: 'description', content: t('meta.default_description') },
		// viewport-fit=cover - фикс для IPhone - убирает рамки при горизонтальном просмотре
		{ name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }
	],
	htmlAttrs: {
		lang: () => locale.value
	}
});

useCookie(CookieNameEnum.LOCALE, { maxAge: TOKEN_MAX_AGE_SECONDS }).value = locale.value;

if (isDevelopmentMode) {
	useCookie(CookieNameEnum.TOKEN).value ??= 'blablabla';
}
</script>
<template>
	<div class="root">
		<HeaderCommon />
		<main class="main">
			<ModalsContainer />
			<NuxtPage />
		</main>
		<FooterCommon v-if="getRouteName(route.name as string) === RouteNameEnum.HOME || !mobile" />
	</div>
</template>

<style lang="less" scoped>
.main {
	padding-top: var(--header-height);

	@media (min-width: 768px) {
		padding-top: 30px;
	}

	@media (min-width: 1440px) {
		padding-top: 60px;
	}
}
</style>
