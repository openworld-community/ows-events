<script lang="ts">
export type Time = { hours: number | string; minutes: number | string; seconds?: number | string };
</script>
<script lang="ts" setup>
import VueDatePicker, { type DatePickerInstance } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import dayjs from 'dayjs';

const props = defineProps<{
	className?: string;
	modelValue: Date | Time | null;
	placeholder?: string;
	type: 'date' | 'time';
	name: string;
	label?: string;
	minDate?: Date;
	disabled?: boolean;
	error?: string;
	required?: boolean;
}>();

const emit = defineEmits<{ 'update:model-value': [modelValue: typeof props.modelValue] }>();
const isDateType = computed(() => props.type === 'date');
const datepicker = ref<DatePickerInstance>(null);

function handleDate(modelData: Date) {
	isDateType.value && datepicker.value?.closeMenu();
	emit('update:model-value', modelData);
}

function dateFormat(date: Date) {
	return dayjs(date).format('DD.MM.YYYY');
}

function timeFormat(date: Date) {
	return dayjs(date).format('HH:mm');
}
</script>

<template>
	<div
		class="input__wrapper"
		:class="{ [className ?? '']: className }"
	>
		<label
			v-if="label"
			class="form__label"
			:for="name"
		>
			{{ label }}
		</label>
		<VueDatePicker
			ref="datepicker"
			:model-value="modelValue"
			:name="name"
			:placeholder="placeholder ?? 'дд.мм.гг'"
			:input-class-name="`input form__field ${error ? 'form__error' : ''}`"
			auto-apply
			partial-flow
			:flow="['calendar']"
			:time-picker="!isDateType"
			:enable-time-picker="!isDateType"
			:min-date="minDate"
			:format="isDateType ? dateFormat : timeFormat"
			:disabled="disabled"
			:required="required"
			is-24
			:clearable="false"
			@update:model-value="handleDate"
		>
			<template
				v-if="!isDateType"
				#input-icon
			>
				<CommonIcon
					name="clock"
					:alt="$translate('dates.clock')"
				/>
			</template>
		</VueDatePicker>
		<span
			v-if="error"
			class="form__error"
		>
			{{ error }}
		</span>
	</div>
</template>

<style lang="less">
.dp__menu_transitioned,
.dp__input {
	border-radius: 24px;
}
.dp__input_wrap {
	&:has(input:required)::after {
		top: -5px;
		left: -5px;
		position: absolute;
		content: '*';
		color: red;
	}
	&:has(input:disabled)::after {
		color: var(--color-text-secondary);
	}
}

.dp__input {
	padding: 8px 12px;
}

.dp__menu {
	overflow: hidden;
}

.dp__arrow_bottom,
.dp__arrow_top {
	opacity: 0;
}

.dp__month_year_wrap {
	justify-content: center;
}

.dp__btn {
	color: var(--color-accent-green-main);
	font-size: var(--font-size-M);
	&:first-child {
		margin-right: 5px;
	}
	svg {
		fill: var(--color-accent-green-main);
		color: var(--color-accent-green-main);
	}
}

.dp__calendar_header_separator {
	opacity: 0;
}

.dp__cell_inner {
	border-radius: 50%;
	background-color: var(--color-white);
	color: var(--color-text-main);
	font-size: var(--font-size-XS);
	font-weight: 500;
	height: 24px;
	width: 24px;
}

.dp__today {
	border-color: var(--color-accent-green-main);
}

.dp__instance_calendar {
	overflow: hidden;
	font-family: var(--font-family-main);
}

.dp__calendar_item,
.dp__instance_calendar {
	padding: 3px;
	color: var(--color-text-main);
	font-size: var(--font-size-XS);
}
.dp__active_date {
	padding: 3px;
	background-color: var(--color-accent-green-main);
	color: var(--color-white);
}

.dp__menu_inner {
	padding: 16px 17px;
}

.dp__calendar_header_item {
	font-size: var(--font-size-XS);
	color: var(--color-text-secondary);
	font-weight: 500;
	text-transform: uppercase;
}

.dp__input {
	padding: 9px 12px;
	border: 1px solid var(--color-input-field);
	font-size: var(--font-size-M);
}

.dp__input_icons,
.dp__input_icon {
	position: absolute;
	top: 50%;
	left: unset;
	color: var(--color-input-icons);
	width: 18px;
	height: 20px;
	svg {
		color: var(--color-input-icons);
	}
}

.dp__input_icons.dp__input_icon {
	right: 0;
}

.dp__input_icon {
	right: 15px;
}

:deep(.clock) {
	width: 44px;
}

.dp__clear_icon {
	// display: none;
	position: static;
}

.dp__selection_preview {
	opacity: 0;
}
</style>
