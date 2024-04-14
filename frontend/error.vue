<script setup lang="ts">
import type { NuxtError } from '#app';
// import { RoutePathEnum } from '~/constants/enums/route';
// const localePath = useLocalePath();
import { CookieNameEnum } from './constants/enums/common';
import Error404 from './components/error/Error404.vue';
import Error500 from './components/error/Error500.vue';

const langCookie = useCookie(CookieNameEnum.LOCALE);
const langCookieValue = langCookie.value ?? 'ru';
const homepath = '/' + langCookieValue;

const props = defineProps({
	error: {
		type: Object as () => NuxtError,
		default: () => ({
			statusCode: 404,
			message: '',
			data: ''
		})
	}
});
// если работаем с линком то хендлер не нужен. что скажете какой вариант оставить?
// const handleError = () => clearError({ redirect: localePath(RoutePathEnum.HOME, langCookieValue) });

const $i18n = useI18n();
onMounted(() => {
	$i18n.setLocale(langCookieValue);
});
const resultMessage = computed(() => {
	if (typeof error?.data === 'string') {
		return error.data;
	} else {
		return '';
	}
});
</script>
<template>
	<NuxtLayout>
		<div class="service-error">
			<template v-if="props.error.statusCode === 404">
				<Error404 :message="resultMessage" />
			</template>
			<template v-else>
				<Error500 />
			</template>
			<div class="error-go-home-wrapper">
				<!-- РЕАЛИЗАЦИЯ С ХЕНДЛЕРОМ -->
				<!--  <button
					@click="handleError"
					class="go-home"
					tabindex="0"
				>
					{{ $t('errors.ERROR_PAGE_GO_HOME') }}
				</button> -->
				<NuxtLink
					class="error-go-home"
					tabindex="0"
					:to="homepath"
				>
					{{ $t('errors.ERROR_PAGE_GO_HOME') }}
				</NuxtLink>
			</div>
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
.error-go-home-wrapper {
	padding: 40px;
}
.error-go-home {
	color: var(--color-accent-green-main);
	font-weight: 400;
	font-size: 24px;
	text-decoration: underline;
	padding: 5px 5px 8px 5px;
	border-radius: 10px;
	@media (max-width: 768px) {
		font-size: 16px;
	}

	&:focus {
		outline: none;
		box-shadow: 0 0 5px var(--color-accent-green-main);
	}
}
</style>
