<script setup lang="ts">
import type { PropType } from 'vue';
import { useFilterStore } from '../../../stores/filter.store';

defineProps({
	filterType: {
		type: String as PropType<'input' | 'select'>,
		required: true
	},
	// должен соответствовать названию в filter.store и ключу в файлах i18n/home[filter]
	name: {
		type: String,
		required: true
	},
	list: {
		type: Array as PropType<string[] | { [key: string]: string }[]>,
		default: () => []
	},
	// для объектов: ключ значения, которое нужно возвращать
	returnKey: {
		type: String,
		default: ''
	},
	// для объектов: ключ значения, которое нужно показывать в списке
	showKey: {
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
	// если фильтр первый в строке на десктопе
	noSeparator: {
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
	<template v-if="filterType === 'select'">
		<template v-if="mobile">
			<CommonButton
				button-kind="filter"
				icon-name="container"
				:button-text="
					filterStore.filters[name]
						? filterStore.filters[name]
						: $t(`home.filter.${name}.placeholder`)
				"
				:filled="!!filterStore.filters[name]"
				:is-disabled="disabled"
				:alt="$t(`home.filter.${name}.aria`)"
				class="filter"
				@click="emit('onFilterButtonClick')"
			/>
			<ModalFilter
				v-if="showModal"
				:filter-list="filterStore.modal.list"
				:filter-type="filterStore.modal.type"
				:return-key="returnKey"
				:show-key="showKey"
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
			:disabled="disabled"
			appearance="no-border"
			:dropdown-position="dropdownPosition"
			:aria-label="$t(`home.filter.${name}.aria`)"
		/>
	</template>
</template>

<style scoped lang="less">
.filter {
	@media (max-width: 767px) {
		&.button {
			max-width: 32.6%;

			& > :deep(.button__content) {
				display: inline-block;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	@media (min-width: 1440px) {
		width: 50%;

		&:deep(.input__button) {
			top: 25px;
		}

		&:deep(.input__field) {
			height: 72px;
		}
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
		//если поле внутри имеет инпут в фокусе, а в разметке рядом есть еще одно поле
	.filter:has(input:focus) + .filter::before,
		//если поле внутри имеет инпут в фокусе, а в разметке рядом есть враппер с полями, то у первого child
	.filter:has(input:focus) + .filters__wrapper .filter:first-child::before,
		//если враппер имеет последнее child поле с инпутом в фокусе и рядом еще один враппер, то у первого child
	.filters__wrapper:has(.filter:last-child input:focus) + .filters__wrapper .filter:first-child::before,
		//если враппер имеет последнее child поле с инпутом в фокусе и рядом есть еще одно поле
	.filters__wrapper:has(.filter:last-child input:focus) + .filter::before
		//псевдоэлементы ::before становятся прозрачными
	{
		background-color: transparent;
	}

	//При добавлении компонентов четко соблюдать наименования классов и компоновку
}
</style>
