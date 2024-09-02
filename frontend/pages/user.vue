<script setup lang="ts">
import { SeoItemTypeEnum } from '~/constants/enums/seo';

definePageMeta({
	layout: 'profile'
});

const { t } = useI18n();

const mobile = inject('mobile');

getMeta({
	title: t('meta.user.info.title'),
	description: t('meta.user.info.description')
});
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
		margin-bottom: unset;
		padding-top: 10px;
	}
	@media (max-width: 768px-1px) {
		padding-top: var(--header-height);
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
		margin-right: 20px;
		@media (min-width: 1440px) {
			margin-right: 130px;
		}
	}
}
</style>
