import { ILocalizedObject } from '@common/types/localization';
import { SupportedLanguages, SupportedLanguagesArray } from '../../../../common/const';
import { getLanguage, translate } from '../../externalServices/localization';

export const localize = async (string: string): Promise<ILocalizationReturnType> => {
	const localizationPromise = SupportedLanguagesArray.reduce(async (accum, lang) => {
		const typedAccum: Partial<Record<SupportedLanguages, string>> = await accum;
		typedAccum[lang] = await translate(string, lang);
		return accum;
	}, Promise.resolve({} as ILocalizedObject));
	const localizationObject = await localizationPromise;
	const originLanguage = await getLanguage(string);

	return { originLanguage, localizationObject };
};

type ILocalizationReturnType = {
	originLanguage: SupportedLanguages | 'undefined';
	localizationObject: ILocalizedObject;
};
