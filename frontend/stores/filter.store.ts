import type { City, Country } from '../../common/types/location';

export type LocaleKey = 'en' | 'ru';

export type usedCitiesKeys = LocaleKey | 'countryCode';

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
