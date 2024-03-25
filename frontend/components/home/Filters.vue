<script setup lang="ts">
import dayjs from 'dayjs';
import { useFilterStore } from '../../stores/filter.store';
import { debouncedWatch } from '@vueuse/core';

const filterStore = useFilterStore();

const route = useRoute();
const tablet = inject('tablet');

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
				:key="mobile ? 'mobile-city' : 'other-city'"
				filter-type="librarySelect"
				name="city"
				:list="filterStore.usedCities"
				:disabled="!filterStore.usedCities.length"
				@on-filter-button-click="openFilterModal('city', filterStore.usedCities ?? [])"
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
				name="date"
				:range="true"
			/>
		</div>
	</section>
</template>

<style scoped lang="less">
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
			&:deep(.mobile-filter) {
				max-width: calc((100% - var(--gap) * 2) / 3);
			}

			&:deep(.select) {
				max-width: calc((100% - var(--gap) * 2) / 3);
			}

			&:deep(.calendar) {
				max-width: 42%;
			}
		}

		@media (max-width: 550px) {
			& {
				flex-wrap: wrap;
				row-gap: var(--gap);
			}

			&:deep(.filter),
			&:deep(.button__multiselect) {
				max-width: calc((100% - var(--gap)) / 2);
			}
			&:deep(.mobile-filter) {
				min-width: calc((100% - var(--gap)) / 2);
			}

			&:deep(.calendar) {
				max-width: 100%;
			}
		}

		@media (min-width: 768px) {
			&:deep(.filter),
			&:deep(.button__multiselect) {
				max-width: 27.5%;
			}

			&:deep(.calendar) {
				max-width: 45%;
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
