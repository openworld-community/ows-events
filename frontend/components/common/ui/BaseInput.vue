<script lang="ts" setup>
import type { IconName } from '../Icon.vue';
import type { WrappedInputClass } from './InputWrapper.vue';
withDefaults(
	defineProps<{
		modelValue: string | number;
		name: string;
		type?: 'text' | 'date' | 'time' | 'number' | 'textarea' | 'datalist';
		required?: boolean;
		placeholder?: string;
		label?: string;
		maxLength?: number;
		disabled?: boolean;
		error?: string;
		autocomplete?: 'on' | 'off';
		minValue?: number;
		// Если нужна иконка в правом углу
		iconName?: IconName;
	}>(),
	{
		type: 'text',
		autocomplete: 'off',
		iconName: ''
	}
);

const emit = defineEmits(['update:model-value']);
const updateValue = (event: Event) => {
	emit('update:model-value', (event.target as HTMLInputElement).value);
};

const onRemove = () => {
	emit('update:model-value', '');
};
</script>

<template>
	<CommonUiInputWrapper
		:on-remove="onRemove"
		:label="label"
		:icon="modelValue && !disabled ? 'DELETE' : { name: iconName }"
		:error="error"
	>
		<input
			:class="['wrapped-input' satisfies WrappedInputClass]"
			v-bind="$attrs"
			:name="name"
			:type="type"
			:value="modelValue"
			:maxlength="maxLength"
			:disabled="disabled"
			:placeholder="`${placeholder}${required ? ' *' : ''}`"
			:autocomplete="autocomplete"
			:required="required"
			:min="type === 'number' || type === 'date' || type === 'time' ? minValue : undefined"
			@input="updateValue"
		/>
	</CommonUiInputWrapper>
</template>
