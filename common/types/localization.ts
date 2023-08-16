import { SupportedLanguages } from '../const';

export type ILocalizedObject = Record<SupportedLanguages, string>;

export type IDelocalizedObject<T extends object> = {
	[K in keyof T]: T[K] extends object
		? T[K] extends ILocalizedObject
			? string
			: IDelocalizedObject<T[K]>
		: T[K];
};
