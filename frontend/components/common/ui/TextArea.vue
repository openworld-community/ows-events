<script lang="ts" setup>
import type { PropType } from 'vue';

defineOptions({ inheritAttrs: false });

defineProps({
	className: {
		type: String as PropType<string>,
		default: ''
	},
	modelValue: {
		type: String as PropType<string>,
		default: ''
	},
	placeholder: {
		type: String as PropType<string>,
		default: ''
	},
	label: {
		type: String as PropType<string>,
		default: ''
	},
	required: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	error: {
		type: String as PropType<string>,
		default: ''
	},
	name: {
		type: String as PropType<string>,
		required: true
	}
});

const emit = defineEmits(['update:model-value']);
const updateValue = (event: Event) => {
	emit('update:model-value', (event.target as HTMLTextAreaElement).value);
};

const onRemove = () => {
	emit('update:model-value', '');
};
</script>

<template>
	<div :class="`input input__wrapper ${className}`">
		<label :for="name">
			{{ label }}
		</label>
		<textarea
			:class="`input__field input__field--textarea ${error ? 'form__error' : ''}`"
			:name="name"
			:value="modelValue"
			:placeholder="required ? `${placeholder} *` : placeholder"
			:required="required"
			@input="updateValue"
		/>
		<CommonButton
			v-if="modelValue"
			class="input__button input__button--clear"
			is-icon
			icon-name="delete"
			:alt="$translate('global.button.delete')"
			@click="onRemove"
		/>
		<span
			v-if="error"
			class="textarea__error"
		>
			{{ error }}
		</span>
	</div>
</template>

<style lang="less" scoped></style>
