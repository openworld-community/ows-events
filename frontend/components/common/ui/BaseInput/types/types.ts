import type { InputHTMLAttributes } from 'vue';

export type Props = {
	className?: string;
	modelValue?: string;
	name: string;
	type?: InputValue;
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	error?: string;
};

export enum InputValue {
	text = 'text',
	date = 'date',
	time = 'time',
	number = 'number',
	textarea = 'textarea',
	datalist = 'datalist'
}

export interface BaseInputProps extends InputHTMLAttributes {
	className?: string;
	type?: InputValue;
	modelValue?: any;
}
