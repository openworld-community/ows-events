<script setup lang="ts">
import { RouteNameEnum } from '@/constants/enums/route';
import { useModal } from 'vue-final-modal';
import NeedAuthorize from '@/components/modal/NeedAuthorize.vue';
import EventModal from '@/components/modal/Event.client.vue';
// TEST
import { v4 as uuid } from 'uuid';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

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
// const debouncedEventsRequestQuery = refDebounced(
// 	computed(() => ({ ...eventsQuery.value })),
// 	500,
// 	{ maxWait: 5000 }
// );
// const { data: posterEvents } = await apiRouter.events.findMany.useQuery({
// 	data: { query: debouncedEventsRequestQuery }
// });

const onButtonClick = () => {
	if (useCookie('token').value) {
		openEventModal();
	} else {
		openNeedAuthorizeModal();
	}
};
const now = Date.now();

// !!! TEST !!!
type Timezone = {
	timezoneName: string;
	timezoneOffset: string;
};

interface EventOnPoster {
	id: string;
	creatorId?: string;
	title: string;
	description: string;
	date: number;
	durationInSeconds: number;
	location: {
		country: string;
		city: string;
		address: string;
	};
	image: string;
	price: string;
	timezone?: Timezone;
	url: string;
}

const posterEvents: Ref<EventOnPoster[]> = ref([]);

type loadEventsCustom = (list: EventOnPoster[], count: number) => void;

const loadEvents: loadEventsCustom = (list: EventOnPoster[], count: number) => {
	for (let i = 0; i < count; i++) {
		list.push({
			date: +new Date(),
			id: uuid(),
			description: 'Хочу пицу, чтоб прям вкусная с ума сойдешь и вообще еще че нить',
			durationInSeconds: 0,
			title: 'peredelanoconf',
			image: '/image/7af2c5b3-3697-41b5-9f36-5151c11a6bb6.png',
			location: {
				country: 'Serbia',
				city: 'Belgrade',
				address: 'petushovskiy pr-kt'
			},
			price: '3000',
			timezone: {
				timezoneName: 'Europe/Belgrade',
				timezoneOffset: '+02:00'
			},
			url: 'vk.com'
		});
	}
};

const listSelector = ref<HTMLElement | null>(null);

onMounted(() => {
	document.body.style.overflowY = 'hidden';
	if (!listSelector.value) return;
	listSrore.listSelector = listSelector.value;
});

onUnmounted(() => {
	document.body.style.overflowY = 'unset';
	listSrore.listSelector = null;
});

useInfiniteScroll(
	listSelector,
	() => {
		loadEvents(posterEvents.value, 20);
	},
	{ distance: 20 }
);

// const updateParts: Ref<{
// 	viewStartIdx: number;
// }> = ref({
// 	viewStartIdx: 0
// });

// type update = (viewStartIndex: number) => void;

// const onUpdate: update = (viewStartIndex) => {
// 	listSrore.changeViewStartIdx(viewStartIndex, false);
// 	// updateParts.value.viewStartIdx = viewStartIndex;
// };

// watch(
// 	() => updateParts.value.viewStartIdx,
// 	() => {
// 		listSrore.changeViewStartIdx(updateParts.value.viewStartIdx);
// 	}
// );
</script>

<template>
	<div class="main-page">
		<div
			ref="listSelector"
			class="main-page__wrapper"
		>
			<DynamicScroller
				:items="posterEvents"
				:min-item-size="336"
				:buffer="400"
				:page-mode="true"
				:emit-update="true"
				class="main-page__content"
			>
				<!-- @update="onUpdate" -->
				<template #before>
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

				<!-- VUE VIRTUAL SCROLL TEST -->

				<template #default="{ item: event, index, active }">
					<DynamicScrollerItem
						:item="event"
						:data-index="index"
						:active="active"
						:size-dependencies="[
							event.description,
							event.title,
							event.location.addres,
							event.location.city,
							event.location.country
						]"
					>
						<HomeEventPreviewCard
							:class="{ expired: event.date < now }"
							:event-data="event"
						/>
					</DynamicScrollerItem>
				</template>
			</DynamicScroller>
		</div>

		<!-- <ul class="main-page__card-list">
      <li
        v-for="event in posterEvents"
        :key="event.id"
      >
          <HomeEventPreviewCard
            :class="{ expired: event.date < now }"
            :event-data="event"
          />
        <HomeAdCard v-else :ad-data="event" class="ad-block" />
      </li>
    </ul> -->
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
.vue-recycle-scroller__item-view div:first-child {
	padding-bottom: 44px;
}

.main-page {
	&__wrapper {
		width: 100%;
		overflow-y: scroll;
		height: calc(100vh - var(--header-height));
	}

	&__content {
		max-width: 480px;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-right: auto;
		margin-left: auto;
	}

	&__add-button-wrapper {
		max-width: 480px;
		position: sticky;
		bottom: 20px;
		right: 0;
		margin-right: auto;
		margin-left: auto;
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
