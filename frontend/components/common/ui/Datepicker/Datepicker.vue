<script lang="ts" setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {Props} from './types/types.ts';

// @ts-ignore
withDefaults(defineProps<Props>(), {
	className: '',
	modelValue: '',
	placeholder: '',
	label: '',
	error: ''
});

const date = ref(new Date());
// In case of a range picker, you'll receive [Date, Date]
const format = (date) => {
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
				:name="name"
				v-model="date"
				:input-class-name="`input form__field ${error ? form__error : ''} ${className}`"
				auto-apply
				partial-flow
				:flow="['calendar']"
				:enable-time-picker="false"
				:min-date="minDate ?? null"
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

<style lang="less" scoped>

:deep(.dp__menu_transitioned),
:deep(.dp__input)  {
	border-radius: 24px;
}

:deep(.dp__arrow_bottom),
:deep(.dp__arrow_top) {
	opacity: 0;
}

:deep(.dp__cell_inner) {
	border-radius: 50%;
	border: 1px solid var(--color-input-field);
	background-color: var(--color-white);
	height: 24px;
	width: 24px;
}

:deep(.dp__calendar_item),
:deep(.dp__active_date) {
	padding: 3px;
	color: #363636;
	font-size: var(--font-size-XS);
}

:deep(.dp__menu_inner) {
	padding: 14px 16px;
}

:deep(.dp__calendar_header_item) {
	font-size: var(--font-size-S);
}

:deep(.dp__input) {
	padding: 9px 12px;
	border: 1px solid var(--color-input-field);
	font-size: var(--font-size-M);
}

:deep(.dp__input_icon) {
	left: unset;
	right: 0;
	color: var(--color-input-icons);
	width: 18px;
	height: 20px;
}

:deep(.dp__clear_icon) {
	display: none;
}
</style>
