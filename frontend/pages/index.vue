<script setup lang="ts">
import { type EventOnPoster } from '../../common/types';
import { computed, ref, watch } from 'vue';
import { getEvents, getEventsByParams } from '@/services/events.services';
import { useLocationStore } from '@/stores/location.store';
import { storeToRefs } from 'pinia';
import { useModal } from 'vue-final-modal';
import { BASE_URL } from '@/constants/url';
import { RouteNameEnum } from '@/constants/enums/route';
import EventModal from '../components/modal/Event.vue';

const { open: openEventModal, close, patchOptions } = useModal({ component: EventModal });
patchOptions({ attrs: { close } });

definePageMeta({ name: RouteNameEnum.HOME });

let lazyLoadTimeout: ReturnType<typeof setTimeout> | undefined;

const locationStore = useLocationStore();
locationStore.loadCountries();
const { countries, cities, pickedCountry, pickedCity } = storeToRefs(locationStore);

const route = useRoute();
const posterEvents = ref<EventOnPoster[]>([]);

const searchFromRoute = route.query.search?.toString();
const search = ref<string>(searchFromRoute === 'None' ? '' : searchFromRoute || '');
const country = ref<string>(pickedCountry.value || '');
const city = ref<string>(pickedCity.value || '');

locationStore.pickCountry(pickedCountry.value);

const loadPosterEvents = async () => {
	if (search.value || country.value || city.value) {
		posterEvents.value = await getEventsByParams({
			searchLine: search.value,
			country: country.value,
			city: city.value
		});
	} else {
		posterEvents.value = await getEvents();
	}
};

await loadPosterEvents();

const planToLoadEvents = () => {
	lazyLoadTimeout && clearTimeout(lazyLoadTimeout);

	lazyLoadTimeout = setTimeout(async () => {
		loadPosterEvents();
	}, 500);
};

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
		planToLoadEvents();
		await navigateTo({ query: { ...route.query, search: _search || 'None' } });
	},
	{ deep: true }
);

watch(
	country,
	async (_country) => {
		locationStore.pickCountry(_country);

		city.value = pickedCity.value;
		planToLoadEvents();
	},
	{ deep: true }
);

watch(
	city,
	async (_city) => {
		locationStore.pickCity(_city);
		planToLoadEvents();
	},
	{ deep: true }
);

const filteredValues = computed(() => {
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

		<CommonButtonIcon
			class="add-event-button"
			icon-name="button-plus"
			icon-width="56"
			icon-height="56"
			aria-haspopup="true"
			:aria-label="$translate('home.button.add_event_aria')"
			@click="openEventModal()"
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
