<script lang="ts" setup>
import './assets/less/app.less';
import 'vue-final-modal/style.css';
import 'vue-toastification/dist/index.css';
import 'virtual:svg-icons-register';
import { ModalsContainer } from 'vue-final-modal';
// import { isDevelopmentMode } from './constants/common';
import { useUserStore } from './stores/user.store';

const { locale, t } = useI18n();

useHead({
	title: t('meta.title'),
	meta: [{ name: 'description', content: t('meta.default_description') }],
	htmlAttrs: {
		lang: locale.value
	}
});

const userStore = useUserStore();

onBeforeMount(async () => {
	await userStore.getUserInfo();
})

// if (isDevelopmentMode) {
// 	tokenCookie.value ??= 'blablabla';
// }
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
