<script
	setup
	lang="ts"
>
import type { PropType } from 'vue';
import { useFilterStore } from '../../../stores/filter.store';
import { getFilterPlaceholder } from '../../../utils/texts';

const props = defineProps({
	tag: {
		type: Object as PropType<{ name: string, key: string }>,
		default: () => { }
	},
	filterType: {
		type: String as PropType<'input' | 'select' | 'date' | 'librarySelect' | 'tag'>,
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
	},
	range: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['onFilterButtonClick']);

const mobile = inject('mobile');
const filterStore = useFilterStore();

const showModal = computed(() => filterStore.modal.show);

const isActive = ref<boolean>(false)

const handleTag = () => {
	if (isActive.value === false) {
		filterStore.filters.tags.push(props.tag.key)
	} else {
		filterStore.filters.tags = filterStore.filters.tags.filter(item => item !== props.tag.key)
	}

	isActive.value = !isActive.value
}

onMounted(() => {
	if (filterStore.filters.tags.includes(props.tag?.key)) {
		isActive.value = true
	}
})
</script>

<template>
	<CommonUiBaseInput
		v-if="filterType === 'input'"
		v-model="filterStore.filters[name]"
		:class="['filter', 'filters__search', { 'filter--no-separator': noSeparator }]"
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
		:range="range"
		is-filter
		appearance="no-border"
		class="filter"
		:name="name"
		:placeholder="$t(`home.filter.${name}.placeholder`)"
		:aria-label="$t(`home.filter.${name}.aria`)"
		:min-date="new Date(roundTime(Date.now(), 10))"
		:min-time="name === 'startDate' ? { hours: 0, minutes: 0 } : { hours: '23', minutes: '59' }"
	/>
	<template v-if="filterType === 'select' || filterType === 'librarySelect'">
		<template v-if="mobile && name !== 'city'">
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

		<LibraryMobileSelect
			v-else-if="mobile && name === 'city'"
			v-model="filterStore.filters[name]"
			:title="name"
			:name="name"
			:placeholder="$t(`home.filter.${name}.placeholder`)"
			:options="list"
			:disabled="disabled"
		/>

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
	</template>
	<CommonButton
		v-if="filterType === 'tag'"
		:button-kind="isActive ? 'dark' : 'ordinary'"
		:button-text="tag.name"
		:class="['filter', { 'filter--no-separator': noSeparator }]"
		:aria-label="tag.name"
		@click="handleTag"
	/>
</template>

<style
	scoped
	lang="less"
>
.filter {
	&:deep(.select__trigger--no-border) {
		max-width: 50%;
	}

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
	.filter:focus-within+.filter::before,
	.filter:has(.input__field:focus)+.filters__wrapper--mobile>.filter:first-child::before {
		background-color: transparent;
	}
}
</style>
