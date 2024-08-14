<script setup lang="ts">
const route = useRoute();
import dayjs from 'dayjs';
import { API_URL } from '~/constants/url';
const { locale } = useI18n();

const key = '3b0f745872084e60b3d100135241707';
const baseUrl = 'http://api.weatherapi.com/v1';
const current = '/forecast.json';

const searchUrl = 'events/find';

onBeforeMount(async () => {
	//TODO костыль, иначе при ините страницы не достается value из запроса
	//if (process.server) return;
	//setTimeout(async () => {
	//	await filterStore.getUsedFilters();
	//});
	//	const { data: usedCities } = await apiRouter.filters.getUsedCities.useQuery({});
});

const { data: usedCities } = await apiRouter.filters.getUsedCities.useQuery({});

const { data: usedTags } = await apiRouter.filters.getUsedTags.useQuery({});

const capitalize = (str: string) => {
	return str.slice(0, 1).toUpperCase() + str.slice(1);
};

const getFirstFromQuery = (date?: string) => {
	if (!date) return null;
	console.log('DATE', new Date(date), dayjs(date).utc().toDate().getDate());
	// applying new Date changes the day if user has timezone with minus from UTC (from query hh:mm:ss = 0:0:0 the date turns out to be previous day) so we use UTC
	const timeObj = {
		year: new Date(date).getUTCFullYear(),
		month: new Date(date).getUTCMonth(),
		day: new Date(date).getUTCDate()
	};
	const newDate = +new Date(timeObj.year, timeObj.month, timeObj.day, 0, 0, 0);
	console.log('CITY FIRST DATE2', newDate, timeObj);

	const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
	const dateTS = newDate ? newDate - timezoneOffset : null;
	console.log('CITY FIRST', date, new Date(dateTS));
	return dateTS;
};

const getSecondFromQuery = (date?: string) => {
	if (!date) return null;
	const timeObj = {
		year: new Date(date).getUTCFullYear(),
		month: new Date(date).getUTCMonth(),
		day: new Date(date).getUTCDate()
	};
	const newDate = +new Date(timeObj.year, timeObj.month, timeObj.day, 23, 59, 59);
	console.log('CITY SECOND DATE2', newDate, timeObj);

	const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
	const dateTS = newDate ? newDate - timezoneOffset : null;
	console.log('CITY SECOND', date, new Date(dateTS));
	return dateTS;
};

const city = computed(() => route.params.city);

const dt = ref(route.query.startDate);
const dateStart = computed(() => getFirstFromQuery(getFirstQuery(route.query.startDate as string)));
const dateEnd = computed(() => getSecondFromQuery(getFirstQuery(route.query.endDate as string)));
const tags = computed(() =>
	getFirstQuery(route.query.tags)
		.split(', ')
		.filter((item) => item !== '')
);
const getDataFromParams = (data: ReturnType<typeof useRoute>['params'][string]) => {
	const newCity = getFirstParam(data);
	//city.value = capitalize(newCity);
};

console.log('ROUTE_PATH', route.path);

watch(
	() => route.params.city,
	(val) => {
		getDataFromParams(val);
	},
	{ deep: true }
);

const citiesS = [
	'gkjhhh',
	'njksdacdsc',
	'cadcdasd',
	'sdfsgfsdg',
	'dsgsdfgsdfg',
	'sdgsdgdsgsd',
	'sdgsdfgsdg',
	'efafafaf',
	'escresrcc',
	'xertrtbytby',
	'xwreretvrt',
	'awercewrcr'
];

const filterCities = computed(() => {
	return usedCities.value
		.reduce((acc, rec) => {
			acc = [...acc, ...rec.cities];
			return acc;
		}, [])
		.map((objCity) => {
			return { value: objCity['en'], label: objCity[locale.value] };
		});
});

const {
	data: events,
	pending: pendingEvents,
	error: errorEvents
} = await useFetch(`${API_URL}/${searchUrl}/${route.params.city}`, {
	query: { tags, startDate: dateStart, endDate: dateEnd }
});
const {
	data: posterEvents,
	error,
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
		<FiltersHeroWrap :title="`I am the city ${city}`">
			<FiltersContent
				:tag-list="usedTags"
				:filter-cities="citiesS"
			/>
		</FiltersHeroWrap>

		<div v-if="pending">Loading...</div>

		<div>events:</div>
		<div v-if="pendingEvents">Loading events....</div>
		<pre v-else>{{ posterEvents }}</pre>
		<div>errorPosterEvents: {{ error }}</div>
		<div>error:</div>
		<pre>{{ errorEvents }}</pre>
	</main>
</template>

<style lang="less" scoped>
.city-page {
	//tag main has padding in global

	@media (max-width: 768px) {
		padding-top: var(--header-height);
	}
	@media (min-width: 768px) {
		padding-top: 0px;
	}
}
</style>
