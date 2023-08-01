<script setup lang="ts">
import { RouteNameEnum } from '@/constants/enums/route';
import { useModal } from 'vue-final-modal';
import NeedAuthorize from '@/components/modal/NeedAuthorize.vue';
import EventModal from '@/components/modal/Event.client.vue';
// TEST
import { type EventOnPoster } from '../../common/types';
import { useListStore } from '~/stores/list.store';

const listSrore = useListStore();

const { t } = useI18n();

definePageMeta({ name: RouteNameEnum.HOME });

getMeta({
	title: t('meta.title')
});

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

const posterEvents: Ref<EventOnPoster[] | null> = ref([]);

const requestLimit = ref(listSrore.eventRequestLimit);

watch(
	() => listSrore.eventRequestLimit,
	(eventRequestLimit) => {
		requestLimit.value = eventRequestLimit;
	}
);

const hasMorePages = ref(true);

const loadPosterEvents = async () => {
	const query = {
		...debouncedEventsRequestQuery.value,
		paginationOptions: { limit: requestLimit.value }
	};
	const { data } = await apiRouter.events.findMany.useQuery({
		data: {
			query: query
		}
	});

	if (data.value) {
		const { hasNextPage } = data.value;
		hasMorePages.value = hasNextPage;
		posterEvents.value = data.value.docs;
		hasNextPage ? (listSrore.eventRequestLimit += 20) : null;
	}
};

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
		<CommonScrollingPage
			:items="posterEvents"
			:min-item-size="336"
			:distance="20"
			:has-next-page="hasMorePages"
			:size-dependencies="[
				'description',
				'title',
				'location.address',
				'location.city',
				'location.country'
			]"
			:class-name="'main-page__content'"
			@load-items="loadPosterEvents"
		>
			<template #stable>
				<HomeSearch
					v-model:search="eventsQuery.searchLine"
					class="main-page__search"
				/>
				<div class="main-page__location">
					<HomeUserLocation />
				</div>

				<h1 class="main-page__title">
					{{ $t('home.title') }}
				</h1>

				<HomeFilter
					v-model:country="eventsQuery.country"
					v-model:city="eventsQuery.city"
					class="main-page__filter"
				/>
			</template>
			<template #dynamic="{ item }">
				<HomeEventPreviewCard
					:class="{ expired: item.date < now }"
					:event-data="item"
				/>
			</template>
		</CommonScrollingPage>

		<div class="main-page__add-button-wrapper">
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
	</div>
</template>

<style lang="less" scoped>
.main-page {
	&__add-button-wrapper {
		max-width: 480px;
		width: 100%;
		position: absolute;
		bottom: 20px;
		right: 0;
		transform: translateX(-50%);
		left: 50%;
	}

	&__search {
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
		padding-top: 16px;
		margin-bottom: 44px;
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
}

.add-event-button {
	margin-left: auto;
	margin-right: 20px;
	z-index: 1;
}

.expired {
	opacity: 0.5;
}
</style>
