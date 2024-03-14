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
	<div class="сheckbox-label">
		<label class="сheckbox-label checkbox-hover">
			<CheckboxRoot
				v-model:checked="model"
				class="checkbox-root"
				:name="name"
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
			<span class="select-none text-white">{{ props.label }}</span>
		</label>
	</div>
</template>

<style>
.сheckbox-label {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.checkbox-root {
	width: 18px;
	height: 18px;
	border: 1px solid var(--color-input-field);
	background-color: white;
	outline: none;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border-radius: 4px;
	background-color: var(--color-background-secondary);
	margin-right: var(--space-unrelated-items);
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
