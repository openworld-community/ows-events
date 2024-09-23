<script setup lang="ts">
import { useUserStore } from '../stores/user.store';

const { sendAnalytics } = useSendTrackingEvent();
const { t, locale } = useI18n();

getMeta({
	title: `${t('meta.default_title.first')} | ${t('meta.default_title.second')}`
});

const route = useRoute();
const userStore = useUserStore();

watch(
	() => route.query,
	(value) => {
		if (Object.keys(value).length) {
			sendAnalytics.search({
				search_term: route.fullPath.split('?')[1],
				tags: value.tags ? getFirstQuery(value.tags) : ''
			});
		}
	},
	{ deep: true }
);
</script>

<template>
	<main class="main-page">
		<div class="main-page__top">
			<h1 class="main-page__title">{{ $t('home.title') }}</h1>
			<!-- <HomeUserLocation
					v-if="mobile"
					class="main-page__location"
				/> -->

			<HomeFilters class="main-page__filter" />
		</div>

		<HomeCardList />

		<CommonCreateButton :is-authorized="userStore.isAuthorized" />
	</main>
</template>

<style lang="less" scoped>
.no-results {
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;

	font-size: 24px;
}
.main-page {
	position: relative;
	width: 100%;
	@media (min-width: 768px) {
		padding-top: 0;
	}

	&__top {
		display: flex;
		width: 100%;
		align-items: center;
		flex-direction: column;
		background: linear-gradient(
			90deg,
			var(--color-accent-background) 0%,
			var(--color-accent-green-main) 100%
		);
		margin-top: 12px;

		padding-left: var(--padding-side);
		padding-right: var(--padding-side);

		@media (min-width: 768px) {
			padding-top: 32px;
			margin-top: 0;
		}

		@media (min-width: 1440px) {
			position: relative;
			padding-top: 60px;
		}
	}

	&__title {
		max-width: 400px;
		text-align: center;
		word-wrap: break-word;
		color: var(--color-white);
		padding-top: 28px;
		margin-bottom: 24px;
		letter-spacing: -0.3px;

		@media (min-width: 768px) {
			max-width: 500px;
			padding-top: 0;
			margin-bottom: 40px;
		}

		@media (min-width: 1440px) {
			max-width: 900px;
			margin-bottom: 60px;
		}
	}

	&__card-list {
		display: flex;
		flex-direction: column;
		width: 100%;

		@media (min-width: 768px) {
			flex-direction: row;
			flex-wrap: wrap;
			padding-left: var(--padding-side);
			padding-right: var(--padding-side);
		}
	}

	&__card-item {
		@media (min-width: 768px) {
			display: flex;
			width: 49.2%;
			height: auto;
			margin-bottom: 5%;
			margin-right: 1.5%;

			&:nth-child(2n) {
				margin-right: 0;
			}
		}

		@media (min-width: 1440px) {
			display: flex;
			width: 32.3%;
			min-height: 100%;
			margin-right: 0;

			&:not(:nth-child(3n)) {
				margin-right: 1.5%;
			}
		}
	}
}
</style>
