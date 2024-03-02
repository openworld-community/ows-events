<script
	setup
	lang="ts"
>
import type { PropType } from 'vue';
import type { TCalendarDisabledButtons } from '../../../../common/types/filters'
import { useFilterStore } from '../../../stores/filter.store';
import { getFilterPlaceholder } from '../../../utils/texts';


const props = defineProps({
	filterType: {
		type: String as PropType<'input' | 'select' | 'date' | 'librarySelect'>,
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
	multiple: {
		type: Boolean,
		default: false
	},
	returnKey: {
		// для объектов: ключ значения, которое нужно возвращать
		type: String,
		default: ''
	},
	showKey: {
		// для объектов: ключ значения, которое нужно показывать в списке
		type: String,
		default: ''
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

const emit = defineEmits(['onFilterButtonClick']);

const mobile = inject('mobile');
const filterStore = useFilterStore();

const showModal = computed(() => filterStore.modal.show);

const computedMinDate = computed(() => {
	const startDay = new Date(filterStore.filters.startDate)
	const nextDay = new Date(new Date().setDate(startDay.getDate() + 1))

	return props.name === 'endDate'
		&& filterStore.filters.startDate
		? nextDay
		: new Date(roundTime(Date.now(), 10))
})

const checkNull = (payload: Date | null) => {
	if (payload === null && props.name === 'endDate') {
		// для startDate new Date(null) не страшен
		// для endDate страшен -> будет 01 jan 1970
		filterStore.filters.endDate = ''
	}
}

const isDisabledButtons = computed((): TCalendarDisabledButtons => {
	const isEndDate = props.name === 'endDate'
	const today = new Date()
	const tomorrow = new Date(new Date().setDate(today.getDate() + 1))
	// обе кнопки !disabled
	const result = {
		today: false,
		tomorrow: false
	}

	// кнопка сегодня disabled
	if (isEndDate && today.getTime() < computedMinDate.value.getTime()) {
		result.today = true
	}

	// обе кнопки disabled
	if (isEndDate && tomorrow.getTime() < computedMinDate.value.getTime()) {
		result.today = true
		result.tomorrow = true
	}

	return result
})
</script>

<template>
	<CommonUiBaseInput
		v-if="filterType === 'input'"
		v-model="filterStore.filters[name]"
		:class="['filter', { 'filter--no-separator': noSeparator }]"
		:name="name"
		:placeholder="$t(`home.filter.${name}.placeholder`)"
		:disabled="disabled"
		:icon-name="iconName"
		appearance="no-border"
		:aria-label="$t(`home.filter.${name}.aria`)"
	/>
	<CommonUiDateTimepicker
		v-else-if="filterType === 'date'"
		v-model="filterStore.filters[name]"
		type="date"
		is-filter
		appearance="no-border"
		class="filter"
		:name="name"
		:placeholder="$t(`home.filter.${name}.placeholder`)"
		:aria-label="$t(`home.filter.${name}.aria`)"
		:min-date="computedMinDate"
		:min-time="name === 'startDate' ? { hours: 0, minutes: 0 } : { hours: '23', minutes: '59' }"
		:disabled-buttons="isDisabledButtons"
		@update:model-value="checkNull"
	/>
	<template v-if="filterType === 'select' || filterType === 'librarySelect'">
		<template v-if="mobile">
			<CommonButton
				button-kind="filter"
				icon-name="container"
				:button-text="getFilterPlaceholder(
			multiple,
			name,
			list,
			filterStore.filters[name],
			showKey,
			returnKey
		)
			"
				:filled="multiple ? !!filterStore.filters[name].length : !!filterStore.filters[name]
			"
				:is-disabled="disabled"
				:alt="$t(`home.filter.${name}.aria`)"
				class="filter"
				@click="emit('onFilterButtonClick')"
			/>
			<ModalFilter
				v-if="showModal"
				:filter-list="filterStore.modal.list"
				:filter-type="filterStore.modal.type"
				:multiple="filterStore.modal.multiple"
				:return-key="filterStore.modal.returnKey"
				:show-key="filterStore.modal.showKey"
			/>
		</template>
		<LibrarySelect
			v-else-if="filterType === 'librarySelect'"
			v-model="filterStore.filters[name]"
			:class="['filter', { 'filter--no-separator': noSeparator }]"
			:name="name"
			:placeholder="$t(`home.filter.${name}.placeholder`)"
			:options="list"
			:disabled="disabled"
			:no-border="'no-border' ? true : false"
			:aria-label="$t(`home.filter.${name}.aria`)"
		/>
		<CommonUiBaseSelect
			v-else
			v-model="filterStore.filters[name]"
			:show-key="showKey"
			:return-key="returnKey"
			:class="['filter', { 'filter--no-separator': noSeparator }]"
			:name="name"
			:placeholder="$t(`home.filter.${name}.placeholder`)"
			:list="list"
			:multiple="multiple"
			:disabled="disabled"
			appearance="no-border"
			:dropdown-position="dropdownPosition"
			:aria-label="$t(`home.filter.${name}.aria`)"
		/>
	</template>
</template>

<style
	scoped
	lang="less"
>
.filter {
	&:deep(.select__trigger--no-border) {
		max-width: 50%;
	}

	/* &:hover:deep(.input__field) {
		@media(hover: hover) {
			border-color: var(--color-accent-green-main)
		}
	} */

	@media (min-width: 1440px) {
		width: 50%;
		min-width: 20%;

		&:deep(.input__button),
		&:deep(.button__icon),
		&:deep(.select__clear-button) {
			top: 25px;
		}

		&:deep(.select__clear-btn) {
			top: 25px;
		}

		&:deep(.button__multiselect) {
			max-width: 20%;
		}

		&:deep(.input__field),
		&:deep(.button__multiselect) {
			height: 72px;
		}
	}

	&.button__filter {
		transition: unset;
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

		transition: backround-color, .15s ease-in-out;
	}

	// прозраные сепараторы при ховере/фокусе
	.filter:focus-within::before,
	.filter:focus-within+.filter::before,
	.filter:has(.input__field:focus)+.filters__wrapper>.filter:first-child::before {
		background-color: transparent;
	}
}
</style>
