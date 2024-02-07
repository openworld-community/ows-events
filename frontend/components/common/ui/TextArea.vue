<script lang="ts" setup>
defineOptions({ inheritAttrs: false });

defineProps({
	className: {
		type: String,
		default: ''
	},
	modelValue: {
		type: String,
		default: ''
	},
	placeholder: {
		type: String,
		default: ''
	},
	label: {
		type: String,
		default: ''
	},
	required: {
		type: Boolean,
		default: false
	},
	error: {
		type: [String, Boolean],
		default: ''
	},
	name: {
		type: String,
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
			:interactive="false"
			icon-name="close"
			:alt="$t('global.button.delete')"
			@click="onRemove"
		/>
	</div>
</template>

<style lang="less" scoped></style>
