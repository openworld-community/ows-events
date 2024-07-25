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
const q = ref(route.params.city);

const dt = ref(route.query.startDate);
const dateStart = ref(getDataeFromQuery(route.query.startDate as string));
const dateEnd = ref(getDataeFromQuery(route.query.endDate as string));
const tags = ref(
	getFirstQuery(route.query.tags)
		.split(', ')
		.filter((item) => item !== '')
);

const getDataFromParams = (data: ReturnType<typeof useRoute>['params'][string]) => {
	const newCity = getFirstParam(data);
	q.value = capitalize(newCity);
};
console.log('ROUTE_PATH', route.path);

watch(
	() => route.params.city,
	(val) => {
		getDataFromParams(val);
	},
	{ deep: true }
);

watch(
	() => route.query,
	(val) => {
		alert(JSON.stringify(val));
		dt.value = val.startDate;
		tags.value = getFirstQuery(val.tags)
			.split(', ')
			.filter((item) => item !== '');
	},
	{ deep: true }
);

const { data, status, error, refresh } = await useFetch(`${baseUrl}${current}`, {
	query: { q, key: key, dt, tags }
});
// backend noy suited for this - becouse it is query not body
//"req":{"method":"POST","url":"/api/events/find?tags=restaurant&startDate=1721520000000&endDate=1721520000000","hostname":"127.0.0.1","remoteAddress":"172.18.0.4","remotePort":58494}
const { data: events } = await useFetch(`${API_URL}/${searchUrl}/${route.params.city}`, {
	query: { tags, startDate: dateStart, endDate: dateEnd }
});
//const { data: posterEvents } = await apiRouter.filters.findEvents.useQuery({
//	data: {
//		query: {
//			tags,
//			startDate: dateStart,
//			endDate: dateEnd
//		}
//	}
//});
</script>
<template>
	<main>
		<CityHerowrap :title="`I am the city ${q}`">
			<div>filters</div>
			<CityFilters :tag-list="usedTags" />
		</CityHerowrap>

		<div>ref:</div>
		<div>{{ q }}</div>
		<div>data:</div>
		<pre>{{ data }}</pre>

		<div>error:</div>
		<pre>{{ error }}</pre>
		<div>events:</div>
		<pre>{{ events }}</pre>
	</main>
</template>
