<script setup lang="ts">
import { useFilterStore } from '../../stores/filter.store';

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

let timeout = null;
watch(
	() => filterStore.filters,
	async (filters) => {
		navigateTo({
			query: {
				...route.query,
				search: filters.searchLine || undefined,
				country: filters.country || undefined,
				city: filters.city || undefined
			}
		});
		if (filters.country) {
			await filterStore.getUsedCitiesByCountry(filters.country);
		}
		if (!filters.country) filterStore.filters.city = '';
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(async () => await filterStore.getFilteredEvents(), 500);
	},
	{ deep: true }
);

const openFilterModal = (type: string, list: string[]) => {
	if (list.length) {
		filterStore.modal.list = list;
		filterStore.modal.type = type;
		filterStore.$patch({ modal: { show: true } });
	}
};

const usedTags = computed(() => {
	return filterStore.usedTags.map((elem) => {
		return elem.name;
	});
});
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
				filter-type="select"
				name="country"
				:list="filterStore.usedCountries"
				:disabled="!filterStore.usedCountries"
				@on-filter-button-click="openFilterModal('country', filterStore.usedCountries)"
			/>
			<CommonUiFilter
				:key="mobile ? 'mobile-city' : 'other-city'"
				filter-type="select"
				name="city"
				:list="filterStore.usedCitiesByCountry[filterStore.filters.country] ?? []"
				:disabled="
					!filterStore.filters.country ||
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
				:list="usedTags"
				show-key="name"
				return-key="name"
				:disabled="!filterStore.usedTags.length"
				:dropdown-position="tablet ? 'right' : 'left'"
				@on-filter-button-click="openFilterModal('tags', usedTags)"
			/>
		</div>
	</section>
</template>

<style scoped lang="less">
.filters {
	display: flex;
	width: 100%;
	flex-direction: column;

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
		margin-top: 8px;
		gap: 2%;

		@media (min-width: 1440px) {
			align-items: center;
			margin-top: 0;
			gap: 0;
		}
	}
}
</style>