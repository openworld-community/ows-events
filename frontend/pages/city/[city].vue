<script setup lang="ts">
const route = useRoute();
import { API_URL } from '~/constants/url';
const { locale } = useI18n();
const mobile = inject('mobile');
import { countries as supportedCountries } from '../../../common/const/supportedCountries';
import { capitalize } from 'vue';

const searchUrl = 'events/find';

const { data: usedCities } = await apiRouter.filters.getUsedCities.useQuery({});

const { data: usedTags } = await apiRouter.filters.getUsedTags.useQuery({});

const city = computed(() => route.params.city as string);

const dateStart = computed(() =>
	dateFromQueryToFilter('first', getFirstQuery(route.query.startDate as string))
);
const dateEnd = computed(() => {
	return dateFromQueryToFilter('second', getFirstQuery(route.query.endDate as string));
});
const tags = computed(() =>
	getFirstQuery(route.query.tags)
		.split(', ')
		.filter((item) => item !== '')
);

const filterCities = computed(() => {
	return usedCities.value.map((objCity) => {
		return { value: objCity['en'], label: objCity[locale.value] };
	});
});

const currentCity = computed(() => {
	return capitalize(city.value);
});

const {
	data: events,
	pending: pendingEvents,
	error
} = await useFetch(`${API_URL}/${searchUrl}/${route.params.city}`, {
	query: { tags, startDate: dateStart, endDate: dateEnd }
});
const {
	data: posterEvents,
	error: errorEvents,
	pending
} = await apiRouter.filters.findEventsByCity.useQuery({
	data: {
		city: city.value,
		query: {
			tags,
			startDate: dateStart,
			endDate: dateEnd
		},
		watch: [tags.value, dateStart.value, dateEnd.value]
	}
});
</script>
<template>
	<main class="citi-page">
		<FiltersHeroWrap :title="$t('city.title', { city: currentCity })">
			<FiltersContent
				:current-text="currentCity"
				:tag-list="usedTags"
				:filter-cities="filterCities"
			/>
		</FiltersHeroWrap>
		<div>error:</div>
		<pre>{{ errorEvents }}</pre>

		<SearchCardsWrapper>
			<SearchLoader
				v-if="pending"
				:size="mobile ? 'middle' : 'big'"
			/>
			<SearchNotFound
				v-if="!pending && posterEvents && posterEvents.length === 0"
				:title="$t('event.filteredEvents.no_events_found')"
			/>
			<SearchEventCardsList :events="posterEvents" />
			<SearchHeading
				v-if="posterEvents && posterEvents.length !== 0"
				position="down"
				:title="$t('city.heading', { city, country: supportedCountries['ME'][locale] })"
			/>
		</SearchCardsWrapper>
	</main>
</template>

<style lang="less" scoped>
.city-page {
	//tag main has padding in global
	flex-grow: 1;
	padding-top: var(--header-height);
	@media (max-width: 768px) {
		padding-top: var(--header-height);
	}
	@media (min-width: 768px) {
		padding-top: 0px;
	}
}

.heading--down:has(.city-page) {
	margin-bottom: 30px;
}
</style>
