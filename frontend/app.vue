<script lang="ts" setup>
import './assets/less/app.less';
import 'vue-final-modal/style.css';
import 'vue-toastification/dist/index.css';
import 'virtual:svg-icons-register';
import { ModalsContainer } from 'vue-final-modal';
import { isDevelopmentMode } from './constants/common';

const { translate } = useTranslation();
useHead({
	//TODO доработать метаданные
	title: translate('meta.title'),
	meta: [{ name: 'Афиша переделано', content: 'Это площадка для поиска мероприятий' }]
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
