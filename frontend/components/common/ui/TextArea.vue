<script lang="ts" setup>
import type { PropType } from 'vue';
import type { IconName } from '../Icon.vue';

defineOptions({ inheritAttrs: false });

defineProps({
	modelValue: {
		type: String as PropType<string>,
		default: ''
	},
	name: {
		type: String as PropType<string>,
		required: true
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
	// Если нужна иконка в правом углу
	iconName: {
		type: String as PropType<IconName>,
		default: ''
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
	<div class="input input__wrapper">
		<label
			:for="name"
			:class="['input__label', { 'visually-hidden': !label }]"
		>
			{{ label ? label : placeholder }}
		</label>
		<textarea
			:class="['input__field', 'textarea', { 'input__field--error': error }]"
			:name="name"
			:value="modelValue"
			:placeholder="required ? `${placeholder} *` : placeholder"
			:required="required"
			@input="updateValue"
		/>
		<CommonIcon
			v-if="(iconName || error) && !modelValue"
			:name="error ? 'error-round' : iconName"
			:color="error ? 'var(--color-accent-red)' : 'var(--color-input-icons)'"
			class="input__button"
		/>
		<CommonButton
			v-if="modelValue"
			class="input__button input__button--clear"
			is-icon
			icon-name="close"
			:alt="$t('global.button.delete')"
			@click="onRemove"
		/>
		<span
			v-if="error"
			class="input__error-message"
		>
			{{ error }}
		</span>
	</div>
</template>

<style lang="less" scoped></style>
