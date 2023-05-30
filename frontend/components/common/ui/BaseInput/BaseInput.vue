<script lang="ts">
import { defineComponent } from 'vue';

import { PropType } from 'vue';
import { InputValue } from './types/types';


export default defineComponent({
	name: 'BaseInput',
	inheritAttrs: false,
	props: {
		className: {
			type: String,
			default: '',
		},
		modelValue: {
			type: String,
			default: '',
		},
		name: {
				type: String,
				required: true,
		},
		type: {
			type: String as PropType<InputValue>,
			default: 'text',
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
		},
	},
	emits: ['update:modelValue'],
	mounted() {
		console.log(this.placeholder)
	},
	methods: {
		updateValue(event: Event) {
			const target = event.target as HTMLInputElement;
			this.$emit('update:modelValue', target.value);
		},
	}
});
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
    <div :class="`input__box ${error ? 'form__error' : ''} form__field`">
      <input
					class="input"
					v-bind="$attrs"
					:name="name"
					:type="type"
          :value="modelValue"
          :disabled="disabled"
					:placeholder="placeholder"
					@input="updateValue"
      />
      <slot name="icon-right">
			</slot>
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
	border: 1px solid #ccc;
	border-radius: 4px;
	overflow: hidden;
	&.error {
		border: 1px solid var(--color-accent-red);
	}
}

.input__box input {
	flex-grow: 1;
	padding: 10px 15px;
	border: none;
	outline: none;
	font-size: 1rem;
	color: #333;
}

/* If using Font Awesome or similar, you can add some spacing to the icons */
:deep(.input__box svg) {
	margin: 0 10px;
	color: var(--color-input-icons);
}

:deep(.input__box button) {
	position: absolute;
	right: 0;
}

</style>
