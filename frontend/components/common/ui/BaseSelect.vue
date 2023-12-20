<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components';
import type { PropType } from 'vue';
import { ref } from 'vue';

const props = defineProps({
	className: {
		type: String,
		default: ''
	},
	modelValue: {
		type: [String, Array] as PropType<string>,
		required: true
	},
	list: {
		type: [Array, String, Set] as PropType<
			string | string[] | { [key: string]: string }[] | Set<string>
		>,
		required: true
	},
	multiply: {
		// множественный выбор
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
	name: {
		type: String,
		required: true
	},
	appearance: {
		type: String as PropType<'border' | 'no-border'>,
		default: 'border'
	},
	placeholder: {
		type: String,
		default: ''
	},
	label: {
		type: String,
		default: ''
	},
	disabled: {
		type: Boolean,
		default: false
	},
	inputReadonly: {
		type: Boolean,
		default: false
	},
	dropdownPosition: {
		// позиционирование дропдауна по правому/левому крою инпута
		type: String as PropType<'left' | 'right'>,
		default: 'left'
	},
	hasIconItems: {
		// добавление иконок в список (иконки должны быть сохранены в отдельной папке с названием, идентичным props.name, и называться соответственно айтему)
		type: Boolean,
		default: false
	},
	error: {
		type: String,
		default: ''
	},
	required: {
		type: Boolean,
		default: false
	}
});

const isOpen = ref(false);

const emit = defineEmits(['update:model-value']);

const model = computed<string | string[]>({
	get() {
		return props.modelValue ? props.modelValue : props.multiply ? ([] as string[]) : '';
	},
	set(value) {
		emit('update:model-value', value);
		return value;
	}
});

const modelSingle = computed<string>({
	get() {
		return props.modelValue ? (props.modelValue as string) : '';
	},
	set(value) {
		emit('update:model-value', value);
		return value;
	}
});

const openSelect = () => {
	if (props.disabled) return;
	isOpen.value = true;
};

const closeSelect = () => {
	isOpen.value = false;
};

const onClickOutsideList = () => {
	if (props.multiply) {
		closeSelect();
	}
	isOpen.value ? closeSelect() : null;
};

const clearModel = () => {
	model.value = [];
	isOpen.value = true;
};

const showInputValueIcon = computed(() => {
	if (!props.multiply) {
		const needIcon = Array.isArray(props.list)
			? Array.from(props.list as string[]).includes(props.modelValue as string)
			: Object.values(props.list).includes(props.modelValue);
		return props.hasIconItems && needIcon;
	}
});
</script>

<template>
	<div :class="['select__wrapper', { className: className }]">
		<template v-if="multiply">
			<CommonButton
				button-kind="multiselect"
				:button-text="getFilterPlaceholder(multiply, name, list, model, showKey, returnKey)"
				:filled="!!model.length"
				:class="{ 'select__field--green-border': isOpen }"
				@click="openSelect"
			/>
			<CommonButton
				v-if="model.length"
				is-icon
				icon-name="close"
				:interactive="false"
				class="select__clear-button"
				@click="clearModel"
			/>
		</template>
		<CommonUiBaseInput
			v-else
			v-model="modelSingle"
			v-on-click-outside="closeSelect"
			:name="name"
			:label="label"
			:disabled="disabled"
			:placeholder="placeholder"
			:error="error"
			:required="required"
			:input-readonly="inputReadonly"
			icon-name="container"
			:appearance="appearance"
			:has-value-icon="showInputValueIcon"
			:aria-expanded="isOpen"
			:class="{ 'select__field--green-border': isOpen }"
			@click="openSelect"
		/>
		<div
			v-if="isOpen && list"
			v-on-click-outside="onClickOutsideList"
			:class="['select__list-box', `select__list-box--${dropdownPosition}`]"
		>
			<ul class="select__list">
				<li
					v-for="item in list"
					:key="item[returnKey] ?? item"
					class="select__list-item list-item"
					@click="multiply ? null : emit('update:model-value', item[returnKey] ?? item)"
				>
					<CommonUiRowSelectItem
						v-model="model"
						:label="item[showKey] ?? item"
						:value="item[returnKey] ?? item"
						:multiply="multiply"
					/>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="less" scoped>
.select {
	&__wrapper {
		width: 100%;
		position: relative;
	}

	&__field {
		&--green-border {
			border-color: var(--color-accent-green-main);
		}
	}

	&__clear-button {
		position: absolute;
		top: 8px;
		right: 12px;
	}

	&__box {
		position: static;
	}

	&__list-box {
		position: absolute;
		top: calc(100% + 5px);
		display: flex;
		flex-direction: column;
		max-width: 100%;
		min-width: 267px;
		min-height: 202px;
		padding: 14px 0;
		background-color: var(--color-white);
		box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14);
		max-height: 200px;
		z-index: 99;
		border-radius: 8px;

		&--left {
			left: 0;
		}

		&--right {
			right: 0;
		}
	}

	&__list {
		height: 100%;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		overflow-x: hidden;
	}

	&__list::-webkit-scrollbar {
		width: 1px;
		background-color: var(--color-white);
		border-radius: 5px;
		height: 200px;
	}

	&__list::-webkit-scrollbar-thumb {
		width: 1px;
		height: 20px;
		background: var(--color-input-field);
		border-radius: 5px;
	}

	&__list::-webkit-scrollbar-track {
		background-color: var(--color-white);
	}
}

.list-item {
	display: flex;
	align-items: center;
	padding: 5px 5px 5px 16px;
	cursor: pointer;
	max-width: 100%;

	transition: background-color 0.3s ease;

	&:hover {
		background-color: var(--color-accent-green-main-40);
	}

	&:has(.checkbox-row) {
		padding: 0;
	}

	& > .checkbox-row {
		padding: 5px 5px 5px 16px;
	}

	&__icon {
		margin-right: 4px;
	}
}
</style>
