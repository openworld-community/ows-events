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
	justify-content: space-between;
	width: 100%;
	cursor: pointer;

	&__icon {
		min-width: 24px;
		margin-left: 10px;
	}

	&__input {
		appearance: none;
	}
}
</style>
