<script
	setup
	lang="ts"
>
import dayjs from 'dayjs';
import { useFilterStore } from '../../stores/filter.store';
import { debouncedWatch } from '@vueuse/core';

const filterStore = useFilterStore();

const route = useRoute();
const tablet = inject('tablet');

onBeforeMount(() => {
	//TODO костыль, иначе при ините страницы не достается value из запроса
	if (process.client) {
		setTimeout(async () => {
			await filterStore.getFilteredEvents();
			await filterStore.getUsedFilters();
			if (filterStore.filters.country)
				await filterStore.getUsedCitiesByCountry(filterStore.filters.country);
		});
	}
});

watch(
	() => filterStore.filters,
	async (filters) => {
		navigateTo({
			query: {
				...route.query,
				search: filters.searchLine || undefined,
				country: filters.country || undefined,
				city: filters.city || undefined,
				tags: filters.tags.join(', ') || undefined,
				// может приходить Invalid Date
				startDate: filters.startDate ? dayjs(filters.startDate).format('YYYY-MM-DD') : undefined,
				endDate: filters.endDate ? dayjs(filters.endDate).format('YYYY-MM-DD') : undefined
			}
		});
		if (filters.country) {
			await filterStore.getUsedCitiesByCountry(filters.country);
		}
		if (
			!filters.country ||
			!filterStore.usedCitiesByCountry[filters.country].includes(filters.city)
		)
			filterStore.filters.city = '';
	},
	{ deep: true }
);

debouncedWatch(
	filterStore.filters,
	async () => {
		await filterStore.getFilteredEvents();
	},
	{ debounce: 700, maxWait: 1000 }
);

const openFilterModal = (
	type: string,
	list: string[] | { [key: string]: string }[],
	multiple = false,
	showKey?: string,
	returnKey?: string
) => {
	if (list.length) {
		filterStore.modal.list = list;
		filterStore.modal.multiple = multiple;
		filterStore.modal.type = type;
		filterStore.modal.showKey = showKey;
		filterStore.modal.returnKey = returnKey;
		filterStore.$patch({ modal: { show: true } });
	}
};
const mobile = inject('mobile');
</script>

<template>
	<section class="filters">
		<CommonUiFilter
			filter-type="input"
			name="searchLine"
			icon-name="search"
			no-separator
		/>
		<div class="filters__wrapper">
			<CommonUiFilter
				:key="mobile ? 'mobile-country' : 'other-country'"
				filter-type="librarySelect"
				name="country"
				:list="filterStore.usedCountries"
				:disabled="!filterStore.usedCountries.length"
				@on-filter-button-click="openFilterModal('country', filterStore.usedCountries)"
			/>
			<CommonUiFilter
				:key="mobile ? 'mobile-city' : 'other-city'"
				filter-type="librarySelect"
				name="city"
				:list="filterStore.usedCitiesByCountry[filterStore.filters.country] ?? []"
				:disabled="!filterStore.filters.country ||
					(!filterStore.usedCitiesByCountry[filterStore.filters.country] &&
						!filterStore.filters.city)
					"
				@on-filter-button-click="
					openFilterModal(
						'city',
						filterStore.usedCitiesByCountry?.[filterStore.filters.country] ?? []
					)
					"
			/>
			<CommonUiFilter
				:key="mobile ? 'mobile-tags' : 'other-tags'"
				filter-type="select"
				name="tags"
				:list="filterStore.usedTags"
				multiple
				show-key="name"
				return-key="key"
				:disabled="!filterStore.usedTags.length"
				:dropdown-position="tablet ? 'right' : 'left'"
				@on-filter-button-click="
					openFilterModal('tags', filterStore.usedTags, true, 'name', 'key')
					"
			/>
			<CommonUiFilter
				filter-type="date"
				name="startDate"
			/>
			<CommonUiFilter
				filter-type="date"
				name="endDate"
			/>
		</div>
	</section>
</template>

<style
	scoped
	lang="less"
>
.filters {
	display: flex;
	width: 100%;
	flex-direction: column;

	--gap: 8px;

	@media (min-width: 1440px) {
		max-width: calc(100% - 2 * var(--padding-side));
		flex-direction: row;
		align-items: center;
		background-color: var(--color-white);
		box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14);
		border-radius: 8px;
	}

	&__wrapper {
		display: flex;
		width: 100%;
		margin-top: var(--gap);
		gap: var(--gap);
		height: 100%;

		@media (max-width: 767px) {
			&:deep(.button__filter) {
				max-width: calc((100% - var(--gap) * 2) / 3);
			}

			&:deep(.select) {
				max-width: calc((100% - var(--gap) * 2) / 3);
			}
		}

		@media (max-width: 668px) {
			& {
				flex-wrap: wrap;
				row-gap: var(--gap);
			}
		}

		@media (min-width: 768px) {

			&:deep(.filter),
			&:deep(.button__multiselect) {
				max-width: 20%;
			}
		}

		@media (min-width: 1440px) {
			align-items: center;
			margin-top: 0;
			gap: 0;

			&:deep(.filter),
			&:deep(.button__multiselect) {
				max-width: 15%;
			}
		}
	}
}

.date__wrapper {
	display: flex;
}
</style>
