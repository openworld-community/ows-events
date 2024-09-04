// Values should be capitalized ISO 3166 1 alpha 2 code
export enum SupportedCountries {
	MONTENEGRO = 'ME',
	SERBIA = 'RS'
}

export const CountriesObj = <const>{
	ME: 'ME',
	RS: 'RS'
};

export type CountriesType = (typeof CountriesObj)[keyof typeof CountriesObj];

export type TranslateType = {
	['ru']: string;
	['en']: string;
};

export type CountriesTranslateType = {
	[key in CountriesType]: TranslateType;
};

export const countries: CountriesTranslateType = {
	ME: {
		ru: 'Черногория',
		en: 'Montenegro'
	},
	RS: {
		ru: 'Сербия',
		en: 'Serbia'
	}
};

export const queryToCountryLocaleName = {
	serbia: { en: 'Serbia', ru: 'Сербия' },
	montenegro: { en: 'Montenegro', ru: 'Черногория' }
};

export const queryToCountryCode = {
	serbia: 'RS',
	montenegro: 'ME'
};

export const declinationCountries = {
	Сербия: 'Сербии',
	Serbia: 'Serbia',
	Montenegro: 'Montenegro',
	Черногория: 'Черногории'
};
