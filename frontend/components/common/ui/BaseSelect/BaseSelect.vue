<script lang="ts" setup>
import { ref } from 'vue';
import CommonIcon from '~/components/common/Icon.vue';
import BaseInput from '~/components/common/ui/BaseInput/BaseInput.vue';

const props = defineProps({
	className: {
		type: String,
		default: '',
	},
	modelValue: {
		type: String,
		default: '',
	},
	list: {
		type: Array as () => string[],
		default: () => ['text'],
	},
	name: {
		type: String,
		required: true,
	},
	placeholder: {
		type: String,
		default: '',
	},
	label: {
		type: String,
		default: '',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	error: {
		type: String,
		default: ''
	}
})

const isOpen = ref(false);

const emit = defineEmits(['update:modelValue']);
const updateValue = (value: string) => {
	emit('update:modelValue', value);
	setIsOpen();
};

const setIsOpen = () => {
	isOpen.value = !isOpen.value;
};

const onRemove = () => {
	emit('update:modelValue', '');
};

</script>

<template>
	<div :class="`select__wrapper ${props.className}`">
		<BaseInput
			:name="props.name"
			:model-value="props.modelValue"
			:label="props.label"
			:disabled="props.disabled"
			:placeholder="props.placeholder"
			:error="props.error"
			@click="setIsOpen"
		>
			<template #icon-right>
				<button
						v-if="props.modelValue"
						@click="onRemove"
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
						@click.prevent="setIsOpen"
					/>
			</template>
		</BaseInput>

		<div :class="`select__list-box ${isOpen ? 'isOpen' : ''}`">
			<ul class="select__list benefits">
				<li
					v-for="item in props.list"
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
