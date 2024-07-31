<script setup lang="ts">
const route = useRoute();
import { useFilterStore } from '../../stores/filter.store';
import { API_URL } from '~/constants/url';

const filterStore = useFilterStore();
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

const getDataeFromQuery = (date?: string) => {
	const newDate = new Date(date).setHours(0, 0, 0);
	const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
	const dateTS = newDate ? newDate - timezoneOffset : null;
	return dateTS;
};

const param1 = ref('value1');
const city = computed(() => route.params.city);

const dt = ref(route.query.startDate);
const dateStart = computed(() => getDataeFromQuery(route.query.startDate as string));
const dateEnd = computed(() => getDataeFromQuery(route.query.endDate as string));
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

//watch(
//	() => route.query,
//	(val) => {
//alert(JSON.stringify(val));
//	dt.value = val.startDate;
//tags.value = getFirstQuery(val.tags)
//	.split(', ')
//	.filter((item) => item !== '');
//	},
////	{ deep: true }
//);

const { data, status, error, refresh, pending } = await useFetch(`${baseUrl}${current}`, {
	query: { q: city, key: key, dt, tags }
});
// backend noy suited for this - becouse it is query not body
//"req":{"method":"POST","url":"/api/events/find?tags=restaurant&startDate=1721520000000&endDate=1721520000000","hostname":"127.0.0.1","remoteAddress":"172.18.0.4","remotePort":58494}
const {
	data: events,
	pending: pendingEvents,
	error: errorEvents
} = await useFetch(`${API_URL}/${searchUrl}/${route.params.city}`, {
	query: { tags, startDate: dateStart, endDate: dateEnd }
});
const { data: posterEvents } = await apiRouter.filters.findEvents2.useQuery({
	data: {
		query: {
			tags,
			startDate: dateStart,
			endDate: dateEnd
		},
		watch: [tags.value, dateStart.value, dateEnd.value]
	}
});

const {
	data: eventsB,
	pending: pendingEventsB,
	error: errorEventsB
} = await useFetch(`${API_URL}/${searchUrl}`, {
	body: {
		tags,
		startDate: dateStart,
		endDate: dateEnd,

		watch: [tags.value, dateStart.value, dateEnd.value]
	},
	method: 'POST'
});
</script>
<template>
	<main>
		<CityHerowrap :title="`I am the city ${city}`">
			<div>filters</div>
			<CityFilters :tag-list="usedTags" />
		</CityHerowrap>

		<div>ref:</div>
		<div>{{ city }}</div>
		<div>data:</div>
		<div v-if="pending">Loading...</div>
		<pre v-else>{{ data }}</pre>

		<div>error:</div>
		<pre>{{ error }}</pre>
		<div>events:</div>
		<div v-if="pendingEvents">Loading events....</div>
		<pre v-else>{{ posterEvents }}</pre>
		<div>error:</div>
		<pre>{{ errorEvents }}</pre>
		<div>EventsB:</div>
		<pre>{{ eventsB }}</pre>
		<div>errorB:</div>
		<pre>{{ errorEventsB }}</pre>
	</main>
</template>
