<script setup lang="ts">
const props = defineProps({
	label: {
		type: String,
		required: true
	},
	value: {
		type: String,
		default: ''
	},
	modelValue: {
		type: [Boolean, String, Array],
		required: true
	},
	multiple: {
		type: Boolean,
		default: false
	},
	iconName: {
		type: String,
		default: ''
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

const isChecked = computed(() =>
	props.multiple
		? (model.value as unknown as any[]).includes(props.value)
		: props.value === model.value
);
</script>

<template>
	<label class="checkbox-row">
		<CommonIcon
			v-if="iconName"
			:name="iconName"
			class="checkbox-row__value-icon"
		/>
		{{ label }}
		<input
			v-model="model"
			class="checkbox-row__input"
			:type="multiple ? 'checkbox' : 'radio'"
			:value="value"
		/>
		<CommonIcon
			v-if="isChecked"
			class="checkbox-row__icon"
			name="check"
			color="var(--color-accent-green-main)"
		/>
	</label>
</template>

<style scoped lang="less">
.checkbox-row {
	display: flex;
	width: 100%;
	cursor: pointer;

	&__value-icon {
		min-width: 24px;
		margin-right: 4px;
	}

	&__icon {
		min-width: 24px;
		margin-left: auto;
	}

	&__input {
		appearance: none;
	}
}
</style>
