<script lang="ts" setup>
import VueDatePicker, { type DatePickerInstance } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import dayjs from 'dayjs';
import type { PropType } from 'vue';
import type { Time } from '../../../utils/dates';
import type { WrappedInputClass } from './InputWrapper.vue';

const props = defineProps({
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
		type: [Date, null] as PropType<Date | null>,
		default: null
	},
	minTime: {
		type: [Object, null] as PropType<Time | null>,
		default: null
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

const handleDate = (modelData: typeof props.modelValue) => {
	isDateType.value && datepicker.value?.closeMenu();
	emit('update:model-value', modelData);
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
	<CommonUiInputWrapper
		:on-remove="onRemove"
		:label="label"
		:icon="modelValue && !disabled ? 'DELETE' : { name: isDateType ? 'calendar' : 'clock' }"
		:error="error"
	>
		<VueDatePicker
			ref="datepicker"
			:model-value="modelValue"
			:name="name"
			:placeholder="`${placeholder}${required ? ' *' : ''}`"
			:input-class-name="`${'wrapped-input' satisfies WrappedInputClass}`"
			:menu-class-name="`${!isDateType ? 'time_picker' : ''}`"
			mode-height="80"
			prevent-min-max-navigation
			auto-apply
			:close-on-auto-apply="!isDateType"
			partial-flow
			:flow="['calendar']"
			:time-picker="!isDateType"
			:enable-time-picker="!isDateType"
			:min-date="minDate ?? undefined"
			:start-date="minDate ?? undefined"
			:min-time="minTime ?? undefined"
			:start-time="minTime ?? undefined"
			:format="isDateType ? dateFormat : timeFormat"
			:disabled="disabled"
			:required="required"
			is-24
			:clearable="false"
			@update:model-value="handleDate"
			@keydown.enter.capture="datepicker?.closeMenu()"
		/>
	</CommonUiInputWrapper>
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

	&__menu_transitioned {
		border-radius: 24px;
	}

	&__input {
		&:hover {
			border-color: var(--color-input-field);
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
	}

	&__btn {
		color: var(--color-accent-green-main);
		font-size: var(--font-size-M);
		margin: 0;

		&:hover {
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

.dp__inner_nav svg {
	color: var(--color-accent-green-main);
}

.dp__inc_dec_button_disabled,
.dp__inner_nav_disabled,
.dp__overlay_cell_disabled {
	background: none;
	&:hover {
		cursor: unset;
	}
	svg {
		color: var(--color-input-field);
	}
}
.dp__btn:focus {
	background: var(--dp-hover-color);
}
</style>
