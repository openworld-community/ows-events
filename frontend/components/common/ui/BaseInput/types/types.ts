import {InputHTMLAttributes} from 'vue';

export enum InputValue {
	text = 'text',
	date = 'date',
	time = 'time',
	number = 'number',
	textarea = 'textarea',
	datalist = 'datalist',
}

export interface BaseInputProps extends InputHTMLAttributes {
	className?: string;
	type?: InputValue;
	modelValue?: any;
}
