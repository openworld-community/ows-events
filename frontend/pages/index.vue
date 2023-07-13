<script setup lang="ts">
import { RouteNameEnum } from '@/constants/enums/route';
import { useModal } from 'vue-final-modal';
import NeedAuthorize from '@/components/modal/NeedAuthorize.vue';
import EventModal from '@/components/modal/Event.client.vue';
// TEST
import { v4 as uuid } from 'uuid';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

const { t } = useI18n();
useHead({ titleTemplate: `%s / ${t('meta.home.title')}` });
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

const posterEvents: Ref<EventOnPoster[]> = ref([]);

const loadEvents = (list: EventOnPoster[], count: number) => {
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

// !!!!!!! USE VIRTUAL SCROLL & USE INFINITY SCROLL TEST

// const { list, containerProps, wrapperProps } = useVirtualList(posterEvents, {
// 	itemHeight: 336,
// 	overscan: 10
// });

// !!!!! VUE VIRTUAL SCROLL TEST

interface viewAndVisible {
	viewStartIdx: number;
	viewEndIdx: number;
	visibleStartIdx: number;
	visibleEndIdx: number;
}

const updateParts: Ref<viewAndVisible> = ref({
	viewStartIdx: 0,
	viewEndIdx: 0,
	visibleStartIdx: 0,
	visibleEndIdx: 0
});

// const onResize = () => {
// 	console.log('resize');
// };

const onUpdate = (
	viewStartIndex: number,
	viewEndIndex: number,
	visibleStartIndex: number,
	visibleEndIndex: number
): void => {
	updateParts.value.viewStartIdx = viewStartIndex;
	updateParts.value.viewEndIdx = viewEndIndex;
	updateParts.value.visibleStartIdx = visibleStartIndex;
	updateParts.value.visibleEndIdx = visibleEndIndex;
};

onMounted(() => {
	const listSelector = ref<HTMLElement | null>(null);

	useInfiniteScroll(
		listSelector,
		() => {
			console.log('sobaka');
			loadEvents(posterEvents.value, 20);
		},
		{ distance: 10 }
	);
});
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
			{{ $t('home.title') }}
		</h1>
		<HomeFilter
			v-model:country="eventsQuery.country"
			v-model:city="eventsQuery.city"
			class="main-page__filter"
		/>

		<!-- VUE VIRTUAL SCROLL TEST -->
		<DynamicScroller
			ref="listSelector"
			:items="posterEvents"
			:emit-update="true"
			:min-item-size="294"
			class="main-page__card-list"
			@update="onUpdate"
		>
			<template #default="{ item: event, index, active }">
				<DynamicScrollerItem
					:item="event"
					:active="active"
					:data-index="index"
				>
					<HomeEventPreviewCard
						:class="{ expired: event.date < now }"
						:event-data="event"
					/>
				</DynamicScrollerItem>
			</template>
		</DynamicScroller>

		<!-- USE VIRTUAL SCROLL & USE INFINITY SCROLL TEST -->
		<!-- <ul
			v-bind="containerProps"
			style="height: 100vh"
			class="main-page__card-list"
		>
			<li
				v-bind="wrapperProps"
				ref="listItem"
			>
				<div
					v-for="{ data: event } in list"
					:key="event.id"
				>
					<HomeEventPreviewCard
						:class="{ expired: event.date < now }"
						:event-data="event"
					/>
				</div>
			</li>
		</ul> -->

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
	padding-bottom: 40px;
}
.main-page {
	padding-top: 16px;

	&__search {
		padding-left: var(--padding-side);
		padding-right: var(--padding-side);
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
		height: 100vh;
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
