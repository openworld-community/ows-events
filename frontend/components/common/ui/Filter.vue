<script setup lang="ts">
import type { PropType } from 'vue';
import { useFilterStore } from '../../../stores/filter.store';
import { getFilterPlaceholder } from '../../../utils/texts';

defineProps({
	// date: {
	// 	type: Date as PropType<Date>,
	// 	default: ''
	// },
	filterType: {
		type: String as PropType<'input' | 'select' | 'date'>,
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
		appearance="no-border"
		class="filter"
		:name="name"
		:placeholder="$t(`home.filter.${name}.placeholder`)"
		:aria-label="$t(`home.filter.${name}.aria`)"
		:min-date="new Date(roundTime(Date.now(), 10))"
		:min-time="name === 'startDate' ? { hours: 0, minutes: 0 } : { hours: '23', minutes: '59' }"
	/>
	<template v-if="filterType === 'select'">
		<template v-if="mobile">
			<CommonButton
				button-kind="filter"
				icon-name="container"
				:button-text="
					getFilterPlaceholder(
						multiple,
						name,
						list,
						filterStore.filters[name],
						showKey,
						returnKey
					)
				"
				:filled="
					multiple ? !!filterStore.filters[name].length : !!filterStore.filters[name]
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

<style scoped lang="less">
.filter {
	@media (min-width: 1440px) {
		width: 50%;
		min-width: 20%;

		&:deep(.input__button),
		&:deep(.button__icon),
		&:deep(.select__clear-button) {
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
	}

	// Скрытие сепараторов при фокусе (в т.ч. псевдоэлементов соседнего компонента)
	//если поле внутри имеет инпут в фокусе
	.filter:has(input:focus)::before,
	.filter:has(.button__multiselect:focus)::before,
	.filter:has(.select__field--green-border)::before,
	//если поле внутри имеет инпут в фокусе, а в разметке рядом есть еще одно поле
	.filter:has(input:focus)+.filter::before,
	// .filter:has(.button__multiselect)+.filter::before,
	.filter:has(.select__field--green-border)+.filter::before,
	//если поле внутри имеет инпут в фокусе, а в разметке рядом есть враппер с полями, то у первого child
	.filter:has(input:focus)+.filters__wrapper .filter:first-child::before,
	.filter:has(.button__multiselect)+.filters__wrapper .filter:first-child::before,
	.filter:has(.select__field--green-border)+.filters__wrapper .filter:first-child::before,
	//если враппер имеет последнее child поле с инпутом в фокусе и рядом еще один враппер, то у первого child
	.filters__wrapper:has(.filter:last-child input:focus)+.filters__wrapper .filter:first-child::before,
	.filters__wrapper:has(.button__multiselect)+.filters__wrapper .filter:first-child::before,
	.filters__wrapper:has(.select__field--green-border)+.filters__wrapper .filter:first-child::before,
	//если враппер имеет последнее child поле с инпутом в фокусе и рядом есть еще одно поле
	.filters__wrapper:has(.filter:last-child input:focus)+.filter::before,
	.filters__wrapper:has(.button__multiselect)+.filter::before,
	.filters__wrapper:has(.select__field--green-border)+.filter::before //псевдоэлементы ::before становятся прозрачными
	{
		background-color: transparent;
	}

	//При добавлении компонентов четко соблюдать наименования классов и компоновку
}
</style>
