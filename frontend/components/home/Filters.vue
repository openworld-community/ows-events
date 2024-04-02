<script
	setup
	lang="ts"
>
import dayjs from 'dayjs';
import { useFilterStore } from '../../stores/filter.store';
import { debouncedWatch } from '@vueuse/core';

const desktop = inject('desktop')

const filterStore = useFilterStore();

const route = useRoute();

onBeforeMount(async () => {
	//TODO костыль, иначе при ините страницы не достается value из запроса
	if (process.server) return;

	setTimeout(async () => {
		await filterStore.getFilteredEvents();
		filterStore.$patch({ loading: true });
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
				search: filters.searchLine || undefined,
				city: filters.city || undefined,
				tags: filters.tags.join(', ') || undefined,
				// может приходить Invalid Date
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
	<section
		class="filters"
		:style="filterStore.usedTags.length ? { rowGap: desktop ? 'calc((var(--gap) * 3)' : 'var(--gap)' } : null"
	>
		<div class="filters__wrapper">
			<CommonUiFilter
				filter-type="input"
				name="searchLine"
				icon-name="search"
				no-separator
			/>
			<div class="filters__wrapper--mobile">
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
		</div>
		<ul
			v-if="filterStore.usedTags.length"
			class="filters__tags"
		>
			<li
				v-for="(tag, index) in filterStore.usedTags"
				:key="index"
			>
				<CommonUiFilter
					name="tags"
					:tag="tag"
					filter-type="tag"
				/>
			</li>
		</ul>
	</section>
</template>

<style
	scoped
	lang="less"
>
.filters {
	--gap: 10px;

	display: grid;
	width: 100%;
	max-width: 1200px;
	grid-template-rows: auto auto;
	grid-template-columns: 1fr 1fr 1fr;
	column-gap: var(--gap);

	margin-bottom: calc(var(--gap) * 2);

	@media (max-width: 768px) {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: repeat(2, auto);
		row-gap: 0;
		column-gap: 0;

		&:deep(.filters__search) {
			grid-column: span 2;
		}
	}

	&__wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		width: 100%;
		grid-column: span 3;
		gap: var(--gap);

		@media (min-width: 1440px) {
			background-color: var(--color-white);
			box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14);
			border-radius: 8px;
		}

		@media (max-width: 768px) {
			& {
				gap: 0;
				row-gap: var(--gap);
				grid-template-columns: 1fr 1fr;
			}
		}

		@media (min-width: 1440px) {
			align-items: center;
			margin-top: 0;
			gap: 0;
		}

		&--mobile {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-column: span 2;
			gap: var(--gap);

			@media (min-width: 1440px) {
				gap: 0;
			}

			@media (max-width: 768px) {
				grid-column: span 3;
			}

			@media (max-width: 668px) {
				&:deep(.calendar) {
					max-width: unset;
				}
			}

			@media (max-width: 550px) {
				grid-column: span 3;
				display: grid;
				grid-template-columns: 1fr;
				column-gap: var(--gap);
			}
		}
	}

	&__tags {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		gap: calc(var(--gap));

		grid-column: span 3;
	}
}

.date__wrapper {
	display: flex;
}
</style>
