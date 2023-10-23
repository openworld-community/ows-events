import { IDelocalizedObject, ILocalizedObject } from '../../../../common/types/localization';
import { SupportedLanguages } from '../../../../common/const';
import { checkIsObjectLocalized } from './checkIsObjectLocalized';

export const delocalizeObject = <T extends object>(
	obj: T,
	lang: SupportedLanguages
): IDelocalizedObject<T> => {
	const keys = Object.keys(obj) as Array<keyof T>;
	const delocalizedObject: IDelocalizedObject<T> = keys.reduce((accum, key) => {
		if (!obj[key] || typeof obj[key] !== 'object') {
			return accum;
		}
		if (!checkIsObjectLocalized(obj[key])) {
			const data = delocalizeObject(obj[key] as object, lang);
			return { ...accum, [key]: data };
		}
		const localizedObject: ILocalizedObject = obj[key];
		// @ts-ignore
		const localization: string = localizedObject[lang];
		return {
			...accum,
			[key]: localization
		};
	}, obj);
	return delocalizedObject;
};
