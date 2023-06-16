<script lang="ts" setup>
defineOptions({ inheritAttrs: false });

defineProps<{
	className?: string;
	modelValue?: string | number;
	name: string;
	type?: 'text' | 'date' | 'time' | 'number' | 'textarea' | 'datalist';
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	error?: string;
	autocomplete?: string;
	minValue?: number;
}>();
const slots = useSlots();

const emit = defineEmits(['update:model-value']);
const updateValue = (event: Event) => {
	emit('update:model-value', (event.target as HTMLInputElement).value);
};

const onRemove = () => {
	emit('update:model-value', '');
};
</script>

<template>
	<div :class="`input__wrapper ${className ?? ''}`">
		<label
			v-if="label"
			class="form__label"
			:for="name"
		>
			{{ label }}
		</label>
		<div class="input__box">
			<input
				class="input form__field"
				:class="{ error: 'form__error' }"
				v-bind="$attrs"
				:name="name"
				:type="type"
				:value="modelValue"
				:disabled="disabled"
				:placeholder="placeholder ?? ''"
				:autocomplete="autocomplete ?? 'off'"
				:min="
					type === 'number' || type === 'date' || type === 'time' ? minValue : undefined
				"
				@input="updateValue"
				@change="updateValue"
			/>
			<slot
				v-if="slots['icon-right']"
				name="icon-right"
			>
			</slot>
			<button
				v-else-if="modelValue"
				@click.prevent="onRemove"
			>
				<CommonIcon
					name="delete"
					:alt="$translate('global.button.delete')"
				/>
			</button>
		</div>
		<span
			v-if="error"
			class="form__error"
		>
			{{ error }}
		</span>
	</div>
</template>

<style lang="less" scoped>
.input {
	border: 1px solid #ccc;
	outline: none;
}

.input__wrapper {
	margin-bottom: 20px;
}

.input__box {
	position: relative;
	display: flex;
	align-items: center;
}

.input__box input {
	width: 100%;
	padding: 8px 35px 8px 15px;
	outline: none;
	font-size: 1rem;
	border: 1px solid #ccc;
	border-radius: 24px;
	overflow: hidden;
}

/* If using Font Awesome or similar, you can add some spacing to the icons */
:deep(.input__box svg) {
	margin: 0 10px;
	color: var(--color-input-icons);
}

:deep(.input__box > button),
:deep(.input__box > svg) {
	position: absolute;
	right: 0;
}
:deep(.input__box > button) {
	display: flex;
	align-items: center;
}
</style>
