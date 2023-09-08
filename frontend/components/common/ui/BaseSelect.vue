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
		type: [Array, String, Set] as PropType<string[] | Set<string>>,
		default: ''
	},
	name: {
		type: String,
		required: true
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
			:input-readonly="inputReadonly"
			icon-name="container"
			:has-value-icon="hasIconItems && Array.from(list).includes(modelValue)"
			:aria-expanded="isOpen"
			@update:model-value="emit('update:model-value', $event)"
			@click="openSelect"
		/>

		<div
			v-if="isOpen && filteredList.length"
			:class="['select__list-box', `select__list-box--${dropdownPosition}`]"
		>
			<ul class="select__list">
				<li
					v-for="item in filteredList"
					:key="item"
					class="select__list-item list-item"
					@click="emit('update:model-value', item)"
				>
					<CommonIcon
						v-if="hasIconItems"
						class="list-item__icon"
						:name="`${name}/${item}`"
					/>
					<span>{{ item }}</span>
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
		-webkit-overflow-scrolling: touch;
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
