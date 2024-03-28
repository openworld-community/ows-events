<script
	setup
	lang="ts"
>
import dayjs from 'dayjs';
import { useFilterStore } from '../../stores/filter.store';
import { debouncedWatch } from '@vueuse/core';

const filterStore = useFilterStore();

const route = useRoute();

// от инжекта можно избавиться, если переделать модалку города на мобилке
const mobile = inject('mobile')

onBeforeMount(async () => {
	//TODO костыль, иначе при ините страницы не достается value из запроса
	if (process.server) return;

	setTimeout(async () => {
		await filterStore.getFilteredEvents();
		await filterStore.getUsedFilters();
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
</script>

<template>
	<section class="filters">
		<div class="filters__wrapper">
			<CommonUiFilter
				filter-type="input"
				name="searchLine"
				icon-name="search"
				no-separator
			/>

			<div class="filters__wrapper--mobile">
				<CommonUiFilter
					:key="mobile ? 'mobile-city' : 'other-city'"
					filter-type="librarySelect"
					name="city"
					:list="filterStore.usedCities"
					:disabled="!filterStore.usedCities.length"
					@on-filter-button-click="openFilterModal('city', filterStore.usedCities ?? [])"
				/>
				<CommonUiFilter
					filter-type="date"
					name="date"
					:range="true"
				/>
			</div>
		</div>
		<ul class="filters__tags">
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
	--gap: 8px;

	display: grid;
	grid-template-rows: auto auto;
	grid-template-columns: 1fr 1fr 1fr;
	column-gap: var(--gap);
	row-gap: calc(var(--gap) * 3);

	margin-bottom: calc(var(--gap) * 4);

	@media (max-width: 550px) {
		grid-template-rows: repeat(3, auto);
		row-gap: 0;

		&:deep(.filters__search) {
			margin-bottom: 8px;
			grid-column: span 3;
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

		@media (max-width: 550px) {
			& {
				align-items: flex-start;
				flex-wrap: wrap;
				gap: 0;
				margin-bottom: calc(var(--gap) * 4);
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

			@media (max-width: 668px) {
				&:deep(.calendar) {
					max-width: unset;
				}
			}

			@media (max-width: 550px) {
				grid-column: span 3;
				display: grid;
				grid-template-columns: 1fr 1fr;
				column-gap: var(--gap);
			}
		}
	}

	&__tags {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 5px;

		grid-column: span 3;
	}
}

.date__wrapper {
	display: flex;
}
</style>
