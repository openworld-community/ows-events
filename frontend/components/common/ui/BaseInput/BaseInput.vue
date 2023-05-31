<script lang="ts" setup>
import { InputValue } from './types/types';

withDefaults(
	defineProps<{
		className?: string;
		modelValue?: string;
		name: string;
		type?: InputValue;
		placeholder?: string;
		label?: string;
		disabled?: boolean;
		error?: string;
	}>(),
	{ className: '', modelValue: '', type: InputValue.text, placeholder: '', label: '', error: '' }
);

const emit = defineEmits(['update:modelValue']);
function updateValue(event: Event) {
	emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<template>
	<div :class="`input__wrapper ${className}`">
		<label
			v-if="label"
			class="form__label"
			:for="name"
		>
			{{ label }}
		</label>
		<div class="input__box">
			<input
				:class="`input ${error ? 'form__error' : ''} form__field`"
				v-bind="$attrs"
				:name="name"
				:type="type"
				:value="modelValue"
				:disabled="disabled"
				:placeholder="placeholder"
				@input="updateValue"
			/>
			<slot name="icon-right"> </slot>
		</div>
		<span
			v-if="error"
			class="form__error"
		>
			{{ error }}
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
	padding: 10px 15px;
	outline: none;
	font-size: 1rem;
	color: #333;
	border: 1px solid #ccc;
	border-radius: 24px;
	overflow: hidden;
	&.error {
		border: 1px solid var(--color-accent-red);
	}
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
</style>
