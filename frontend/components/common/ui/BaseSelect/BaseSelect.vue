<script lang="ts" setup>
import {ref} from 'vue';
import CommonIcon from '~/components/common/Icon.vue';
import BaseInput from '~/components/common/ui/BaseInput/BaseInput.vue';

type selectProps = {
	className?: string;
	modelValue?: string;
	list: string[];
	name: string;
	placeholder?: string;
	label?: string;
	error?: string;
	disabled?: boolean;
}

withDefaults(
		defineProps<{ selectProps }>(),
		{
			selectProps: undefined,
			name: '',
			className: '',
			modelValue: '',
			list: () => [''],
			placeholder: '',
			label: '',
			error: '',
			disabled: false
		}
);

	const isOpen = ref<boolean>(false);

	const emit = defineEmits(['update:modelValue']);
	const updateValue = (value: string) => {
		emit('update:modelValue', value);
	}

	const setIsOpen = () => {
		isOpen.value = !isOpen.value;
	}

	const onRemove = () => {
		emit('update:modelValue', '');
	}

	// const filteredItems = computed(() => {
	// 	return list.filter(item => item.includes(this.modelValue));
	// });
</script>

<template>
	<div :class="`select__wrapper ${className}`">
		<BaseInput
			:name="name"
			:model-value="modelValue"
			:label="label"
			:disabled="disabled"
			:placeholder="placeholder"
			:error="error"
			@click="setIsOpen"
		>
			<template #icon-right>
				<button @click="onRemove">
					<CommonIcon
						v-if="modelValue"
						name="delete"
						width="24"
						height="24"
						alt="Очистить"
					/>
					<CommonIcon
						v-else
						name="container"
						width="24"
						height="24"
						alt="Открыть"
						@click.prevent="setIsOpen"
					/>
				</button>
			</template>
		</BaseInput>

		<div :class="`select__list-box ${isOpen ? 'isOpen' : ''}`">
			<ul class="select__list benefits">
				<li
						v-for="item in list"
						:key="item"
						class="select__list-item"
						@click="updateValue(item)"
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
	}

	&__list-box {
		display: none;
		position: absolute;
		top: 50px;
		left: 0;
		width: 267px;
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
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		overflow-x: hidden;

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
