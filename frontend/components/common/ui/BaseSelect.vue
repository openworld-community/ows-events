<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components';

const props = defineProps<{
	className?: string;
	modelValue: string;
	list: string[] | Set<string>;
	name: string;
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	error?: string;
}>();

const isOpen = ref(false);

const emit = defineEmits<{
	'update:model-value': [model: typeof props.modelValue];
}>();

function openSelect() {
	if (props.disabled) return;
	isOpen.value = true;
}
function closeSelect() {
	isOpen.value = false;
}

const onRemove = () => {
	emit('update:model-value', '');
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
			@update:model-value="(value: typeof modelValue)=>emit('update:model-value',value)"
			@click="openSelect"
		>
			<template #icon-right>
				<button
					v-if="props.modelValue"
					@click.prevent="onRemove"
				>
					<CommonIcon
						name="delete"
						width="24"
						height="24"
						alt="Очистить"
					/>
				</button>

				<CommonIcon
					v-else
					name="container"
					width="24"
					height="24"
					alt="Открыть"
					@click.prevent="openSelect"
				/>
			</template>
		</CommonUiBaseInput>

		<div :class="`select__list-box ${isOpen && filteredList.length ? 'isOpen' : ''}`">
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
		//width: 100%;
		position: static;
	}

	&__list-box {
		display: none;
		position: absolute;
		top: 50px;
		left: 0;
		max-width: 100%;
		min-width: 267px;
		height: 202px;
		padding: 14px 16px;
		background-color: var(--color-white);
		max-height: 200px;
		z-index: 99;
		border-radius: 24px;
		border: 1px solid #ccc;
		&.isOpen {
			display: block;
		}
	}

	&__list {
		height: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
		white-space: nowrap;
		& li {
			transition: background-color 200ms;
			cursor: pointer;
			&:hover {
				background-color: var(--color-input-icons);
			}
		}
	}

	&__list::-webkit-scrollbar {
		width: 10px;
		background-color: var(--color-white);
		border-radius: 5px;
		height: 200px;
	}

	&__list::-webkit-scrollbar-thumb {
		background: var(--color-input-icons);
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
