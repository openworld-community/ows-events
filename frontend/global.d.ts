/* eslint-disable @typescript-eslint/no-explicit-any */
// Don't remove this line
import * as yup from './yup';
declare module 'yup' {
	interface StringSchema extends Yup.StringSchema<TType, TContext, TDefault, TFlags> {
		isValidEmail(): StringSchema;
		isValidLink(): StringSchema;
		passwordRegexMethod(val: string): this;
	}

	interface ObjectSchema extends yup.ObjectSchema<TType, TContext, TDefault, TFlags> {
		rangeInput(): this;
	}

	interface MessageParams extends yup.MessageParams {
		path: string;
		value: any;
		originalValue: any;
		label: string;
		type: string;
		spec: SchemaSpec<any> & Record<string, unknown>;
	}

	type SchemaSpec<TDefault> = {
		coerce: boolean;
		nullable: boolean;
		optional: boolean;
		default?: TDefault | (() => TDefault);
		abortEarly?: boolean;
		strip?: boolean;
		strict?: boolean;
		recursive?: boolean;
		label?: string | undefined;
		meta?: any;
	};
}
