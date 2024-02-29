<script setup lang="ts">
import { useUserStore } from '~/stores/user.store';
import { getUserName } from '~/utils/user';
import { RoutePathEnum } from '~/constants/enums/route';
import { SeoItempropUserEnum, SeoItemTypeEnum } from '~/constants/enums/seo';
import { CookieNameEnum } from '~/constants/enums/common';

definePageMeta({
	layout: 'profile'
});

const { t } = useI18n();
const localePath = useLocalePath();
const mobile = inject('mobile');

getMeta({
	title: t('meta.user.info.title'),
	description: t('meta.user.info.description')
});

const userStore = useUserStore();
const tokenCookie = useCookie<string | null>(CookieNameEnum.TOKEN);
const userCookie = useCookie(CookieNameEnum.TG_USER);

const userData = computed(() => userStore.userInfo);

const logout = () => {
	tokenCookie.value = null;
	userCookie.value = null;
	userStore.$patch({ userInfo: null });
};

// const isGoBack = computed(() => {

// })
</script>

<template>
	<main
		class="user-page"
		itemscope
		:itemtype="SeoItemTypeEnum.USER"
	>
		<div class="sidebar">
			<UserProfileInfo />
			<UserNavigationMenu v-if="!mobile" />
		</div>

		<NuxtPage />
	</main>
</template>

<style scoped lang="less">
.user-page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	height: 100%;
	min-height: calc(100vh - var(--header-height));
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	padding-bottom: 30px;
	margin-bottom: auto;

	//Для адаптивной height на iOs
	@supports (-webkit-touch-callout: none) {
		min-height: -webkit-fill-available;
	}

	@media (min-width: 768px) {
		min-height: unset;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: unset;
	}

	&__wrapper {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;
		padding-top: 18px;

		@media (min-width: 768px) {
			width: 40%;
			margin-right: 30px;
		}

		@media (min-width: 1440px) {
			width: 32%;
			padding-top: 44px;
		}
	}
	.sidebar {
	}
}
</style>
