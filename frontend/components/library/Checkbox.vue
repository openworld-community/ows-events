<script setup lang="ts">
import { ref, computed } from 'vue';
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
const disabledClass = computed(() => {
  return props.isDisabled ? 'checkbox-root checkbox-root__disabled' : 'checkbox-root';
});
const reversedClass = computed(() => {
  return props.isReversed ? 'сheckbox-label сheckbox-label__reversed': 'сheckbox-label';
});
</script>

<template>
	<div>
		<label :class="reversedClass">
			<CheckboxRoot
				v-model:checked="model"
				:class="disabledClass"
				:name="name"
				:disabled="isDisabled"
			>
				<CheckboxIndicator class="checkbox-indicator">
					<CommonIcon
						name="check"
						class="checkbox__icon"
						color="white"
						width="18px"
						height="18px"
					/>
				</CheckboxIndicator>
			</CheckboxRoot>
			<span class="checkbox-text">{{ props.label }}</span>
		</label>
	</div>
</template>

<style>
.сheckbox-label {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.сheckbox-label__reversed {
	flex-direction: row-reverse;
	gap: var(--space-unrelated-items);
}

.checkbox-root {
	width: 18px;
	height: 18px;
	border: 1px solid var(--color-input-field);
	outline: none;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border-radius: 4px;
	background-color: var(--color-background-secondary);
	margin-right: var(--space-unrelated-items);

}

.checkbox-root__disabled {
	background-color: var(--color-input-icons);
}


.checkbox-root:focus-within {
	border-color: var(--color-accent-green-main);
}

.checkbox-indicator {
	background-color: var(--color-accent-green-main);
	border-color: var(--color-accent-green-main);
	color: var(--color-white);
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
