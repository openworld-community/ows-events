<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {DatepickerType} from './types/types';
import {dateFormat} from '~/utils/dateFormat';
import {ref} from 'vue';

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
				partial-flow
				:flow="['calendar']"
				:time-picker="props.type === 'time'"
				:enable-time-picker="props.type === 'time'"
				:min-date="props.minDate"
				:format="dateFormat"
				:disabled="props.disabled"
				is-24
				@update:model-value="handleDate"
			/>
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

.dp__arrow_bottom,
.dp__arrow_top {
	opacity: 0;
}

.dp__cell_inner {
	border-radius: 50%;
	border: 1px solid var(--color-input-field);
	background-color: var(--color-white);
	height: 24px;
	width: 24px;
}

.dp__instance_calendar {
	overflow: hidden;
}

.dp__calendar_item,
.dp__instance_calendar,
.dp__active_date {
	padding: 3px;
	color: #363636;
	font-size: var(--font-size-XS);
}

.dp__menu_inner {
	padding: 14px 16px;
}

.dp__calendar_header_item {
	font-size: var(--font-size-S);
}

.dp__input {
	padding: 9px 12px;
	border: 1px solid var(--color-input-field);
	font-size: var(--font-size-M);
}

.dp__input_icon {
	left: unset;
	right: 0;
	color: var(--color-input-icons);
	width: 18px;
	height: 20px;
}

.dp__clear_icon {
	display: none;
}
</style>
