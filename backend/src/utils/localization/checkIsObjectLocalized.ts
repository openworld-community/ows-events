import { ILocalizedObject } from '../../../../common/types/localization';
import { SupportedLanguagesArray } from '../../../../common/const/supportedLanguages';

export const checkIsObjectLocalized = (obj: {}): obj is ILocalizedObject =>
	SupportedLanguagesArray.reduce(
		(accum, lang) => obj && (<ILocalizedObject>obj)[lang] !== undefined,
		false
	);
