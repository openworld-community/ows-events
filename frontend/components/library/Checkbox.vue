<script setup lang="ts">
import { computed } from 'vue';
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue';
const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true
	},
	label: {
		type: String,
		default: ''
	},
	name: {
		type: String,
		required: true
	},
	isReversed: {
		type: Boolean,
		default: false
	},
	isDisabled: {
		type: Boolean,
		default: false
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
</script>

<template>
	<div class="checkbox__wrapper">
		<label
			:class="['checkbox', { 'checkbox--reversed': isReversed }]"
			:data-disabled="isDisabled"
		>
			<CheckboxRoot
				v-model:checked="model"
				class="checkbox-root"
				:name="name"
				:disabled="isDisabled"
			>
				<CheckboxIndicator class="checkbox-root__indicator">
					<CommonIcon
						name="check"
						class="checkbox__icon"
						color="white"
						width="18px"
						height="18px"
					/>
				</CheckboxIndicator>
			</CheckboxRoot>
			<span
				class="checkbox__text"
				:data-disabled="isDisabled"
			>
				{{ props.label }}
			</span>
		</label>
	</div>
</template>

<style scoped lang="less">
.checkbox {
	display: flex;
	flex-direction: row;
	align-items: center;
	cursor: pointer;
	gap: var(--space-unrelated-items);

	&--reversed {
		flex-direction: row-reverse;
	}
	&__wrapper {
		display: flex;
		width: 100%;
	}
	&[data-disabled='true'] {
		cursor: not-allowed;
	}
}

:deep(.checkbox) {
	&-root {
		outline: none;
		width: 18px;
		height: 18px;
		border: 1px solid var(--color-input-field);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		border-radius: 4px;
		background-color: 'red';

		&__[data-disabled] {
			opacity: 0.4;
		}
		&__span[data-disabled] > {
			opacity: 0.4;

			pointer-events: none;
		}

		&:focus-within {
			border-color: var(--color-accent-green-main);
		}
		&__indicator {
			border: 1px solid 'transparent';
			color: var(--color-white);
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			&[data-state='checked'] {
				background-color: var(--color-accent-green-main);
				border-color: var(--color-accent-green-main);
			}
			&[data-state='unchecked'] {
				border-color: var(--color-input-field);
				background-color: var(--color-background-secondary);
			}
		}
	}

	&__text {
		font-size: var(--font-size-M);
		line-height: 24px;
	}

	&[data-disabled='true'] {
		opacity: 0.4;
	}
}
</style>
