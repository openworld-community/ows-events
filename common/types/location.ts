import { CountriesType } from '../const/supportedCountries';

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
