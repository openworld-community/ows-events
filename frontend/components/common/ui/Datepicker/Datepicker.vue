<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {DatepickerType} from './types/types';
import {dateFormat} from '~/utils/dateFormat';
import {computed, ref} from 'vue';

const props =  defineProps({
		className: {
			type: String,
			default: ''
		},
		modelValue: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: 'дд.мм.гг'
		},
		type: {
			type: String,
			default: DatepickerType.date
		},
		name: {
			type: String,
			required: true
		},
		label: {
			type: String,
			default: ''
		},
		minDate: {
			type: Date,
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		error: {
			type: String,
			default: ''
		},
	})

const date = ref();

const handleDate = (modelData: Date) => {
	date.value = modelData;
}

const isDateType = computed(() => {
	return props.type === DatepickerType.date
});

</script>

<template>
	<div :class="props.className">
		<label
				v-if="props.label"
				class="form__label"
				:for="props.name"
		>
			{{ props.label }}
		</label>
			<VueDatePicker
				:model-value="date"
				:name="props.name"
				:placeholder="props.placeholder"
				:input-class-name="`input form__field ${props.error ? 'form__error' : ''}`"
				auto-apply
				:close-on-auto-apply="!isDateType"
				partial-flow
				:flow="['calendar']"
				:time-picker="!isDateType"
				:enable-time-picker="!isDateType"
				:min-date="props.minDate"
				:format="isDateType ? dateFormat : timeFormat"
				:disabled="props.disabled"
				is-24
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
				v-if="props.error"
				class="form__error"
		>
				{{ props.error }}
		</span>
	</div>
</template>

<style lang="less">

.dp__menu_transitioned,
.dp__input  {
	border-radius: 24px;
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
	display: none;
}

.dp__selection_preview {
	opacity: 0;
}

</style>
