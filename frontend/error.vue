<script setup lang="ts">
import type { NuxtError } from '#app';
import { RoutePathEnum } from '~/constants/enums/route';
import { CookieNameEnum } from './constants/enums/common';
import Error404 from './components/error/Error404.vue';

const langCookie = useCookie(CookieNameEnum.LOCALE);
const localePath = useLocalePath();
const langCookieValue = langCookie.value ?? 'ru';
const homepath = '/' + langCookieValue;
console.log(homepath);

const props = defineProps({
	error: Object as () => NuxtError
});

const handleError = () => clearError({ redirect: localePath(RoutePathEnum.HOME, langCookieValue) });

const $i18n = useI18n();
onMounted(() => {
	$i18n.setLocale(langCookieValue);
});
</script>
<template>
	<NuxtLayout>
		<div class="service-error">
			<template v-if="error.statusCode === 404">
				<Error404 />
			</template>
			<template v-else> ERROR 500 HERE </template>
			<div class="go-home-wrapper">
				<!-- <button
					@click="handleError"
					class="go-home"
					tabindex="0"
				>
					{{ $t('errors.ERROR_PAGE_GO_HOME') }}
				</button> -->
				<a
					@click="handleError"
					class="go-home"
					tabindex="0"
					:href="homepath"
					>{{ $t('errors.ERROR_PAGE_GO_HOME') }}</a
				>
			</div>
			<!-- <a :href=homepath>{{ $t('errors.ERROR_PAGE_GO_HOME') }}</a> -->
		</div>
	</NuxtLayout>
</template>
<style scoped lang="less">
.service-error {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.go-home-wrapper {
	padding: 40px;
}
.go-home {
	color: var(--color-accent-green-main);
	font-weight: 500;
	text-decoration: underline;
	padding: 5px 5px 8px 5px;
	border-radius: 10px;

	&:focus {
		outline: none;
		box-shadow: 0 0 5px var(--color-accent-green-main);
	}
}
</style>
