<script lang="ts" setup>
import './assets/less/app.less';
import 'vue-final-modal/style.css';
import 'vue-toastification/dist/index.css';
import 'virtual:svg-icons-register';
import { ModalsContainer } from 'vue-final-modal';
import { CookieNameEnum } from './constants/enums/common';
import { TOKEN_MAX_AGE_SECONDS } from './constants/defaultValues/time';

const { locale, t } = useI18n();

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

</script>
<template>
	<ModalsContainer />
	<NuxtPage />
</template>

<style lang="less" scoped>
//
</style>
