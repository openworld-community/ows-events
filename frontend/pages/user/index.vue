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
	<div class="user-content">
		<UserMobileNavigationMenu v-if="mobile">
			<UserAdditionalBlock v-if="mobile" />
		</UserMobileNavigationMenu>

		<UserAdditionalBlock v-if="!mobile" />
	</div>
</template>

<style scoped lang="less">
.user-content {
	width: 100%;
	height: 100%;
	@media (min-width: 768px) {
		flex-grow: 1;
		display: flex;
		justify-content: end;
	}
}
.user-page {
	display: flex;
	flex-direction: column;
	align-items: center;
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

	&__title {
		padding-top: 100px;
		font-size: var(--font-size-L);
		font-weight: var(--font-weight-regular);
	}

	&__logout-button {
		width: 100%;
		margin-top: auto;

		@media (min-width: 768px) {
			justify-content: flex-start;
			margin-top: unset;
			width: 226px;
		}

		@media (min-width: 1440px) {
			width: 250px;
		}
	}
}

.sidebar {
	width: 100%;
	height: 100%;
}

.link {
	display: flex;
	width: 100%;
	margin-bottom: 24px;

	@media (min-width: 768px) {
		flex-direction: column;
		margin-bottom: 0;
	}

	&__item {
		justify-content: flex-start;
		width: 226px;

		@media (min-width: 1440px) {
			width: 250px;
		}

		@media (max-width: 767px) {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 108px;
			background-color: var(--color-background-secondary);
			border: 1px solid var(--color-background-secondary);
			border-radius: 8px;

			transition-property: background-color, border-color;
			transition-duration: 0.3s;
			transition-timing-function: ease;

			&:deep(.button__content) {
				font-size: var(--font-size-S);
			}

			&:not(:last-child) {
				margin-right: var(--padding-side);

				@media (min-width: 768px) {
					margin-right: 0;
				}
			}

			&:deep(svg) {
				color: var(--color-accent-green-main);
				width: 32px;
				height: 32px;
				margin-bottom: 8px;
			}

			&:hover,
			&:focus {
				border-color: var(--color-accent-green-main-30);
			}

			&:active {
				background-color: var(--color-accent-green-main-10);
				border-color: var(--color-accent-green-main-10);
			}
		}
	}
}
</style>
