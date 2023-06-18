<script lang="ts" setup>
import { type PropType } from 'vue';

defineOptions({ inheritAttrs: false });

defineProps({
	className: {
		type: String as PropType<string>,
		default: ''
	},
	modelValue: {
		type: [String, Number] as PropType<string | number>,
		default: ''
	},
	name: {
		type: String as PropType<string>,
		required: true
	},
	type: {
		type: String as PropType<'text' | 'date' | 'time' | 'number' | 'textarea' | 'datalist'>,
		default: 'text'
	},
	required: {
		type: Boolean as PropType<boolean>,
		default: false
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
	error: {
		type: String as PropType<string>,
		default: ''
	},
	autocomplete: {
		type: String as PropType<string>,
		default: 'off'
	},
	minValue: {
		type: Number as PropType<number>,
		default: null
	},
	// Если нужна иконка в правом углу
	iconName: {
		type: String as PropType<string>,
		default: ''
	},
	// Если нужна кнопка в правом углу (кроме закрывающего крестика)
	buttonName: {
		type: String as PropType<string>,
		default: ''
	}
});

const emit = defineEmits(['update:model-value']);
const updateValue = (event: Event) => {
	emit('update:model-value', (event.target as HTMLInputElement).value);
};

const onRemove = () => {
	emit('update:model-value', '');
};
</script>

<template>
	<div :class="`input input__wrapper ${className}`">
		<label
			v-if="label"
			class="form__label"
			:for="name"
		>
			{{ label }}
		</label>
		<input
			class="input__field"
			:class="{ form__error: error }"
			v-bind="$attrs"
			:name="name"
			:type="type"
			:value="modelValue"
			:disabled="disabled"
			:placeholder="required ? `${placeholder} *` : placeholder"
			:autocomplete="autocomplete"
			:required="required"
			:min="type === 'number' || type === 'date' || type === 'time' ? minValue : undefined"
			@input="updateValue"
			@change="updateValue"
		/>

		<CommonIcon
			v-if="iconName && !modelValue"
			:name="iconName"
			class="input__button"
		/>

		<CommonButton
			v-if="buttonName && !modelValue"
			is-icon
			:icon-name="buttonName"
			class="input__button"
		/>

		<CommonButton
			v-else-if="modelValue && !disabled"
			class="input__button input__button--clear"
			is-icon
			icon-name="delete"
			:alt="$translate('global.button.delete')"
			@click="onRemove"
		/>
		<span
			v-if="error"
			class="form__error"
		>
			{{ error }}
		</span>
	</div>
</template>
