<script lang="ts" setup>
import {ref} from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {Props} from './types/types';

// @ts-ignore
withDefaults(defineProps<Props>(), {
	className: '',
	modelValue: '',
	placeholder: 'дд.мм.гг',
	label: '',
	error: '',
});

const date = ref(null);

const format = (date: Date) => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${day}.${month}.${year}`;
}

</script>

<template>
	<div class="className">
		<label
				v-if="label"
				class="form__label"
				:for="name"
		>
			{{ label }}
		</label>
			<VueDatePicker
				v-model="date"
				:name="name"
				:placeholder="placeholder"
				:input-class-name="`input form__field ${error ? 'form__error' : ''} ${className}`"
				auto-apply
				partial-flow
				:flow="['calendar']"
				:enable-time-picker="false"
				:min-date="minDate"
				:format="format"
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

.dp__calendar_item,
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
