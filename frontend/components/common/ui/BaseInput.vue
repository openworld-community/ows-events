<script lang="ts" setup>
import { type PropType } from 'vue';
import type { IconName } from '../Icon.vue';

const props = defineProps({
	className: {
		type: String,
		default: ''
	},
	modelValue: {
		type: [String, Number] as PropType<string | number>,
		default: ''
	},
	name: {
		type: String,
		required: true
	},
	appearance: {
		type: String as PropType<'border' | 'no-border'>,
		default: 'border'
	},
	type: {
		type: String as PropType<
			| 'text'
			| 'date'
			| 'time'
			| 'number'
			| 'textarea'
			| 'datalist'
			| 'url'
			| 'email'
			| 'phone'
			| 'search'
			| 'password'
		>,
		default: 'text'
	},
	required: {
		type: Boolean,
		default: false
	},
	placeholder: {
		type: String,
		default: ''
	},
	label: {
		type: String,
		default: ''
	},
	maxLength: {
		type: String,
		default: ''
	},
	disabled: {
		type: Boolean,
		default: false
	},
	error: {
		type: [String, Boolean],
		default: ''
	},
	autocomplete: {
		type: String,
		default: 'off'
	},
	inputReadonly: {
		type: Boolean,
		default: false
	},
	minValue: {
		type: Number,
		default: null
	},
	// Если нужна иконка в правом углу
	iconName: {
		type: String as PropType<IconName>,
		default: ''
	},
	// Если нужна кнопка в правом углу (кроме закрывающего крестика)
	buttonName: {
		type: String as PropType<IconName>,
		default: ''
	},
	// Для селектов, название иконки должно быть идентично значению селекта
	hasValueIcon: {
		type: Boolean,
		default: false
	},
	// для отображения пассворда по клику на иконку (password <--> text)
	showPassword: {
		type: Boolean,
		default: false
	},
	mobileSelect: {
		type: Boolean,
		default: false
	}
});

// выносим проп в отдельный реф
// если не применяется логика отображения пароля, то он ведет себе как обычный props.type
const writableType = ref<string>(props.type);

const emit = defineEmits(['update:model-value']);
const updateValue = (event: Event) => {
	emit('update:model-value', (event.target as HTMLInputElement).value);
};

const onRemove = () => {
	emit('update:model-value', '');
};
</script>

<template>
	<div :class="`input input__wrapper ${className}`">
		<label
			v-if="label"
			class="form__label"
			:for="name"
		>
			{{ label }}
		</label>
		<input
			:class="[
				'input__field',
				{ 'input__field--no-border': appearance === 'no-border' },
				{ 'input__field--cursor-pointer': inputReadonly && !modelValue },
				{ 'input__field--without-cursor': inputReadonly && modelValue },
				{ 'input__field--shifted': hasValueIcon && modelValue },
				{ 'input__field--mobile': mobileSelect && modelValue },
				{ 'input__field--pw': showPassword && modelValue },
				{ form__error: Boolean(error) }
			]"
			:name="name"
			:type="writableType"
			:value="modelValue"
			:maxlength="maxLength ? maxLength : undefined"
			:disabled="disabled"
			:placeholder="required ? `${placeholder} *` : placeholder"
			:autocomplete="autocomplete"
			:readonly="inputReadonly"
			:required="required"
			:min="type === 'number' || type === 'date' || type === 'time' ? minValue : undefined"
			@input="updateValue"
		/>

		<!--    иконка справа-->
		<CommonIcon
			v-if="(iconName && !modelValue) || mobileSelect"
			:name="iconName"
			:class="['input__button', { 'input__button--disabled': disabled }]"
			color="var(--color-input-icons)"
		/>

		<!--    кнопка справа-->
		<CommonButton
			v-if="buttonName && !modelValue"
			is-icon
			:interactive="false"
			:icon-name="buttonName"
			:class="['input__button', { 'input__button--disabled': disabled }]"
		/>

		<!-- кнопка очистки инпута-->
		<CommonButton
			v-else-if="
				(modelValue || modelValue === 0) && !disabled && !showPassword && !mobileSelect
			"
			is-icon
			class="input__button input__button--clear input__button--wrapper"
			:interactive="false"
			icon-name="close"
			:alt="$t('global.button.delete')"
			@click="onRemove"
		/>

		<!-- блок для пассворд инпута
		оставляем кнопку для очистки + кнопка раскрытия во флекс контейнере -->
		<div
			v-else-if="!disabled && showPassword"
			:class="[
				'input__button',
				'input__button--clear',
				'input__button--wrapper',
				{ 'password-shown': showPassword && writableType === 'text' }
			]"
		>
			<CommonButton
				v-if="(modelValue || modelValue === 0) && !disabled"
				is-icon
				:interactive="false"
				icon-name="close"
				:alt="$t('global.button.delete')"
				@click="onRemove"
			/>
			<!-- конпка отображения пароля (password <-> text) -->
			<CommonButton
				is-icon
				:interactive="false"
				icon-name="password"
				:alt="$t('global.button.delete')"
				:class="{ 'pw-show': writableType === 'text' }"
				@click="
					writableType === 'password'
						? (writableType = 'text')
						: (writableType = 'password')
				"
			/>
		</div>

		<!--    иконка слева (для селектов) -->
		<CommonIcon
			v-if="hasValueIcon"
			class="input__value-icon"
			:name="`${name}/${modelValue}`"
		/>
	</div>
</template>

<style lang="less" scoped>
.flex {
	display: flex;
}
</style>
