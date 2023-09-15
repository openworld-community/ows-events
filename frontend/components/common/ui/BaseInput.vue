<script lang="ts" setup>
import { type PropType } from 'vue';
import type { IconName } from '../Icon.vue';

defineOptions({ inheritAttrs: false });

defineProps({
	className: {
		type: String,
		default: ''
	},
	modelValue: {
		type: [String, Number] as PropType<string | number>,
		default: ''
	},
	name: {
		type: String,
		required: true
	},
	type: {
		type: String as PropType<'text' | 'date' | 'time' | 'number' | 'textarea' | 'datalist'>,
		default: 'text'
	},
	required: {
		type: Boolean,
		default: false
	},
	placeholder: {
		type: String,
		default: ''
	},
	label: {
		type: String,
		default: ''
	},
	maxLength: {
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
	inputReadonly: {
		type: Boolean,
		default: false
	},
	minValue: {
		type: Number,
		default: null
	},
	// Если нужна иконка в правом углу
	iconName: {
		type: String as PropType<IconName>,
		default: ''
	},
	// Если нужна кнопка в правом углу (кроме закрывающего крестика)
	buttonName: {
		type: String as PropType<IconName>,
		default: ''
	},
	// Для селектов, название иконки должно быть идентично значению селекта
	hasValueIcon: {
		type: Boolean,
		default: false
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
			:class="[
				'input__field',
				{ 'input__field--cursor-pointer': inputReadonly && !modelValue },
				{ 'input__field--without-cursor': inputReadonly && modelValue },
				{ 'input__field--shifted': hasValueIcon && modelValue },
				{ form__error: error }
			]"
			v-bind="$attrs"
			:name="name"
			:type="type"
			:value="modelValue"
			:maxlength="maxLength ? maxLength : undefined"
			:disabled="disabled"
			:placeholder="required ? `${placeholder} *` : placeholder"
			:autocomplete="autocomplete"
			:readonly="inputReadonly"
			:required="required"
			:min="type === 'number' || type === 'date' || type === 'time' ? minValue : undefined"
			@input="updateValue"
		/>

		<!--    иконка справа-->
		<CommonIcon
			v-if="iconName && !modelValue"
			:name="iconName"
			:class="['input__button', {'input__button--disabled': disabled}]"
		/>

		<!--    кнопка справа-->
		<CommonButton
			v-if="buttonName && !modelValue"
			is-icon
			:has-states="false"
			:icon-name="buttonName"
			:class="['input__button', {'input__button--disabled': disabled}]"
		/>

		<!-- кнопка очистки инпута-->
		<CommonButton
			v-else-if="(modelValue || modelValue === 0) && !disabled"
			class="input__button input__button--clear"
			is-icon
			:has-states="false"
			icon-name="close"
			:alt="$t('global.button.delete')"
			@click="onRemove"
		/>

		<!--    иконка слева (для селектов) -->
		<CommonIcon
			v-if="hasValueIcon"
			class="input__value-icon"
			:name="`${name}/${modelValue}`"
		/>

		<span
			v-if="error"
			class="form__error"
		>
			{{ error }}
		</span>
	</div>
</template>