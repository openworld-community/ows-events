<script setup lang="ts">
import dayjs from 'dayjs';

import type { TagList } from '../../../common/const/tags';

const route = useRoute();

defineProps({
	tagList: {
		type: Array as PropType<TagList>,
		default: () => []
	},
	filterCities: {
		type: [Array, String, Set] as PropType<string | string[] | { [key: string]: string }[]>,
		default: () => []
	},
	filterCountries: {
		type: [Array, String, Set] as PropType<string | string[] | { [key: string]: string }[]>,
		default: () => []
	},
	currentCity: {
		type: String,
		default: ''
	},
	currentCountry: {
		type: String,
		default: ''
	}
});

const dates = ref([
	dayjs(getFirstQuery(route.query.startDate)).toDate() ?? undefined,
	dayjs(getFirstQuery(route.query.endDate)).toDate() ?? undefined
]);
const tags = ref(
	getFirstQuery(route.query.tags)
		.split(', ')
		.filter((item) => item !== '') ?? []
);

watch(
	() => tags,
	async (val) => {
		await navigateTo({
			query: {
				...route.query,
				tags: val.value.join(', ') || undefined
			}
		});
	},

	{ deep: true }
);

watch(
	() => dates,
	async (val) => {
		await navigateTo({
			query: {
				...route.query,

				startDate: val.value[0] ? dayjs(val.value[0]).format('YYYY-MM-DD') : undefined,
				endDate: val.value[1] ? dayjs(val.value[1]).format('YYYY-MM-DD') : undefined
			}
		});
	},

	{ deep: true }
);
</script>
<template>
	<LazyFiltersContent
		v-model:model-tags="tags"
		v-model:model-dates="dates"
		:current-country="currentCountry"
		:filter-countries="filterCountries"
		:current-city="currentCity"
		:filter-cities="filterCities"
		:tag-list="tagList"
	/>
</template>
