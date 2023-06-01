<script>
export default {
	inheritAttrs: false
}
</script>

<script lang="ts" setup>
// @ts-ignore
withDefaults(
		defineProps<{
			className?: string;
			modelValue?: string;
			name: string;
			placeholder?: string;
			label?: string;
			error?: string;
		}>(),
		{
			textAreaProps: undefined,
			name: '',
			className: '',
			modelValue: '',
			list: () => [''],
			placeholder: '',
			label: '',
			error: '',
			disabled: false
		}
);

const emit = defineEmits(['update:modelValue']);
const updateValue = (event: Event) => {
	emit('update:modelValue', (event.target as HTMLInputElement).value);
}

</script>

<template>
	<div :class="`textarea__wrapper ${className}`">
		<label :for="name">{{ label }}</label>
		<textarea
				:class="`textarea form__field ${error ? 'form__error' : ''}`"
				:name="name"
				:value="modelValue"
				@input="updateValue"
		/>
		<span
				v-if="error"
				class="textarea__error"
		>
			{{ error }}
		</span>
	</div>
</template>

<style lang="less" scoped>
.textarea {
	width: 100%;
	border: 1px solid #ccc;
	flex-grow: 1;
	padding: 10px 15px;
	outline: none;
	font-size: 1rem;
	color: #333;
	border-radius: 24px;
	&__wrapper {
		position: relative;
		margin-bottom: 20px;
	}
}

</style>
