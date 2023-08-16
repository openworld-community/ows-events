import axios from 'axios';
import { SupportedLanguages, SupportedLanguagesArray } from '../../../common/const';
import { vars } from '../config/vars';

export const translate = async (string: string, lang: string) => {
	const queryParams = new URLSearchParams({
		text: string.trim(),
		tl: lang
	});
	const req = await axios({
		method: 'GET',
		url: `https://localisation.orby-tech.space/translated_text`,
		params: queryParams,
		headers: {
			Authorization: vars.apiKeys.localization
		}
	});
	return req.data;
};

export const getLanguage = async (string: string): Promise<SupportedLanguages | 'undefined'> => {
	// @ts-ignore
	const formData = new FormData();
	formData.append('text', string);
	const req = await axios({
		method: 'POST',
		url: `https://localisation.orby-tech.space/get_language`,
		headers: {
			Authorization: vars.apiKeys.localization
		},
		data: formData
	});
	const lang = req.data[0].toLowerCase().slice(0, 2);
	if (!SupportedLanguagesArray.includes(lang)) return 'undefined';
	return lang;
};
