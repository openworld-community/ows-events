<script setup lang="ts">
import type { IconName } from './Icon.vue';
function defineIconDictionary<T extends Record<string, IconName>>(
	dictionary: T
): { [K in keyof T | (string & {})]: IconName } {
	return dictionary;
}
const ICON_DICTIONARY = defineIconDictionary({
	search: 'search',
	date: 'calendar',
	endDate: 'calendar',
	startDate: 'calendar',
	time: 'clock',
	endTime: 'clock',
	startTime: 'clock',
	country: 'container',
	city: 'container',
	timezone: 'container'
});

const emit = defineEmits(['update:model-value']);

const props = defineProps({
	inputName: {
		type: String as PropType<keyof typeof ICON_DICTIONARY>,
		required: true
	},
	inputType: {
		type: String,
		required: true
	},
	inputClass: {
		type: String,
		default: 'input'
	},
	inputLabel: {
		type: String,
		default: ''
	},
	modelValue: {
		type: [String, Number],
		default: ''
	},
	inputPlaceholder: {
		type: String,
		default: ''
	},
	isRequired: {
		type: Boolean,
		default: false
	},
	inputDisabled: {
		type: Boolean,
		default: false
	},
	optionsList: {
		type: [Array<string>, String, Set<string>],
		default: null
	}
});

const inputData = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:model-value', value);
	}
});

const input = ref<null | HTMLInputElement>(null);

const showPicker = () => {
	if (props.inputType === 'text') {
		input.value?.focus();
	} else {
		input.value?.showPicker();
	}
};
</script>

<template>
	<label class="custom-input">
		<span
			v-if="props.inputLabel"
			class="custom-input__label"
		>
			{{ props.inputLabel }}
		</span>
		<div class="custom-input__container">
			<!--      Input: text, number, date, time-->
			<!--      TODO: минимальное значение прибито здесь до тех пор, пока не будут готовы кастомные инпуты-->
			<input
				v-if="props.inputType !== 'textarea' && props.inputType !== 'datalist'"
				ref="input"
				v-model="inputData"
				class="custom-input__field"
				:name="props.inputName"
				:type="props.inputType"
				:placeholder="props.inputPlaceholder"
				:required="props.isRequired"
			/>

			<!--      Input: textarea-->
			<textarea
				v-if="props.inputType === 'textarea'"
				v-model="inputData"
				class="custom-input__field custom-input__field--textarea"
				:name="props.inputName"
				:placeholder="props.inputPlaceholder"
				:required="props.isRequired"
				contenteditable="true"
			/>

			<!--      Input: datalist-->
			<input
				v-if="props.inputType === 'datalist'"
				v-model="inputData"
				class="custom-input__field"
				:type="props.inputType"
				:placeholder="props.inputPlaceholder"
				:list="props.inputName"
				:disabled="props.inputDisabled"
			/>
			<datalist :id="props.inputName">
				<option
					v-for="i in props.optionsList"
					:key="i"
					:value="i"
				/>
			</datalist>

			<!--      Icons-->
			<a
				v-if="inputData"
				class="custom-input__button custom-input__button--clear"
				@click.prevent="inputData = ''"
			>
				<CommonIcon
					name="delete"
					alt="Очистить"
				/>
			</a>

			<a
				v-if="
					ICON_DICTIONARY[props.inputName] &&
					!inputData &&
					(inputType === 'date' || inputType === 'time')
				"
				class="custom-input__button custom-input__button--icon"
				@click.prevent="showPicker"
			>
				<CommonIcon :name="ICON_DICTIONARY[props.inputName]" />
			</a>

			<span
				v-if="
					ICON_DICTIONARY[props.inputName] &&
					!inputData &&
					!(inputType === 'date' || inputType === 'time')
				"
				class="custom-input__button custom-input__button--icon"
			>
				<CommonIcon :name="ICON_DICTIONARY[props.inputName]" />
			</span>

			<!--    На будущее, для дизайна инпутов с кнопкой "Отмена"-->
			<!-- <a v-if="inputData" class="custom-input__button--cancel"> {{ t('global.button.cancel') }} </a> -->
		</div>
	</label>
</template>

<style lang="less" scoped></style>
