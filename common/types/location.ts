import type { CountriesType } from '../const/supportedCountries';

export type UserLocation = {
	code?: string;
	city?: string;
	country?: string;
};

export type Timezone = {
	timezoneName: string;
	timezoneOffset: string;
};

export type Country = CountriesType;
export type City = string;

export type LocaleKey = 'en' | 'ru';

type CitiesType = {
	[key in LocaleKey]: City;
};
type CountriesPartType = {
	['countryCode']: Country;
};

export type UsedCitiesInternType = CitiesType & CountriesPartType[];

export type UsedLocationType = {
	countries: Country[];
	cities: UsedCitiesInternType;
};
