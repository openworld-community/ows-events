<script
	lang="ts"
	setup
>
import VueDatePicker, { type DatePickerInstance } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import dayjs from 'dayjs';
import type { TCalendarDisabledButtons } from '../../../../common/types/filters'
import type { PropType } from 'vue';
import type { Time } from '../../../utils/dates';

// https://vue3datepicker.com/props/modes/
const props = defineProps({
	className: {
		type: String,
		default: ''
	},
	modelValue: {
		type: [Date, null, Object, String] as PropType<Date | Date[] | Time | string | null>,
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
	},
	isFilter: {
		type: Boolean,
		default: false
	},
	disabledButtons: {
		type: Object as PropType<TCalendarDisabledButtons>,
		default: () => {
			return {
				today: false,
				tomorrow: false
			}
		}
	}
});

const { locale } = useI18n();

const emit = defineEmits(['update:model-value']);
const isDateType = computed(() => props.type === 'date');
const datepicker = ref<DatePickerInstance>(null);
const input = ref(null)

const handleDate = (modelData: typeof props.modelValue) => {
	isDateType.value && datepicker.value?.closeMenu();
	if (props.range && !modelData[1]) {
		emit('update:model-value', modelData[0])
	} else {
		emit('update:model-value', modelData)
	}
};

const dateFormat = (date: Date | Date[] | string) => {
	if (!date) return

	if (Array.isArray(date)) {
		return !date[1]
			? dayjs(date[0]).format('DD.MM.YYYY')
			: `${dayjs(date[0]).format('DD.MM.YYYY')} - ${dayjs(date[1]).format('DD.MM.YYYY')}`
	} else {
		return dayjs(date).format('DD.MM.YYYY')
	}
};

const timeFormat = (date: Date) => {
	return dayjs(date).format('HH:mm');
};

const onRemove = () => {
	displayValue.value = ''
	emit('update:model-value', null);
};

const onOpen = () => {
	if (props.isFilter) {
		input.value.focus()
		input.value.classList.add('active')
	}
}

const onClose = () => {
	if (props.isFilter) {
		input.value.blur()
		input.value.classList.remove('active')
		emit('update:model-value', displayValue.value)
	}
}

const today = new Date()
const tomorrow = new Date(new Date().setDate(today.getDate() + 1))

const displayValue = ref()
const updatedisplayValue = (date: Date[] | null) => {
	if (date) displayValue.value = date
}

const onActionRowButtonsClick = (date) => {
	displayValue.value = date
	datepicker.value.closeMenu()
}

onMounted(() => {
	// datepicker криво ставит фокус класс (при откртии фокуса нет, при закрытии есть)
	input.value = document.querySelector('.custom__input')
})
</script>

<template>
	<div
		class="input__wrapper calendar"
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
			:range="range"
			:locale="locale"
			:name="name"
			:placeholder="required ? `${placeholder} *` : placeholder"
			:input-class-name="`input input__field ${error ? 'form__error' : ''} ${appearance ? 'no-border' : ''} ${isFilter ? 'filter' : ''}`"
			:menu-class-name="`${!isDateType ? 'time_picker' : ''}`"
			mode-height="80"
			prevent-min-max-navigation
			:auto-apply="true"
			:keep-action-row="name === 'startDate' || name === 'endDate' ? true : false"
			:close-on-auto-apply="isDateType"
			partial-flow
			:flow="['calendar']"
			:time-picker="!isDateType"
			minutes-increment="10"
			:format="isDateType ? dateFormat : timeFormat"
			:month-change-on-arrows="true"
			:enable-time-picker="!isDateType"
			:min-date="minDate ?? undefined"
			:start-date="minDate ?? undefined"
			:min-time="minTime ?? undefined"
			:start-time="minTime ?? { hours: 12, minutes: 0 }"
			:disabled="disabled"
			:required="required"
			is-24
			:position="name === 'endDate' ? 'right' : 'left'"
			:clearable="false"
			@keydown.enter.capture="datepicker?.closeMenu()"
			@open="onOpen"
			@closed="onClose"
			@update:model-value="handleDate"
			@internal-model-change="updatedisplayValue"
		>
			<template
				v-if="range"
				#dp-input
			>
				<input
					class="custom__input input__field no-border filter"
					type="text"
					readonly
					:placeholder="placeholder"
					:value="dateFormat(displayValue as Date | Date[] | string)"
					@keyup.enter="datepicker.openMenu()"
					@keyup.space="datepicker.openMenu()"
					@keyup.delete="datepicker.closeMenu()"
					@keyup.esc="datepicker.closeMenu()"
				/>
			</template>
			<template #action-row>
				<CommonButton
					:button-text="$t('dates.filterDay.today')"
					button-kind="dark"
					:is-disabled="disabledButtons.today"
					@click="onActionRowButtonsClick(today)"
				/>
				<CommonButton
					:button-text="$t('dates.filterDay.tomorrow')"
					button-kind="dark"
					:is-disabled="disabledButtons.tomorrow"
					@click="onActionRowButtonsClick(tomorrow)"
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
.custom__input {
	box-sizing: border-box;
	cursor: pointer;
	user-select: none;

	&.no-border {
		border-color: transparent;

		&:focus-visible,
		&.active {
			border-color: var(--color-accent-green-main) !important;
		}
	}
}

.dp {
	&__range {

		&_start,
		&_between,
		&_end {
			background-color: var(--color-accent-green-main-20) !important;
		}

		&_start,
		&_end {
			border-color: var(--color-accent-green-main);
		}
	}

	&__disabled {
		background-color: transparent;
	}

	&__action_row {
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-end;
		gap: 10px;
		padding: 0;
		padding: 0 19px 20px;
	}

	&__menu {
		transform: translate(0, 0) !important;
		top: calc(100% + 5px) !important;
		overflow: hidden;

		&_inner {
			padding: 19px 20px;
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

		&.filter:hover {
			border-color: transparent;
		}

		&:active,
		&:focus-visible {
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

	&__calendar_item {
		padding: 3px;
	}

	&__calendar_item,
	&__instance_calendar {
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
			height: 32px;
			width: 32px;

			&:hover {
				border-radius: 50%;
				background: var(--color-accent-green-main-10);
			}
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
