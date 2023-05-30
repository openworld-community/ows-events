<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'TextArea',
	inheritAttrs: false,
	props: {
		className: {
			type: String,
			default: '',
		},
		modelValue: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		placeholder: {
			type: String,
			default: '',
		},
		label: {
			type: String,
			default: '',
		},
		error: {
			type: String,
			default: ''
		}
	},
	emits: ['update:modelValue'],
	methods: {
		updateValue(event: Event) {
			const target = event.target as HTMLTextAreaElement;
			this.$emit('update:modelValue', target.value);
		},
	},
});
</script>

<template>
	<div :class="`textarea__wrapper ${className}`">
		<label :for="name">{{ label }}</label>
		<textarea
				:class="`textarea form__field ${error ? form__error : ''}`"
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
	border: 1px solid #ccc;
	flex-grow: 1;
	padding: 10px 15px;
	outline: none;
	font-size: 1rem;
	color: #333;
}

.textarea__wrapper {
	margin-bottom: 20px;
}
</style>
