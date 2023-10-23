<script lang="ts" setup>
import './assets/less/app.less';
import 'vue-final-modal/style.css';
import 'vue-toastification/dist/index.css';
import 'virtual:svg-icons-register';
import { ModalsContainer } from 'vue-final-modal';
import { CookieNameEnum } from './constants/enums/common';
import { TOKEN_MAX_AGE_SECONDS } from './constants/defaultValues/time';

const { locale, t } = useI18n();

useHead({
	title: t('meta.default_title'),
	meta: [{ name: 'description', content: t('meta.default_description') }],
	htmlAttrs: {
		lang: () => locale.value
	}
});

useCookie(CookieNameEnum.LOCALE, {maxAge: TOKEN_MAX_AGE_SECONDS}).value = locale.value

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