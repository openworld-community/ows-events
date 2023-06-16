<script lang="ts" setup>
  import {PropType, useSlots} from 'vue';

defineOptions({
	inheritAttrs: false
});

const props = defineProps({
	className: {
		type: String as PropType<string>,
		default: ''
	},
	modelValue: {
		type: [String, Number] as PropType<string | number>,
		default: ''
	},
	name: {
		type: String as PropType<string>,
		required: true
	},
	type: {
		type: String as PropType<'text' | 'date' | 'time' | 'number' | 'textarea' | 'datalist'>,
		default: 'text'
	},
	placeholder: {
		type: String as PropType<string>,
		default: ''
	},
	label: {
		type: String as PropType<string>,
		default: ''
	},
	disabled: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	error: {
		type: String as PropType<string>,
		default: ''
	},
	autocomplete: {
		type: String as PropType<string>,
		default: 'off'
	},
  minValue: {
    type: Number as PropType<number>,
    default: null
  }
});

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
	<div :class="`input__wrapper ${props.className}`">
		<label
			v-if="props.label"
			class="form__label"
			:for="props.name"
		>
			{{ props.label }}
		</label>
		<div class="input__box">
			<input
				class="input form__field"
				:class="{ error: 'form__error' }"
				v-bind="$attrs"
				:name="props.name"
				:type="props.type"
				:value="props.modelValue"
				:disabled="props.disabled"
				:placeholder="props.placeholder"
				:autocomplete="autocomplete"
        :min="type === 'number' || 'date' || 'time' ? minValue : null"
				@input="updateValue"
				@change="updateValue"
			/>
			<slot
				v-if="slots['icon-right']"
				name="icon-right"
			>
			</slot>
			<button
				v-else-if="props.modelValue"
				@click.prevent="onRemove"
			>
				<CommonIcon
					name="delete"
					:alt="$translate('global.button.delete')"
				/>
			</button>
		</div>
		<span
			v-if="props.error"
			class="form__error"
		>
			{{ props.error }}
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
