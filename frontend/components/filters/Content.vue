<script setup lang="ts">
import dayjs from 'dayjs';

import type { TagList } from '../../../common/const/tags';
import { RoutePathEnum } from '~/constants/enums/route';

const route = useRoute();
const mobile = inject('mobile');

defineProps({
	tagList: {
		type: Array as PropType<TagList>,
		default: () => []
	},
	filterCities: {
		type: [Array, String, Set] as PropType<string | string[] | { [key: string]: string }[]>,
		default: () => []
	},
	currentCity: {
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
	<div class="main-filters">
		<FiltersUiLinkSelectWrapper
			v-if="!mobile"
			:placeholder="$t('city.filters.city.placeholder')"
			:current-text="currentCity"
			:disabled="filterCities.length === 0"
			:aria-label="$t(`home.filter.city.aria`)"
		>
			<FiltersUiListWithoutLabel
				:options="filterCities"
				:path="RoutePathEnum.CITY"
			/>
		</FiltersUiLinkSelectWrapper>
		<LibraryMobileFilter
			v-else
			:placeholder="$t('city.filters.city.placeholder')"
			:options="filterCities"
			:path="RoutePathEnum.CITY"
			:current-text="currentCity"
			:title="$t('home.filter.city.title')"
			:disabled="filterCities.length === 0"
		/>

		<LazyCommonUiDateTimepicker
			v-model="dates"
			type="date"
			:range="true"
			is-filter
			appearance="no-border"
			class="filter"
			name="date"
			:placeholder="$t(`home.filter.date.placeholder`)"
			:aria-label="$t(`home.filter.date.aria`)"
			:min-date="new Date(roundTime(Date.now(), 10))"
		/>
	</div>
	<div class="main-filters__tags">
		<FiltersTags
			v-if="tagList.length !== 0"
			v-model="tags"
			:size="mobile ? 'small' : 'standard'"
			:tag-list="tagList"
		/>
	</div>
</template>
<style lang="less" scoped>
.main-filters {
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
			//border-color: transparent;
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

	&__tags {
		width: 100%;
	}
}
@media (min-width: 1440px) {
	// прозраные сепараторы при фокусе первые два отвечают за пикер

	.filter:focus-within::before,
	.filter:focus-within + .filter::before,
	.filter:has(.input__field:focus) + .filters__wrapper--mobile > .filter:first-child::before,
	.popover__trigger--primary[data-state='open'] + div + .filter::before,
	.popover__trigger--primary:focus-within + .filter::before {
		background-color: transparent;
	}
}
</style>
