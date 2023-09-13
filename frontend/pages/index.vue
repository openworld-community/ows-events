<script setup lang="ts">
import { useModal } from 'vue-final-modal';
import NeedAuthorize from '@/components/modal/NeedAuthorize.vue';
import EventModal from '@/components/modal/Event.client.vue';
import { SeoItemTypeEnum } from '../constants/enums/seo';
import { useUserStore } from '../stores/user.store';

const { t } = useI18n();

getMeta({
	title: t('meta.default_title')
});

const userStore = useUserStore()

const {
	open: openEventModal,
	close: closeEventModal,
	patchOptions: eventModalPatch
} = useModal({ component: EventModal });
eventModalPatch({ attrs: { closeEventModal } });
const {
	open: openNeedAuthorizeModal,
	close: closeNeedAuthorizeModal,
	patchOptions: needAuthorizeModalPatch
} = useModal({ component: NeedAuthorize });
needAuthorizeModalPatch({ attrs: { closeNeedAuthorizeModal } });

const route = useRoute();
// todo - move this to the components?
const eventsQuery = ref({
	searchLine: getFirstQuery(route.query.search),
	city: getFirstQuery(route.query.city),
	country: getFirstQuery(route.query.country)
});
const debouncedEventsRequestQuery = refDebounced(
	computed(() => ({ ...eventsQuery.value })),
	500,
	{ maxWait: 5000 }
);
const { data: posterEvents } = await apiRouter.events.findMany.useQuery({
	data: { query: debouncedEventsRequestQuery }
});

const onButtonClick = () => {
	if (userStore.isAuthorized) {
		openEventModal();
	} else {
		openNeedAuthorizeModal();
	}
};
</script>

<template>
	<div class="main-page">
		<h1 class="visually-hidden">{{ $t('home.hidden_title') }}</h1>
		<HomeSearch
			v-model:search="eventsQuery.searchLine"
			class="main-page__search"
		/>
		<div class="main-page__location">
			<HomeUserLocation />
		</div>
		<h2 class="main-page__title">
			{{ $t('home.title') }}
		</h2>
		<HomeFilter
			v-model:country="eventsQuery.country"
			v-model:city="eventsQuery.city"
			class="main-page__filter"
		/>

		<ul class="main-page__card-list">
			<li
				v-for="event in posterEvents"
				:key="event.id"
				class="main-page__card-item"
				itemscope
				:itemtype="SeoItemTypeEnum.EVENT"
			>
				<HomeEventPreviewCard
					:event-data="event"
				/>
				<!-- <HomeAdCard v-else :ad-data="event" class="ad-block" /> -->
			</li>
		</ul>

		<CommonButton
			class="add-event-button"
			button-kind="success"
			is-round
			icon-name="plus"
			:alt="$t('home.button.add_event_aria')"
			aria-haspopup="true"
			@click="onButtonClick"
		/>
	</div>
</template>

<style lang="less" scoped>
.main-page {
	padding-top: 16px;

	@media(min-width: 768px) {
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
	}

	&__search {
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
		margin-bottom: 40px;
	}

	&__location {
		display: flex;
		width: 100%;
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
		margin-bottom: 16px;
	}

	&__title {
		font-size: var(--font-size-XXL);
		line-height: 40px;
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
		margin-bottom: 24px;
	}

	&__filter {
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
		margin-bottom: 24px;
	}

	&__card-list {
		display: flex;
		flex-direction: column;
		width: 100%;

		@media(min-width: 768px) {
			flex-direction: row;
			flex-wrap: wrap;
		}
	}

	&__card-item {
		@media(min-width: 768px) {
			display: flex;
			width: 49.2%;
			height: auto;
			margin-bottom: 1.5%;
			margin-right: 1.5%;

			&:nth-child(2n) {
				margin-right: 0;
			}
		}

		@media(min-width: 1440px) {
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
