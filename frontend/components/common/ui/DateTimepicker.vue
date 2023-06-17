<script lang="ts" setup>
import VueDatePicker, { type DatePickerInstance } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import dayjs from 'dayjs';
import type { PropType } from 'vue';
import type {Time} from "../../../utils/dates";

const props = defineProps({
	className: {
		type: String as PropType<string>,
		default: ''
	},
	modelValue: {
		type: [Date, null, Object] as PropType<Date | Time | null>,
		required: true
	},
	placeholder: {
		type: String as PropType<string>,
		default: 'дд.мм.гг'
	},
	type: {
		type: String as PropType<'date' | 'time'>,
		required: true
	},
	name: {
		type: String as PropType<string>,
		required: true
	},
	label: {
		type: String as PropType<string>,
		default: ''
	},
	minDate: {
		type: [Date, null] as PropType<Date | undefined>,
		default: undefined
	},
	disabled: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	error: {
		type: String as PropType<string>,
		default: ''
	},
	required: {
		type: Boolean as PropType<boolean>,
		default: false
	}
});

const emit = defineEmits<{ 'update:model-value': [modelValue: typeof props.modelValue] }>();
const isDateType = computed(() => props.type === 'date');
const datepicker = ref<DatePickerInstance>(null);

const handleDate = (modelData: Date) => {
	isDateType.value && datepicker.value?.closeMenu();
	emit('update:model-value', modelData);
	console.log(modelData);
};

const dateFormat = (date: Date) => {
	return dayjs(date).format('DD.MM.YYYY');
};

const timeFormat = (date: Date) => {
	return dayjs(date).format('HH:mm');
};

const onRemove = () => {
	emit('update:model-value', null);
};
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
			:placeholder="required ? `${placeholder} *` : placeholder"
			:input-class-name="`input input__field ${error ? 'form__error' : ''}`"
			:menu-class-name="`${!isDateType ? 'time_picker' : ''}`"
			mode-height="80"
			prevent-min-max-navigation
			auto-apply
			:close-on-auto-apply="!isDateType"
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
		/>
		<CommonIcon
			v-if="!modelValue"
			:name="isDateType ? 'calendar' : 'clock'"
			class="input__button"
			:alt="$translate('dates.clock')"
		/>
		<CommonButton
			v-else
			is-icon
			icon-name="delete"
			class="input__button"
			@click="onRemove"
		/>

		<span
			v-if="error"
			class="form__error"
		>
			{{ error }}
		</span>
	</div>
</template>

<style lang="less">
.dp {
	&__menu {
		left: unset !important;
		transform: unset !important;
		overflow: hidden;

		&_inner {
			padding: 16px 17px;
		}

		&.time_picker {
			right: 0 !important;
		}
	}

	&__main {
		position: relative;
	}

	&__menu_transitioned,
	&__input {
		border-radius: 24px;
	}

	&__input {
		padding: 8px 12px;
		font-family: var(--font-family-main);
		color: var(--color-text-main);
		border: 1px solid var(--color-input-field);
		font-size: var(--font-size-M);

		&:hover {
			border-color: var(--color-input-field);
		}

		&:active,
		&:focus {
			outline: none;
			border: 1px solid #48c78e;
			box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
		}

		&:disabled {
			background-color: var(--color-background-secondary);
		}

		&::placeholder {
			font-family: var(--font-family-main);
			font-size: var(--font-size-M);
			color: var(--color-input-icons);
		}

		&_icon {
			display: none;
		}
	}

	&__instance_calendar {
		overflow: hidden;
		font-family: var(--font-family-main);
	}

	&__calendar_item,
	&__instance_calendar {
		padding: 3px;
		color: var(--color-text-main);
		font-size: var(--font-size-XS);
	}

	&__calendar_header {
		&_separator {
			opacity: 0;
		}

		&_item {
			font-size: var(--font-size-XS);
			color: var(--color-text-secondary);
			font-weight: 500;
			text-transform: uppercase;
		}
	}

	&__month_year {
		&_wrap {
			justify-content: center;
		}

		&_select {
			&:hover {
				color: var(--color-accent-green-main);
			}
		}
	}

	&__btn {
		color: var(--color-accent-green-main);
		font-size: var(--font-size-M);
		margin: 0;

		svg {
			fill: var(--color-accent-green-main);
			color: var(--color-accent-green-main);
		}
	}

	&__cell {
		&_inner {
			border-radius: 50%;
			background-color: var(--color-white);
			color: var(--color-text-main);
			font-size: var(--font-size-XS);
			font-weight: 500;
			height: 24px;
			width: 24px;
		}

		&_disabled {
			color: var(--color-input-field);
			cursor: default;
		}

		&_offset {
			color: var(--color-input-field);
		}
	}

	&__today {
		border-color: var(--color-accent-green-main);
	}

	&__active_date {
		padding: 3px;
		background-color: var(--color-accent-green-main);
		color: var(--color-white);
	}

	&__time-display {
		&:hover {
			color: var(--color-text-main);
		}
	}

	&__arrow_bottom,
	&__arrow_top {
		opacity: 0;
	}
}
</style>
