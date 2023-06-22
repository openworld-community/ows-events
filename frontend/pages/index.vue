<script setup lang="ts">
import { RouteNameEnum } from '@/constants/enums/route';
import { useModal } from 'vue-final-modal';
import NeedAuthorize from '@/components/modal/NeedAuthorize.vue';
import EventModal from '@/components/modal/Event.client.vue';

const { translate } = useTranslation();
useHead({ titleTemplate: `%s / ${translate('meta.home.title')}` });
definePageMeta({ name: RouteNameEnum.HOME });

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
const eventsQuery = ref({
	searchLine: route.query.search?.toString() ?? '',
	city: '',
	country: ''
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
	if (useCookie('token').value) {
		openEventModal();
	} else {
		openNeedAuthorizeModal();
	}
};
const now = Date.now();
</script>

<template>
	<div class="main-page">
		<HomeSearch
			v-model:search="eventsQuery.searchLine"
			class="main-page__search"
		/>
		<div class="main-page__location">
			<HomeUserLocation />
		</div>
		<h1 class="main-page__title">
			{{ translate('home.title') }}
		</h1>
		<HomeFilter
			v-model:country="eventsQuery.country"
			v-model:city="eventsQuery.city"
			class="main-page__filter"
		/>

		<ul class="main-page__card-list">
			<li
				v-for="event in posterEvents"
				:key="event.id"
			>
				<HomeEventPreviewCard
					:class="{ expired: event.date < now }"
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
			:alt="translate('home.button.add_event_aria')"
			aria-haspopup="true"
			@click="onButtonClick"
		/>
	</div>
</template>

<style lang="less" scoped>
.main-page {
	padding-top: 16px;

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
	}
}

.add-event-button {
	position: sticky;
	bottom: 20px;
	right: 0;
	margin-left: auto;
	margin-right: 20px;
	z-index: 1;
}

.expired {
	opacity: 0.5;
}
</style>
