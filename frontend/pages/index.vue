<script setup lang="ts">
import { RouteNameEnum } from '@/constants/enums/route';
import { useModal } from 'vue-final-modal';
import NeedAuthorize from '@/components/modal/NeedAuthorize.vue';
import EventModal from '@/components/modal/Event.client.vue';
// TEST
import { v4 as uuid } from 'uuid';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

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

// TEST DATA
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

onBeforeMount(() => {
	document.body.style.overflowY = 'hidden';
});

onUnmounted(() => {
	document.body.style.overflowY = 'auto';
});

// !!!!! VUE VIRTUAL SCROLL TEST

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

loadEvents(posterEvents.value, 20);

const listSelector = ref<HTMLElement | null>(null);

useInfiniteScroll(
	listSelector,
	() => {
		loadEvents(posterEvents.value, 20);
	},
	{ distance: 20 }
);

const updateParts: Ref<{
	viewStartIdx: number;
	viewEndIdx: number;
	visibleStartIdx: number;
	visibleEndIdx: number;
}> = ref({
	viewStartIdx: 0,
	viewEndIdx: 0,
	visibleStartIdx: 0,
	visibleEndIdx: 0
});

type update = (
	viewStartIndex: number,
	viewEndIndex: number,
	visibleStartIndex: number,
	visibleEndIndex: number
) => void;

const onUpdate: update = (viewStartIndex, viewEndIndex, visibleStartIndex, visibleEndIndex) => {
	updateParts.value.viewStartIdx = viewStartIndex;
	updateParts.value.viewEndIdx = viewEndIndex;
	updateParts.value.visibleStartIdx = visibleStartIndex;
	updateParts.value.visibleEndIdx = visibleEndIndex;
};
</script>

<template>
	<div class="main-page">
		<div
			ref="listSelector"
			class="list-selector"
		>
			<DynamicScroller
				:items="posterEvents"
				:min-item-size="336"
				:buffer="400"
				:page-mode="true"
				class="main-page__card-list"
				@update="onUpdate"
			>
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
						ref="filter"
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
.vue-recycle-scroller__item-view div:first-child {
	padding-bottom: 44px;
}

.list-selector {
	overflow-y: scroll;
	height: calc(100vh - var(--header-height));
	padding-right: 5px;

	&::-webkit-scrollbar {
		width: 7px;
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 15px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 15px;
		background-color: #48c78e;
	}
}

.main-page {
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
