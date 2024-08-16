<script setup lang="ts">
import type { PropType } from 'vue';
import { useFilterStore } from '../../../stores/filter.store';
import { RoutePathEnum } from '~/constants/enums/route';

const props = defineProps({
	tag: {
		type: Object as PropType<{ name: string; key: string }>,
		default: () => {}
	},
	filterType: {
		type: String as PropType<'select' | 'date' | 'tag'>,
		required: true
	},

	name: {
		// должен соответствовать названию в filter.store и ключу в файлах i18n/home[filter]
		type: String,
		required: true
	},
	list: {
		type: Array as PropType<string[] | { [key: string]: string }[]>,
		default: () => []
	},
	disabled: {
		type: Boolean,
		default: false
	},
	iconName: {
		type: String,
		default: ''
	},
	noSeparator: {
		// если фильтр первый в строке на десктопе
		type: Boolean,
		default: false
	},
	dropdownPosition: {
		type: String as PropType<'left' | 'right'>,
		default: 'left'
	}
});

const mobile = inject('mobile');

const filterStore = useFilterStore();

const isActive = ref<boolean>(false);

onMounted(() => {
	if (filterStore.filters.tags.includes(props.tag?.key)) {
		isActive.value = true;
	}
});
</script>

<template>
	<CommonUiDateTimepicker
		v-if="filterType === 'date'"
		v-model="filterStore.filters[name]"
		type="date"
		:range="true"
		is-filter
		appearance="no-border"
		class="filter"
		:name="name"
		:placeholder="$t(`home.filter.${name}.placeholder`)"
		:aria-label="$t(`home.filter.${name}.aria`)"
		:min-date="new Date(roundTime(Date.now(), 10))"
		:min-time="name === 'startDate' ? { hours: 0, minutes: 0 } : { hours: '23', minutes: '59' }"
	/>
	<template v-if="filterType === 'select'">
		<FiltersUiLinkSelectWrapper
			v-if="!mobile && name === 'city'"
			:placeholder="$t('city.filters.city.placeholder')"
			:aria-label="$t(`home.filter.${name}.aria`)"
			:disabled="list.length === 0"
		>
			<FiltersUiListWithoutLabel
				:options="list"
				:path="RoutePathEnum.CITY"
			/>
		</FiltersUiLinkSelectWrapper>
		<LibraryMobileFilter
			v-else
			:placeholder="$t('city.filters.city.placeholder')"
			:options="list"
			:path="RoutePathEnum.CITY"
			:title="$t(`home.filter.${name}.title`)"
			:disabled="list.length === 0"
		/>
	</template>
	<HomeCollapsible v-if="filterType === 'tag'">
		<template #tags>
			<div>
				<div class="filter-tags">
					<CommonUiTag
						v-for="tagElem in filterStore.usedTags"
						:key="tagElem"
						v-model="filterStore.filters.tags"
						name="tags"
						:tag-key="tagElem"
						is-checkbox
						:size="mobile ? 'small' : 'standard'"
						appearance="filter"
						:aria-label="$t(`home.filter.${name}.aria`)"
					/>
				</div>
			</div>
		</template>
	</HomeCollapsible>
</template>

<style scoped lang="less">
.filter.select {
	width: 100%;
}

.filter {
	@media (min-width: 1440px) {
		&:deep(.input__field),
		&:deep(.button__multiselect) {
			height: 72px;
		}
	}

	&.button__filter {
		transition: unset;
	}
}

.filter-tags {
	display: flex;
	width: 100%;
	align-items: center;
	flex-wrap: wrap;
	gap: 8px;
	padding-bottom: 24px;

	@media (min-width: 1440px) {
		gap: 12px;
	}
}

@media (min-width: 1440px) {
	.filter:not(.filter--no-separator)::before {
		width: 1px;
		content: '';
		background-color: var(--color-text-secondary);
		height: 80%;
		position: absolute;
		top: 10%;
		left: -1px;

		transition: backround-color, 0.15s ease-in-out;
	}

	// прозраные сепараторы при фокусе
	.filter:focus-within::before,
	.filter:focus-within + .filter::before,
	.filter:has(.input__field:focus) + .filters__wrapper--mobile > .filter:first-child::before {
		background-color: transparent;
	}
}
</style>
