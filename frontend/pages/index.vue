<script setup lang="ts">
import { RouteNameEnum } from '@/constants/enums/route';
import { useModal } from 'vue-final-modal';
import NeedAuthorize from '@/components/modal/NeedAuthorize.vue';
import EventModal from '@/components/modal/Event.client.vue';
import { maxRequests, minItemCardSize, distanceToLoadEvents, pagesToLoad } from '@/constants/global';
import { type EventOnPoster } from '../../common/types';
import { useListStore } from '~/stores/list.store';

const listStore = useListStore();

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

const posterEvents: Ref<EventOnPoster[] | null> = ref(listStore.events);
const requestPages = ref(listStore.eventRequestPages);
const hasMorePages = ref(true);
const now = Date.now();

watch(
	[() => listStore.eventRequestPages, () => listStore.events],
	() => {
		requestPages.value = listStore.eventRequestPages;
		posterEvents.value = listStore.events;
	}
);

onMounted(async () => {
	await new Promise((resolve) => setTimeout(resolve, 0));
	if (listStore.scrollTop > 0) {
		listStore.$patch({
			needScrollList: true,
			lastAction: 'INDEX'
		});
	}
});

const loadPosterEvents = async () => {
	const query = {
		...debouncedEventsRequestQuery.value,
		paginationOptions: { limit: maxRequests, page: requestPages }
	};
	const { data } = await apiRouter.events.findMany.useQuery({
		data: {
			query: query
		}
	});

	if (data.value && data.value.docs) {
		const { hasNextPage } = data.value;
		hasMorePages.value = hasNextPage
		listStore.$patch({
			events: data.value.docs
		});
		hasNextPage ? listStore.incrementRequestPages(pagesToLoad) : null;
	}
};

const onButtonClick = () => {
	if (useCookie('token').value) {
		openEventModal();
	} else {
		openNeedAuthorizeModal();
	}
};
</script>

<template>
	<div class="main-page">
		<CommonScrollingPage
			:items="posterEvents"
			:min-item-size="minItemCardSize"
			:distance="distanceToLoadEvents"
			:has-next-page="hasMorePages"
			:size-dependencies="[
				'description',
				'title',
				'location.address',
				'location.city',
				'location.country'
			]"
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
