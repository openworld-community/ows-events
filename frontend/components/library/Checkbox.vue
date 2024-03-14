<script setup lang="ts">
import { ref, computed } from 'vue';
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue';
const props = defineProps({
	isChecked:{
		type: Boolean,
		default: false,
		required: true,
	},
	label: {
		type: String,
		default: ''
	},
	value: {
		type: String,
		required: true
	},	
	isReversed: {
		type: Boolean,
		default: false
	},
});
const checked = ref(false);
const model = computed({
	get() {
		if (props.isChecked) {
			return props.isChecked;
		} else {
			return checked.value;
		}
	},
	set(value) {
		checked.value = value;
		return value;
	}
});
</script>

<template>
	<div class="сheckbox-label">
		<label class="сheckbox-label checkbox-hover">
			<CheckboxRoot			
				v-model:checked="model"
				class="checkbox-root"              
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
