<script setup lang="ts">
import { useModal } from 'vue-final-modal';
import NeedAuthorize from '@/components/modal/NeedAuthorize.vue';
import { SeoItemTypeEnum } from '../constants/enums/seo';
import { useUserStore } from '../stores/user.store';
import { RoutePathEnum } from '../constants/enums/route';
import { useEventStore } from '../stores/event.store';
import { useFilterStore } from '../stores/filter.store';

const { t } = useI18n();

getMeta({
	title: t('meta.default_title')
});

const userStore = useUserStore();
const filterStore = useFilterStore();
const localePath = useLocalePath();

const {
	open: openNeedAuthorizeModal,
	close: closeNeedAuthorizeModal,
	patchOptions: needAuthorizeModalPatch
} = useModal({ component: NeedAuthorize });
needAuthorizeModalPatch({ attrs: { closeNeedAuthorizeModal } });

const onButtonClick = async () => {
	if (userStore.isAuthorized) {
		const eventStore = useEventStore();
		eventStore.createDefaultEventData();
		await navigateTo(localePath({ path: RoutePathEnum.EVENT_FORM }));
	} else {
		await openNeedAuthorizeModal();
	}
};
</script>

<template>
	<div class="root">
		<HeaderCommon />
		<main class="main-page">
			<div class="main-page__top">
				<h1 class="main-page__title">{{ $t('home.title') }}</h1>
				<!-- <HomeUserLocation
					v-if="mobile"
					class="main-page__location"
				/> -->
				<HomeFilters class="main-page__filter" />
			</div>
			<ul class="main-page__card-list">
				<li
					v-for="event in filterStore.filteredEvents"
					:key="event.id"
					class="main-page__card-item"
					itemscope
					:itemtype="SeoItemTypeEnum.EVENT"
				>
					<HomeEventPreviewCard :event-data="event" />
					<!-- <HomeAdCard v-else :ad-data="event" class="ad-block" /> -->
				</li>
			</ul>

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
		<FooterCommon />
	</div>
</template>

<style lang="less" scoped>
.main-page {
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
		margin-bottom: 32px;
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);

		@media (min-width: 768px) {
			padding-top: 65px;
			margin-top: 0;
			margin-bottom: 80px;
		}

		@media (min-width: 1440px) {
			position: relative;
			padding-top: 99px;
			margin-bottom: 100px;
		}
	}

	&__title {
		max-width: 400px;
		font-size: var(--font-size-XXL);
		line-height: 40px;
		text-align: center;
		word-wrap: break-word;
		color: var(--color-white);
		padding-top: 28px;
		margin-bottom: 24px;

		@media (min-width: 768px) {
			max-width: 600px;
			font-size: 50px;
			line-height: 60px;
			padding-top: 0;
			margin-bottom: 40px;
		}

		@media (min-width: 1440px) {
			max-width: 900px;
			font-size: 70px;
			line-height: 80px;
			margin-bottom: 120px;
		}
	}

	&__location {
		display: flex;
		width: 100%;
		justify-content: center;
		margin-bottom: 24px;
	}

	&__filter {
		width: 100%;
		margin-bottom: 24px;

		@media (min-width: 1440px) {
			position: absolute;
			bottom: -60px;
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
