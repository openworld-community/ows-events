<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components';
import type { PropType } from 'vue';

const props = defineProps({
	className: {
		type: String,
		default: ''
	},
	modelValue: {
		type: String,
		required: true
	},
	list: {
		type: [Array, String, Set] as PropType<string | string[] | { [key: string]: string }[] | Set<string>>,
		required: true
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
	// добавление иконок в список (иконки должны быть сохранены в отдельной папке с названием, идентичным props.name, и называться соответственно айтему)
	hasIconItems: {
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

const emit = defineEmits<{
	'update:model-value': [model: typeof props.modelValue];
}>();

const openSelect = () => {
	if (props.disabled) return;
	isOpen.value = true;
};

const closeSelect = () => {
	isOpen.value = false;
};

const showInputValueIcon = computed(() => {
	const needIcon = Array.isArray(props.list)
		? Array.from(props.list as string[]).includes(props.modelValue)
		: Object.values(props.list).includes(props.modelValue);
	return props.hasIconItems && needIcon;
});
</script>

<template>
	<div
		class="select__wrapper"
		:class="{ [className ?? '']: className }"
	>
		<CommonUiBaseInput
			v-on-click-outside="closeSelect"
			:name="name"
			:label="label"
			:disabled="disabled"
			:placeholder="placeholder"
			:error="error"
			:model-value="modelValue"
			:required="required"
			:input-readonly="inputReadonly"
			icon-name="container"
			:appearance="appearance"
			:has-value-icon="showInputValueIcon"
			:aria-expanded="isOpen"
			@update:model-value="emit('update:model-value', $event)"
			@click="openSelect"
		/>

		<div
			v-if="isOpen && list"
			:class="['select__list-box', `select__list-box--${dropdownPosition}`]"
		>
			<ul class="select__list">
				<li
					v-for="item in list"
					:key="item[returnKey] ?? item"
					class="select__list-item list-item"
					@click="emit('update:model-value', item[returnKey] ?? item)"
				>
					<CommonIcon
						v-if="hasIconItems"
						class="list-item__icon"
						:name="`${name}/${item[returnKey] ?? item}`"
					/>
					<span>{{ item[showKey] ?? item }}</span>
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

	&__box {
		position: static;
	}

	&__list-box {
		position: absolute;
		top: calc(100% + 5px);
		max-width: 100%;
		min-width: 267px;
		height: 202px;
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

		& li {
			padding-left: 16px;
			cursor: pointer;
			max-width: 100%;

			transition: background-color 0.3s ease;

			&:hover {
				background-color: var(--color-accent-green-main-40);
			}
		}
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
	padding: 5px;

	&__icon {
		margin-right: 4px;
	}
}
</style>
