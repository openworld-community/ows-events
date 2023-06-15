<script lang="ts" setup>
import type { Props } from '~/components/common/ui/TextArea/types';

defineOptions({
	inheritAttrs: false
});

withDefaults(defineProps<Props>(), {
	className: '',
	modelValue: '',
	placeholder: '',
	label: '',
	error: ''
});

const emit = defineEmits(['update:modelValue']);
const updateValue = (event: Event) => {
	emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
};

const onRemove = () => {
	emit('update:modelValue', '');
};

</script>

<template>
	<div :class="`textarea__wrapper ${className}`">
		<label :for="name">{{ label }}</label>
		<textarea
			:class="`textarea form__field ${error ? 'form__error' : ''}`"
			:name="name"
			:value="modelValue"
			:placeholder="placeholder"
			@input="updateValue"
		/>
		<button
				class="textarea__remove"
				v-if="modelValue"
				@click="onRemove"
		>
			<CommonIcon
					name="delete"
					:alt="$translate('global.button.delete')"
			/>
		</button>
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

	&__remove {
		position: absolute;
		bottom: 10px;
		right: 10px;
		color: var(--color-input-icons);
	}
}
</style>
