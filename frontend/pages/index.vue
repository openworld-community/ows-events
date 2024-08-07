<script setup lang="ts">
import { useModal } from 'vue-final-modal';
import NeedAuthorize from '@/components/modal/NeedAuthorize.vue';

import { useUserStore } from '../stores/user.store';
import { RoutePathEnum } from '../constants/enums/route';

const { sendAnalytics } = useSendTrackingEvent();
const { t } = useI18n();

getMeta({
	title: `${t('meta.default_title.first')} | ${t('meta.default_title.second')}`
});

const route = useRoute();
const userStore = useUserStore();

const localePath = useLocalePath();

watch(
	() => route.query,
	(value) => {
		if (Object.keys(value).length) {
			sendAnalytics.search({
				search_term: route.fullPath.split('?')[1],
				city: value.city ? getFirstQuery(value.city) : '',
				tags: value.tags ? getFirstQuery(value.tags) : ''
			});
		}
	},
	{ deep: true }
);

const {
	open: openNeedAuthorizeModal,
	close: closeNeedAuthorizeModal,
	patchOptions: needAuthorizeModalPatch
} = useModal({ component: NeedAuthorize });
needAuthorizeModalPatch({ attrs: { closeNeedAuthorizeModal } });

const onButtonClick = async () => {
	if (userStore.isAuthorized) {
		await navigateTo(localePath(`${RoutePathEnum.EVENT_EDIT}new`));
	} else {
		await openNeedAuthorizeModal();
	}
};
</script>

<template>
	<main class="main-page">
		<HomeIdentity />
		<div class="main-page__top">
			<h1 class="main-page__title">{{ $t('home.title') }}</h1>
			<!-- <HomeUserLocation
					v-if="mobile"
					class="main-page__location"
				/> -->
			<HomeFilters class="main-page__filter" />
		</div>

		<HomeCardList />

		<CommonButton
			class="add-event-button"
			button-kind="success"
			is-round
			icon-name="plus"
			:alt="$t('home.button.add_event_aria')"
			:title="$t('home.button.add_event_aria')"
			aria-haspopup="true"
			@click="onButtonClick"
		/>
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
	@media (min-width: 768px) {
		padding-top: 0;
	}

	&__identity {
		display: flex;
		width: 100%;
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
		margin-bottom: 20px;

		&__mobile {
			display: flex;
			width: 100%;
			padding-left: var(--padding-side);
			padding-right: var(--padding-side);
			justify-content: center;
		}
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

.add-event-button {
	position: sticky;
	bottom: 20px;
	right: 0;
	margin-left: auto;
	margin-right: 20px;
	margin-bottom: var(--space-related-items);
	z-index: 1;
}
</style>
