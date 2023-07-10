<script lang="ts" setup>
import './assets/less/app.less';
import 'vue-final-modal/style.css';
import 'vue-toastification/dist/index.css';
import 'virtual:svg-icons-register';
import { ModalsContainer } from 'vue-final-modal';
import { isDevelopmentMode } from './constants/common';

const { locale, t } = useI18n();

useHead({
	//TODO доработать метаданные
	title: t('meta.title'),
	meta: [{ name: 'description', content: 'Афиша Peredelano' }],
	htmlAttrs: {
		lang: locale.value
	}
});

if (isDevelopmentMode) {
	const tokenCookie = useCookie<string>('token');
	tokenCookie.value ??= 'blablabla';
}
</script>
<template>
	<HeaderCommon />
	<main class="main">
		<ModalsContainer />
		<NuxtPage />
	</main>
</template>

<style lang="less" scoped>
.main {
	height: 100%;
	padding-top: var(--header-height);
}
</style>
