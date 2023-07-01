<script lang="ts" setup>
import type { WrappedInputClass } from './InputWrapper.vue';

defineProps<{
	modelValue: string;
	name: string;
	placeholder?: string;
	label?: string;
	required?: boolean;
	error?: string;
	disabled?: boolean;
}>();

const emit = defineEmits(['update:model-value']);
const updateValue = (event: Event) => {
	emit('update:model-value', (event.target as HTMLTextAreaElement).value);
};

const onRemove = () => {
	emit('update:model-value', '');
};
</script>

<template>
	<CommonUiInputWrapper
		:on-remove="onRemove"
		:label="label"
		:icon="modelValue && !disabled ? 'DELETE' : undefined"
		:error="error"
	>
		<textarea
			class="textarea"
			:class="['wrapped-input' satisfies WrappedInputClass]"
			:name="name"
			:value="modelValue"
			:placeholder="`${placeholder}${required ? ' *' : ''}`"
			:required="required"
			@input="updateValue"
		/>
	</CommonUiInputWrapper>
</template>

<style lang="less" scoped>
textarea {
	min-height: 80px;
	resize: vertical;

	&::-webkit-resizer {
		display: none;
	}
}
</style>
