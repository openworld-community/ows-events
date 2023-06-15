<script lang="ts" setup>
import { InputValue } from './types/types';
import type {PropType} from 'vue';
import {useSlots} from 'vue';

defineOptions({
	inheritAttrs: false
});

const props = defineProps({
	className: {
		type: String,
		default: ''
	},
	modelValue: {
		type: String,
		default: ''
	},
	name: {
		type: String,
		required: true
	},
	type: {
		type: String as PropType<InputValue> | Number as PropType<InputValue>,
		default: 'text'
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
	error: {
		type: String,
		default: ''
	},
	autocomplete: {
		type: String,
		default: 'off'
	},
})

const slots = useSlots();

const emit = defineEmits(['update:modelValue']);
const updateValue = (event: Event) => {
	emit('update:modelValue', (event.target as HTMLInputElement).value);
};

const onRemove = () => {
	emit('update:modelValue', '');
};

</script>

<template>
	<div :class="`input__wrapper ${props.className}`">
		<label
			v-if="props.label"
			class="form__label"
			:for="props.name"
		>
			{{ props.label }}
		</label>
		<div class="input__box">
			<input
				class="input form__field"
				:class="{ error: 'form__error' }"
				v-bind="$attrs"
				:name="props.name"
				:type="props.type"
				:value="props.modelValue"
				:disabled="props.disabled"
				:placeholder="props.placeholder"
				:autocomplete="autocomplete"
				@input="updateValue"
				@change="updateValue"
			/>
			<slot
					v-if="slots['icon-right']"
					name="icon-right"
			>
			</slot>
			<button
					v-else-if="props.modelValue"
					@click.prevent="onRemove"
			>
				<CommonIcon
						name="delete"
						:alt="$translate('global.button.delete')"
				/>
			</button>
		</div>
		<span
			v-if="props.error"
			class="form__error"
		>
			{{ props.error }}
		</span>
	</div>
</template>

<style lang="less" scoped>
.input {
	border: 1px solid #ccc;
	outline: none;
}

.input__wrapper {
	margin-bottom: 20px;
}

.input__box {
	position: relative;
	display: flex;
	align-items: center;
}

.input__box input {
	width: 100%;
	padding: 8px 15px;
	outline: none;
	font-size: 1rem;
	color: #333;
	border: 1px solid #ccc;
	border-radius: 24px;
	overflow: hidden;
}

/* If using Font Awesome or similar, you can add some spacing to the icons */
:deep(.input__box svg) {
	margin: 0 10px;
	color: var(--color-input-icons);
}

:deep(.input__box > button),
:deep(.input__box > svg) {
	position: absolute;
	right: 0;
}
:deep(.input__box > button) {
	display: flex;
	align-items: center;
}
</style>
