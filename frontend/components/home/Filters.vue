<script setup lang="ts">
import dayjs from 'dayjs';
import { useFilterStore } from '../../stores/filter.store';
import { debouncedWatch } from '@vueuse/core';

const filterStore = useFilterStore();

const route = useRoute();

onBeforeMount(async () => {
	//TODO костыль, иначе при ините страницы не достается value из запроса
	if (process.server) return;

	setTimeout(async () => {
		filterStore.$patch({ loading: true });
		await filterStore.getFilteredEvents();
		await filterStore.getUsedFilters();
		filterStore.$patch({ loading: false });
	});
});

watch(
	() => filterStore.filters,
	async (filters) => {
		navigateTo({
			query: {
				...route.query,

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
		<FiltersContent
			v-model:model-tags="filterStore.filters.tags"
			v-model:model-dates="filterStore.filters.date"
			current-country=""
			:filter-countries="filterStore.usedCountries"
			current-city=""
			:filter-cities="filterStore.usedCities"
			:tag-list="filterStore.usedTags"
		/>
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

			&:deep(.input__field),
			&:deep(.popover__trigger--primary) {
				height: 72px;
			}
			&:deep(.calendar):before {
				width: 1px;
				content: '';
				background-color: var(--color-text-secondary);
				height: 80%;
				position: absolute;
				top: 10%;
				left: -1px;
				transition: backround-color, 0.15s ease-in-out;
			}
		}

		// прозраные сепараторы при фокусе первые два отвечают за пикер

		.filter:focus-within::before,
		.filter:focus-within + .filter::before,
		.filter:has(.input__field:focus) + .filters__wrapper--mobile > .filter:first-child::before,
		.popover__trigger--primary[data-state='open'] + div + .filter::before,
		.popover__trigger--primary:focus-within + .filter::before {
			background-color: transparent;
		}
	}

	&__tags {
		width: 100%;
	}
}
</style>
