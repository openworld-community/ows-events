<script setup lang="ts">
import { type EventOnPoster } from '../../common/types';
import { computed, ref, watch } from 'vue';
import { useLocationStore } from '@/stores/location.store';
import { storeToRefs } from 'pinia';
import { useModal, UseModalOptions, VueFinalModal } from 'vue-final-modal';
import { RouteNameEnum } from '@/constants/enums/route';
import EventModal from '../components/modal/Event.vue';
import NeedAuthorize from '~/components/modal/NeedAuthorize.vue';

const { $translate } = useNuxtApp();

useHead({
	title: `${$translate('meta.title')} / ${$translate('meta.home.title')}`
});
definePageMeta({ name: RouteNameEnum.HOME });

const {
	open: openEventModal,
	close: closeEventModal,
	patchOptions: eventModalPatch
} = useModal({ component: EventModal } as UseModalOptions<
	InstanceType<typeof VueFinalModal>['$props']
>);
eventModalPatch({ attrs: { closeEventModal } });
const {
	open: openNeedAuthorizeModal,
	close: closeNeedAuthorizeModal,
	patchOptions: needAuthorizeModalPatch
} = useModal({ component: NeedAuthorize } as UseModalOptions<
	InstanceType<typeof VueFinalModal>['$props']
>);
needAuthorizeModalPatch({ attrs: { closeNeedAuthorizeModal } });

const locationStore = useLocationStore();
locationStore.loadCountries();
const { countries, cities, pickedCountry, pickedCity } = storeToRefs(locationStore);

const route = useRoute();

const searchFromRoute = route.query.search?.toString();
const search = ref(searchFromRoute === 'None' ? '' : searchFromRoute ?? '');
const country = ref(pickedCountry.value ?? '');
const city = ref(pickedCity.value ?? '');
const debouncedEventsRequestQuery = refDebounced(
	computed(() => ({
		city: city.value,
		country: country.value,
		searchLine: search.value
	})),
	500,
	{ maxWait: 5000 }
);
const { data: posterEvents } = await apiRouter.events.findMany.useQuery({
	query: debouncedEventsRequestQuery
});
locationStore.pickCountry(pickedCountry.value);

watch(
	pickedCountry,
	async () => {
		city.value = pickedCity.value;
	},
	{ deep: true }
);

watch(
	search,
	async (_search) => {
		await navigateTo({ query: { ...route.query, search: _search || 'None' } });
	},
	{ deep: true }
);

watch(
	country,
	async (_country) => {
		locationStore.pickCountry(_country);
		city.value = pickedCity.value;
	},
	{ deep: true }
);

watch(
	city,
	async (_city) => {
		locationStore.pickCity(_city);
	},
	{ deep: true }
);

const filteredValues = computed(() => {
	if (!posterEvents.value) return [];
	return getFilteredEvents(posterEvents.value, search.value, country.value, city.value);
});

// todo - new created events are not sorted by date
const eventsWithAdd = computed((): (EventOnPoster & { type: 'event' })[] => {
	const events = [...filteredValues.value];
	return events.map((x) => {
		return {
			...x,
			type: 'event'
		};
	});

	// const newEvents: (
	//   | (EventOnPoster & { type: 'event' })
	//   | {
	//       id: 'add'
	//       type: 'add'
	//       title: string
	//       description: string
	//       link: string
	//     }
	// )[] = []
	// for (let i = 0; i < events.length; i++) {
	//   if (i % 2 === 0) {
	//     newEvents.push({
	//       id: 'add',
	//       type: 'add',
	//       title: 'Peredelano Startups',
	//       description: $translate('home.peredelano.description'),
	//       link: 'https://t.me/peredelanoconfjunior'
	//     })
	//   }
	//   newEvents.push({
	//     ...events[i],
	//     type: 'event',
	//     image: events[i].image ? `${BASE_URL}/${events[i].image}` : 'https://picsum.photos/200/300'
	//   })
	// }
	// return newEvents
});

const getFilteredEvents = (
	events: EventOnPoster[],
	search: string,
	country: string,
	city: string
) => {
	if (!search && !country && !city) {
		return events;
	}

	const searchSource = (event: EventOnPoster) =>
		[event.title, event.description, event.location.city, event.location.country]
			.join(' ')
			.toLowerCase();

	return events.filter((event) => {
		const eventData = searchSource(event);
		return (
			(search && eventData.includes(search.toLowerCase())) ||
			(country && eventData.includes(country.toLowerCase())) ||
			(city && eventData.includes(city.toLowerCase()))
		);
	});
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
	<div>
		<div class="location">
			<HomeUserLocation />
		</div>
		<section class="search">
			<h1 class="search__title">
				{{ $translate('home.title') }}
			</h1>
			<CommonInput
				v-model="search"
				class="search__field"
				input-class="input is-info search-input"
				input-type="text"
				input-name="search"
				:input-placeholder="$translate('global.search')"
			/>
			<div class="search__container">
				<CommonInput
					v-model="country"
					class="search__field"
					input-type="datalist"
					input-name="country"
					:input-placeholder="$translate('global.country')"
					:options-list="countries"
				/>
				<CommonInput
					:key="country"
					v-model="city"
					:input-disabled="!country"
					class="search__field"
					input-type="datalist"
					input-name="city"
					:input-placeholder="$translate('global.city')"
					:options-list="cities"
				/>
			</div>
		</section>

		<ul class="card-list">
			<li
				v-for="event in eventsWithAdd"
				:key="event.id"
			>
				<HomeEventPreviewCard
					:class="event.date < now ? 'expired' : ''"
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
			:alt="$translate('home.button.add_event_aria')"
			aria-haspopup="true"
			@click="onButtonClick"
		/>
	</div>
</template>

<style lang="less" scoped>
.location {
	display: flex;
	width: 100%;
	padding-top: 16px;
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	margin-bottom: 36px;
}

.search {
	padding-left: var(--padding-side);
	padding-right: var(--padding-side);
	margin-bottom: 8px;

	&__title {
		font-size: var(--font-size-XXL);
		line-height: 40px;
		margin-bottom: 24px;
	}

	&__container {
		display: flex;
		gap: 15px;
	}

	&__field {
		margin-bottom: 16px;
	}
}

.card-list {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.add-event-button {
	position: fixed;
	bottom: 20px;
	right: 20px;
	z-index: 1;
}

.modal-card {
	background-color: var(--background-color);
}

.expired {
	opacity: 0.5;
}
</style>
