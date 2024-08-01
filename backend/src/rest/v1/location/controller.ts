import cityTimezones from 'city-timezones';
import moment from 'moment-timezone';
import { countriesAndCitiesController } from '../../../controllers/countries-and-cities.controller';
import {
	IGetCitiesByCountryHandlerProps,
	IGetCitiesHandlerProps,
	IGetCountriesHandlerProps,
	IGetLocalizedCityHandlerProps,
	IGetLocalizedCountryHandlerProps,
	IGetMetaHandlerProps,
	IGetUsedCitiesHandlerProps
} from './type';
import {
	CommonErrorsEnum,
	SupportedLanguages,
	SupportedCountries
} from '../../../../../common/const';

export const getMeta: IGetMetaHandlerProps = async (request) => {
	const countryString = request.params.country;
	const cityString = request.params.city;

	const cities = cityTimezones.lookupViaCity(cityString);
	const city = cities.find((c) => c.country === countryString);

	let timezone = '';

	if (!city) {
		const byProvince = cityTimezones.findFromCityStateProvince(countryString)[0];
		if (!byProvince) throw new Error(CommonErrorsEnum.TIMEZONE_CITY_NOT_FOUND);

		timezone = byProvince.timezone;

		return {
			country: countryString,
			city: cityString,
			timezoneName: timezone,
			timezoneOffset: moment.tz(timezone).format('Z')
		};
	}
	timezone = city.timezone;

	const timezoneOffset = moment.tz(timezone).format('Z');

	return {
		country: countryString,
		city: cityString,
		timezoneName: timezone,
		timezoneOffset
	};
};

export const getCountries: IGetCountriesHandlerProps = async (request) => {
	const lang =
		(request.headers['accept-language'] as SupportedLanguages) || SupportedLanguages.ENGLISH;
	return countriesAndCitiesController.getLocalizedCountries(lang);
};

export const getLocalizedCityName: IGetLocalizedCityHandlerProps = async (request) => {
	const lang =
		(request.headers['accept-language'] as SupportedLanguages) || SupportedLanguages.ENGLISH;
	return countriesAndCitiesController.getLocalizedCityName(request.params.city, lang);
};

export const getLocalizedCountryName: IGetLocalizedCountryHandlerProps = async (request) => {
	const lang =
		(request.headers['accept-language'] as SupportedLanguages) || SupportedLanguages.ENGLISH;
	return countriesAndCitiesController.getLocalizedCityName(request.params.country, lang);
};

export const getCities: IGetCitiesHandlerProps = async (request) => {
	const lang =
		(request.headers['accept-language'] as SupportedLanguages) || SupportedLanguages.ENGLISH;
	return countriesAndCitiesController.getLocalizedCountries(lang);
};

export const getCitiesByCountry: IGetCitiesByCountryHandlerProps = async (request) => {
	const { country } = request.params;
	const lang =
		(request.headers['accept-language'] as SupportedLanguages) || SupportedLanguages.ENGLISH;
	const countryCode = (await countriesAndCitiesController.getCountryCodeByName(
		country
	)) as SupportedCountries;
	return countriesAndCitiesController.getCitiesByCountry(countryCode, lang);
};

export const getUsedCountries: IGetCountriesHandlerProps = async (request) => {
	const lang =
		(request.headers['accept-language'] as SupportedLanguages) || SupportedLanguages.ENGLISH;
	return countriesAndCitiesController.getUsedCountries(lang);
};

export const getUsedCitiesByCountry: IGetCitiesByCountryHandlerProps = async (request) => {
	const { country } = request.params;
	return countriesAndCitiesController.getUsedCitiesByCountry(country);
};

export const getUsedCities: IGetUsedCitiesHandlerProps = () =>
	countriesAndCitiesController.getUsedCities();
