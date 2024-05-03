<script lang="ts" setup>
import VueDatePicker, { type DatePickerInstance } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import dayjs from 'dayjs';
import type { PropType } from 'vue';
import type { Time } from '../../../utils/dates';
import type { FilterStore } from '~/stores/filter.store';

// https://vue3datepicker.com/props/modes/
const props = defineProps({
	className: {
		type: String,
		default: ''
	},
	modelValue: {
		type: [Date, null, Object, String] as PropType<
			Date | Date[] | Time | string | string[] | null
		>,
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
	}
});

const { locale } = useI18n();

const emit = defineEmits(['update:model-value']);
const isDateType = computed(() => props.type === 'date');
const datepicker = ref<DatePickerInstance>(null);
const input = ref<HTMLInputElement>(null);

const handleDate = (modelData: typeof props.modelValue) => {
	isDateType.value && datepicker.value?.closeMenu();
	if (props.range && !modelData[1]) {
		emit('update:model-value', [modelData[0], modelData[0]]);
	} else {
		emit('update:model-value', modelData);
	}
};

const dateFormat = (date: Date | Date[] | string | string[]) => {
	if (!date) return '';

	if (Array.isArray(date)) {
		return !date[1]
			? `${dayjs(date[0]).format('DD.MM.YYYY')} -`
			: `${dayjs(date[0]).format('DD.MM.YYYY')} - ${dayjs(date[1]).format('DD.MM.YYYY')}`;
	} else {
		return dayjs(date).format('DD.MM.YYYY');
	}
};

const timeFormat = (date: Date) => {
	return dayjs(date).format('HH:mm');
};

const onRemove = () => {
	// filterStore.filters.date - массив
	props.range ? emit('update:model-value', []) : emit('update:model-value', null);
};

const onOpen = () => {
	if (props.isFilter) {
		input.value.focus();
		input.value.classList.add('active');
	}
};

const onClose = () => {
	if (props.isFilter) {
		input.value.blur();
		input.value.classList.remove('active');
		// если выбрана только 1 дата и календарь закрыли, то автоматически проставляется та же дата на вторую позицию
		if (!displayValue.value[1]) {
			displayValue.value = [...displayValue.value, ...displayValue.value];
		}
		emit('update:model-value', displayValue.value ?? '');
	}
};

const hasValue = computed(() => {
	return props.range ? props.modelValue[0] || props.modelValue[0] : !!props.modelValue;
});

const today = new Date();
const tomorrow = new Date(new Date().setDate(today.getDate() + 1));

const displayValue = ref();

onMounted(() => {
	// datepicker криво ставит фокус класс (при откртии фокуса нет, при закрытии есть)
	input.value = document.querySelector('.custom__input');
});
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
			:input-class-name="`input input__field ${error ? 'form__error' : ''} ${
				appearance ? 'no-border' : ''
			} ${isFilter ? 'filter' : ''}`"
			:menu-class-name="`${!isDateType ? 'time_picker' : ''}`"
			position="left"
			mode-height="80"
			prevent-min-max-navigation
			arrow-navigation
			:auto-apply="true"
			:keep-action-row="false"
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
			:clearable="false"
			:space-confirm="false"
			@keydown.space.prevent
			@open="onOpen"
			@closed="onClose"
			@update:model-value="handleDate"
			@internal-model-change="(date) => (displayValue = date)"
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
					:value="dateFormat(displayValue)"
					@keyup.enter="datepicker.openMenu()"
					@keyup.space.prevent="datepicker.openMenu()"
					@keyup.delete="datepicker.closeMenu()"
					@keyup.esc="datepicker.closeMenu()"
				/>
			</template>
			<template
				v-if="isFilter"
				#left-sidebar
			>
				<CommonButton
					:button-text="$t('dates.filterDay.today')"
					:aria-label="$t('dates.filterDay.today')"
					button-kind="dark"
					@click="
						() => {
							displayValue = [today, today];
							datepicker.closeMenu();
						}
					"
				/>
				<CommonButton
					:button-text="$t('dates.filterDay.tomorrow')"
					:aria-label="$t('dates.filterDay.tomorrow')"
					button-kind="dark"
					@click="
						() => {
							displayValue = [tomorrow, tomorrow];
							datepicker.closeMenu();
						}
					"
				/>
			</template>
			<template #input-icon>
				<CommonIcon
					v-if="!hasValue"
					:name="isDateType ? 'calendar' : 'clock'"
				/>
			</template>
		</VueDatePicker>
		<CommonButton
			v-if="hasValue"
			is-icon
			:interactive="false"
			icon-name="close"
			:aria-label="$t('global.button.clear')"
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

	&__sidebar_left {
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-end;
		gap: 10px;
		padding: 0;
		padding: 0 19px 20px;
		order: 1;
	}

	&__menu {
		overflow: hidden;
		&:focus-visible {
			border-color: var(--color-accent-green-main);
		}

		&_inner {
			padding: 19px 20px;
		}

		&.time_picker {
			right: 0 !important;
		}

		&_content_wrapper {
			flex-direction: column;
			flex-wrap: nowrap;
			// justify-content: flex-end;
			// gap: 10px;
			// padding: 0;
			// padding: 0 19px 20px;
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
			border-color: var(--color-white);
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

		&_wrap {
			& div {
				position: absolute;
				right: 6px;
				top: 50%;
				transform: translateY(-50%);
				width: 30px;
				height: 30px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
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
		&:focus-visible {
			background-color: var(--color-input-field);
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

//.dp__btn:focus {
//	background: transparent;
//}
</style>
