<script setup lang="ts">
import { RouteNameEnum, RoutePathEnum } from '../../constants/enums/route';
import { getRouteName } from '../../utils';

const route = useRoute();

const localePath = useLocalePath();

const { t } = useI18n();

const titleOnMobile = computed(() => {
	if (getRouteName(route.path).includes(RoutePathEnum.USER_MY_EVENTS)) {
		return t('user.my_events.title');
	}
	if (getRouteName(route.path).includes(RoutePathEnum.USER_FAVOURITES)) {
		return t('user.favourites.title');
	}
	if (getRouteName(route.path).includes(RoutePathEnum.USER_PROFILE)) {
		return t('user.profile.title');
	}
	return '';
});

const isShowBackButton = computed(() => {
	const result =
		getRouteName(route.path).includes(RoutePathEnum.USER_MY_EVENTS) ||
		getRouteName(route.path).includes(RoutePathEnum.USER_FAVOURITES) ||
		getRouteName(route.path).includes(RoutePathEnum.USER_PROFILE);
	return result;
});

const goBack = () => {
	// if (router.options.history.state.back) {
	// 	router.back();
	// }
	if (
		getRouteName(route.name as string).includes(RouteNameEnum.USER_FAVOURITES) ||
		getRouteName(route.name as string).includes(RouteNameEnum.USER_MY_EVENTS) ||
		getRouteName(route.name as string).includes(RouteNameEnum.USER_PROFILE)
	) {
		navigateTo(localePath({ path: RoutePathEnum.USER_PAGE }));
	} else {
		navigateTo(localePath({ path: RoutePathEnum.HOME }));
	}
};
</script>

<template>
	<HeaderUiWrapper>
		<template #left>
			<CommonButton
				v-if="isShowBackButton"
				is-icon
				icon-name="back"
				button-kind="ordinary"
				:alt="$t('global.button.back')"
				@click="goBack"
			/>
			<HeaderUiLogo v-else />
		</template>
		<template #center>
			<h1
				v-if="titleOnMobile"
				class="header__title"
			>
				{{ titleOnMobile }}
			</h1>
		</template>

		<template #right>
			<HeaderLanguageSelector />
			<HeaderNavigationMobile />
		</template>
	</HeaderUiWrapper>
</template>

<style scoped lang="less">
.header {
	&__title {
		font-size: var(--font-size-ML);
		font-weight: var(--font-weight-regular);
	}
}
</style>
