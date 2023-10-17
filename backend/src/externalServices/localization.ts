import axios from 'axios';
import { SupportedLanguages, SupportedLanguagesArray } from '../../../common/const';
import { vars } from '../config/vars';
import { sleep } from '../utils/sleep';

export const translate = async (string: string, lang: string): Promise<string> => {
	const queryParams = new URLSearchParams({
		text: string,
		tl: lang
	});
	try {
		const req = await axios({
			method: 'GET',
			url: `http://94.241.173.117:5000/translated_text`,
			params: queryParams,
			headers: {
				Authorization: vars.apiKeys.localization
			}
		});
		return req.data;
	} catch (e) {
		console.error(e);
		await sleep(100);
		return await translate(string, lang);
	}
};

export const getLanguage = async (string: string): Promise<SupportedLanguages | 'undefined'> => {
	// @ts-ignore
	const formData = new FormData();
	formData.append('text', string);
	const req = await axios({
		method: 'POST',
		url: `http://94.241.173.117:5000/get_language`,
		headers: {
			Authorization: vars.apiKeys.localization
		},
		data: formData
	});
	const lang = req.data[0].toLowerCase().slice(0, 2);
	if (!SupportedLanguagesArray.includes(lang)) return 'undefined';
	return lang;
};
