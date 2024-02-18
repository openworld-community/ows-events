<script lang="ts" setup>
import VueDatePicker, { type DatePickerInstance } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import dayjs from 'dayjs';
import type { PropType } from 'vue';
import type { Time } from '../../../utils/dates';

// https://vue3datepicker.com/props/modes/

const props = defineProps({
	className: {
		type: String,
		default: ''
	},
	modelValue: {
		type: [Date, null, Object, String] as PropType<Date | Time | Date[] | null>,
		required: true
	},
	placeholder: {
		type: String,
		default: 'дд.мм.гггг'
	},
	type: {
		type: String as PropType<'date' | 'time'>,
		required: true
	},
	name: {
		type: String as PropType<'startDate' | 'endDate' | string>,
		required: true
	},
	label: {
		type: String,
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
		type: Boolean,
		default: false
	},
	error: {
		type: [String, Boolean],
		default: ''
	},
	required: {
		type: Boolean,
		default: false
	},
	range: {
		type: Boolean,
		default: false
	},
	appearance: {
		type: String as PropType<'no-border' | null>,
		default: null
	}
});

const { locale } = useI18n();

const emit = defineEmits(['update:model-value']);
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
	emit('update:model-value', '');
};

const today = new Date()
const tomorrow = new Date(new Date().setDate(today.getDate() + 1))
</script>

<template>
	<div
		class="input__wrapper"
		:class="{ [className ?? '']: className }"
	>
		<label
			v-if="label"
			class="['form__label', {'form__error': Boolean(error) }]"
			:for="name"
		>
			{{ label }}
		</label>
		<VueDatePicker
			ref="datepicker"
			:model-value="modelValue"
			:range="props.range"
			:locale="locale"
			:name="name"
			:placeholder="required ? `${placeholder} *` : placeholder"
			:input-class-name="`input input__field ${error ? 'form__error' : ''} ${appearance ? 'no-border' : ''}`"
			:menu-class-name="`${!isDateType ? 'time_picker' : ''}`"
			mode-height="80"
			prevent-min-max-navigation
			auto-apply
			:keep-action-row="props.name === 'startDate' || props.name === 'endDate' ? true : false"
			:close-on-auto-apply="!isDateType"
			partial-flow
			:flow="['calendar']"
			:time-picker="!isDateType"
			minutes-increment="10"
			:enable-time-picker="!isDateType"
			:min-date="minDate ?? undefined"
			:start-date="minDate ?? undefined"
			:min-time="minTime ?? undefined"
			:start-time="minTime ?? { hours: 12, minutes: 0 }"
			:format="isDateType ? dateFormat : timeFormat"
			:disabled="disabled"
			:required="required"
			is-24
			:position="name === 'endDate' ? 'right' : 'left'"
			:clearable="false"
			@update:model-value="handleDate"
			@keydown.enter.capture="datepicker?.closeMenu()"
		>
			<template #action-row>
				<CommonButton
					:button-text="$t('dates.filterDay.today')"
					button-kind="dark"
					@click="() => {
						$emit('update:model-value', today)
						datepicker.closeMenu()
					}"
				/>
				<CommonButton
					:button-text="$t('dates.filterDay.tomorrow')"
					button-kind="dark"
					@click="() => {
						$emit('update:model-value', tomorrow)
						datepicker.closeMenu()
					}"
				/>
			</template>
		</VueDatePicker>
		<CommonIcon
			v-if="!modelValue"
			:name="isDateType ? 'calendar' : 'clock'"
			:class="['input__button', { 'input__button--disabled': disabled }]"
		/>
		<CommonButton
			v-else
			is-icon
			:interactive="false"
			icon-name="close"
			class="input__button"
			@click="onRemove"
		/>
	</div>
</template>

<style lang="less">
.dp {
	&__disabled {
		background-color: transparent;
	}

	&__action_row {
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-end;
		gap: 10px;
	}

	&__menu {
		// left: unset !important;
		// transform: unset !important;
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
		border-radius: 8px;
	}

	&__input {
		padding: 8px 12px;
		font-family: var(--font-family-main);
		color: var(--color-text-main);
		border: 1px solid var(--color-input-field);
		font-size: var(--font-size-M);

		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;

		&.no-border {
			border-color: var(--color-white)
		}

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
			opacity: 0.4;
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

	&__overlay_cell_active,
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
		background: none;
		cursor: default;
	}

	&:active,
	&:focus {
		background: none;
		cursor: unset;
	}

	svg {
		color: var(--color-input-field);
	}
}

.dp__btn:focus {
	background: transparent;
}
</style>
