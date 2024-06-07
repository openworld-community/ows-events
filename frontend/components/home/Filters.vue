<script setup lang="ts">
import dayjs from 'dayjs';
import { useFilterStore } from '../../stores/filter.store';
import { debouncedWatch } from '@vueuse/core';
import { useSendTrackingEvent } from '../../composables/useSendTrackingEvent';

const filterStore = useFilterStore();

const route = useRoute();
const { sendAnalytics } = useSendTrackingEvent();
onBeforeMount(async () => {
	//TODO костыль, иначе при ините страницы не достается value из запроса
	if (process.server) return;

	setTimeout(async () => {
		filterStore.$patch({ loading: true });
		await filterStore.getFilteredEvents();
		await filterStore.getUsedFilters();
		filterStore.$patch({ loading: false });
		if (route.query) {
			sendAnalytics.search('view_search_results', {
				search_term: route.fullPath.split('?')[1],
				city: route.query.city ? getFirstQuery(route.query.city) : '',
				tags: route.query.tags ? getFirstQuery(route.query.tags) : ''
			});
		}
	});
});

watch(
	() => filterStore.filters,
	async (filters) => {
		navigateTo({
			query: {
				...route.query,
				//	search: filters.searchLine || undefined,
				city: filters.city || undefined,
				tags: filters.tags.join(', ') || undefined,

				startDate: filters.date[0]
					? dayjs(filters.date[0]).format('YYYY-MM-DD')
					: undefined,
				endDate: filters.date[1] ? dayjs(filters.date[1]).format('YYYY-MM-DD') : undefined
			}
		});
	},
	{ deep: true }
);

debouncedWatch(
	filterStore.filters,
	async () => {
		filterStore.$patch({ loading: true });
		await filterStore.getFilteredEvents();
		filterStore.$patch({ loading: false });
	},
	{ debounce: 700, maxWait: 1000 }
);
</script>

<template>
	<section class="filters">
		<div class="filters__wrapper">
			<CommonUiFilter
				filter-type="select"
				name="city"
				:list="filterStore.usedCities"
				:disabled="!filterStore.usedCities.length"
			/>
			<CommonUiFilter
				filter-type="date"
				name="date"
				:range="true"
			/>
		</div>
		<div
			v-if="filterStore.usedTags.length !== 0"
			class="filters__tags"
		>
			<CommonUiFilter
				name="tags"
				filter-type="tag"
				:list="filterStore.usedTags"
			/>
		</div>
	</section>
</template>

<style scoped lang="less">
.filters {
	//display: grid;
	width: 100%;
	max-width: 1200px;

	&__wrapper {
		--gap: 10px;
		display: grid;
		grid-template-columns: 1fr;
		width: 100%;
		grid-column: span 3;
		gap: var(--gap);
		margin-bottom: 20px;

		@media (min-width: 768px) {
			box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14);
			border-radius: 8px;
			align-items: center;
			margin-top: 0;
			gap: var(--gap);
			grid-template-columns: 1fr 1fr;

			&:deep(.calendar) {
				max-width: 100%;
			}
		}
		@media (min-width: 1440px) {
			background-color: var(--color-white);
			margin-bottom: 40px;
			gap: 0;
		}
	}

	&__tags {
		width: 100%;
	}
}
</style>
