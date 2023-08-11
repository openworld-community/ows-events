<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components';
import type { PropType } from 'vue';

const props = defineProps({
	className: {
		type: String as PropType<string>,
		default: ''
	},
	modelValue: {
		type: String as PropType<string>,
		required: true
	},
	list: {
		type: [Array, String, Set] as PropType<string[] | Set<string>>,
		default: ''
	},
	name: {
		type: String as PropType<string>,
		required: true
	},
	placeholder: {
		type: String as PropType<string>,
		default: ''
	},
	label: {
		type: String as PropType<string>,
		default: ''
	},
	disabled: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	dropdownPosition: {
		// позиционирование дропдауна по правому/левому крою инпута
		type: String as PropType<'left' | 'right'>,
		default: 'left'
	},
	error: {
		type: String as PropType<string>,
		default: ''
	},
	required: {
		type: Boolean as PropType<boolean>,
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

const filteredList = computed(() =>
	(Array.isArray(props.list) ? props.list : [...props.list]).filter(
		(item) =>
			item.toLowerCase().startsWith(props.modelValue.toLowerCase()) &&
			item !== props.modelValue
	)
);
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
			icon-name="container"
			:aria-expanded="isOpen"
			@update:model-value="emit('update:model-value', $event)"
			@click="openSelect"
		/>

		<div
			v-if="isOpen && filteredList.length"
			:class="['select__list-box', `select__list-box--${dropdownPosition}`]"
		>
			<ul class="select__list benefits">
				<li
					v-for="item in filteredList"
					:key="item"
					class="select__list-item"
					@click="emit('update:model-value', item)"
				>
					{{ item }}
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
		top: 50px;
		max-width: 100%;
		min-width: 267px;
		height: 202px;
		padding: 14px 16px;
		background-color: var(--color-white);
		max-height: 200px;
		z-index: 99;
		border-radius: 8px;
		border: 1px solid #ccc;

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
		overflow-x: hidden;

		& li {
			transition: background-color 200ms;
			cursor: pointer;
			border-radius: 5px;
			max-width: 100%;

			&:hover {
				background-color: var(--color-background-secondary);
			}
		}
	}

	&__list::-webkit-scrollbar {
		width: 5px;
		background-color: var(--color-white);
		border-radius: 5px;
		height: 200px;
	}

	&__list::-webkit-scrollbar-thumb {
		width: 5px;
		background: var(--color-input-field);
		border-radius: 5px;
		height: 20px;
	}

	&__list::-webkit-scrollbar-track {
		background-color: var(--color-white);
	}

	&__list-item {
		padding: 5px;
	}
}
</style>
