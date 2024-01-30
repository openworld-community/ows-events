import type { log } from 'console';
<script setup lang="ts">
import { useField } from 'vee-validate';
const props = defineProps({
	label: {
		type: String,
		default: ''
	},
	value: {
		type: String,
		required: true
	},

	disabled: {
		type: Boolean,
		default: false
	},
	//сначала текст, потом чекбокс
	isReversed: {
		type: Boolean,
		default: false
	},
	modelValue: {
		type: Boolean,
		required: true
	}
});

const emit = defineEmits(['update:model-value']);

const model = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:model-value', value);
	}
});

const isChecked = computed(() => model.value);
</script>

<template>
	<div class="checkbox__wrapper">
		<label :class="['checkbox', { 'checkbox--reversed': isReversed }]">
			<span :class="['checkbox__box', { 'checkbox__box--checked': isChecked }]">
				<CommonIcon
					v-if="isChecked"
					name="check"
					class="checkbox__icon"
					color="var(--color-white)"
					width="16px"
					height="16px"
				/>
			</span>
			<span class="checkbox__text">
				{{ label }}
			</span>
			<input
				v-model="model"
				:disabled="disabled"
				type="checkbox"
				class="checkbox__input"
				:name="value"
			/>
		</label>
	</div>
</template>

<style scoped lang="less">
.checkbox {
	display: flex;
	width: max-content;
	align-items: center;
	cursor: pointer;

	&__wrapper {
		display: flex;
		width: 100%;
	}

	&--reversed {
		flex-direction: row-reverse;
		justify-content: flex-end;
	}

	&__text {
		font-size: var(--font-size-M);
		line-height: 24px;
		margin-right: var(--space-unrelated-items);
	}

	&__input {
		display: none;
	}

	&__box {
		position: relative;
		width: 18px;
		height: 18px;
		border: 1px solid var(--color-input-field);
		border-radius: 4px;
		background-color: var(--color-background-secondary);
		margin-right: var(--space-unrelated-items);

		&--checked {
			background-color: var(--color-accent-green-main);
			border-color: var(--color-accent-green-main);
			color: var(--color-white);
		}
	}

	&__icon {
		position: absolute;
		top: 0;
		left: 0;
	}
}
</style>
