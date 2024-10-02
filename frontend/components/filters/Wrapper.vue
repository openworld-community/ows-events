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

const getDate = (date?: string) => {
	if (!date) return null;
	const newDate = dayjs(date);
	if (!newDate.isValid) return null;
	const result = newDate.toDate();
	return result;
};

const dates = ref([
	getDate(getFirstQuery(route.query.startDate)) ?? undefined,
	getDate(getFirstQuery(route.query.endDate)) ?? undefined
]);
const tags = ref(
	getFirstQuery(route.query.tags)
		.split(', ')
		.filter((item) => item !== '') ?? []
);

//when go to main page as spa (routing on frontend only and this comonent not rerenders) we need to change refs acording to changed route.query
//conditions - becouse we need change refs only when they coused by client navigation on main page (click on logo)
//in other cases they change by themselves or by taking initial data becouse first render this component

watch(
	() => route.query,
	(val) => {
		const tagsForQuery = tags.value.join(', ') || undefined;
		if (tagsForQuery !== val.tags) {
			tags.value =
				getFirstQuery(val?.tags)
					.split(', ')
					.filter((item) => item !== '') ?? [];
		}
		if (dates[0] !== getFirstQuery(val.startDate) || dates[1] !== getFirstQuery(val.endDate)) {
			dates.value = [
				getDate(getFirstQuery(val.startDate)) ?? undefined,
				getDate(getFirstQuery(val.endDate)) ?? undefined
			];
		}
	}
);

watch(
	() => tags,
	async (val) => {
		const tagsForQuery = val.value.join(', ') || undefined;
		if (tagsForQuery !== route.query.tags) {
			console.log('work nawigation tags changed');
			await navigateTo({
				query: {
					...route.query,
					tags: val.value.join(', ') || undefined
				}
			});
		}
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
	<FiltersContent
		v-model:model-tags="tags"
		v-model:model-dates="dates"
		:current-country="currentCountry"
		:filter-countries="filterCountries"
		:current-city="currentCity"
		:filter-cities="filterCities"
		:tag-list="tagList"
	/>
</template>
